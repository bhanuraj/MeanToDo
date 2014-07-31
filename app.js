
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , routedashboard = require('./routes/dashboard')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var routeusers = require('./routes/user');
var routesessions = require('./routes/session');
var OAuth = require('./node_modules/google-oauth/GoogleOAuth');
//var passport = require('passport')
  //, GoogleStrategy = require('passport-google').Strategy;

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var TodoSchema = require('./models/Todo.js').TodoSchema;
var SessionSchema = require('./models/Session.js').SessionSchema;
var UserSchema = require('./models/User.js').UserSchema;
var Todo = db.model('todos', TodoSchema);
var Session = db.model('sessions', SessionSchema);
var User = db.model('users', UserSchema);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + '/public'));


//passport.use(new GoogleStrategy({
  //  returnURL: 'http://127.0.0.1:3000/auth/google/return',
  //  realm: 'http://127.0.0.1:3000/'
  //},
  //function(identifier, profile, done) {
  //	console.log(profile.displayName);
  	//console.log(profile.emails[0].value);
  	//return(null, profile);
    //user.find(User[email = profile.email]);
  //}
//));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var oauth = new OAuth.OAuth2(
  '397305108581-0c5iru2dohsq7fooc975ejuj3duim95g.apps.googleusercontent.com', 
  'BUNYB_Mxjd9C6gvyJXM3S3MO', 
  'http://localhost:3000/oauth2callback');

app.get('/auth/google', function(req, res){

    if(!req.query.code){

      //Redirect the user to Authentication From,
      // Set authentication scope to google calendar api
      oauth.getGoogleAuthorizeTokenURL( ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/calendar'], function(err, redirecUrl) {
          if(err) return res.send(500,err);
        console.log(redirecUrl);
        return res.redirect(redirecUrl);
      });

    }else{
      //Get access_token from the code
      oauth.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {
          if(err) return res.send(500,err);

          req.session.access_token = access_token;
          req.session.refresh_token = refresh_token;
         console.log(access_token);

  //        rest.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    //        query:{ access_token: access_token },
      //    }).on('complete', function(data) {
            
        //    console.log(data);
            
          //});


        return res.redirect('/');
      });
    }
});

//app.get('/auth/google', passport.authenticate('google'));
//app.get('/auth/google/return', 
 // passport.authenticate('google', { successRedirect: '/Dashboard',
   //                                 failureRedirect: '/index' }));

app.get('/oauth2callback', function(req, res) {
		res.render('Dashboard', {
			user : req.user // get the user out of session and pass to template
		});
	})
app.get('/', routes.index(Todo));
app.get('/dashboard', routedashboard.index(User));
app.get('/dashboard/:id', routedashboard.newIndex(User));
app.get('/users', routeusers.index(User));
app.get('/session', routesessions.index(Session));

app.get('/todos.json', routes.get(Todo));

app.put('/todo/:id.json', routes.update(Todo));

app.post('/todo.json', routes.addTodo(Todo));


app.get('/sessions.json', routesessions.getSessions(Session));

app.put('/session/:id.json', routesessions.updateSession(Session));

app.post('/session.json', routesessions.addSession(Session));

app.get('/users.json', routeusers.getUsers(User));

app.put('/user/:id.json', routeusers.updateUser(User));
app.get('/user/find/:id.json', routeusers.findUser(User));
app.get('/user/find/:id/name/:name.json', routeusers.findOrCreateUser(User));

app.post('/user.json', routeusers.addUser(User));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
