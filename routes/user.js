
/*
 * GET home page.
 */

exports.index = function(User) {
  return function(req, res) {
    User.find({}, function(error, users) {
      res.render('indexUsers', {
        title: 'Express',
        users : users
      });
    });
  };
};

exports.addUser = function(User) {
  return function(req, res) {
    var user = new User(req.body);
    user.save(function(error, user) {
      if (error || !user) {
        res.json({ error : error });
      } else {
        res.json({ user : user });
      }
    });
  };
};

exports.getUsers = function(User) {
  return function(req, res) {
    User.find({}, function(error, users) {
      res.json({ users : users });
    });
  }
};

exports.findOrCreateUser = function(User) {
  return function(req, res) {
    User.findOne({ email : req.params.id }, function(error, user) {
      if (error || !user) {
		var user = new User();
		user.email = req.params.id;
		user.name = req.params.name;
        user.save(function(error, user) {
		  if (error || !user) {
			res.json({ error : error });
		  } else {
			res.redirect('http://localhost:3000/dashboard/' +user._id);
		  }
		});
      } else {
        user.done = req.body.done;
		res.redirect('http://localhost:3000/dashboard/' +user._id);
      }
    });
  }
};

exports.findUser = function(User) {
  return function(req, res) {
    User.findOne({ _id : req.params.id }, function(error, user) {
      if (error || !user) {
        res.json({ error : "User does not exist" });
      } else {
        user.done = req.body.done;
		res.json({ user : user });
      }
    });
  }
};

exports.updateUser = function(User) {
  return function(req, res) {
    User.findOne({ _id : req.params.id }, function(error, user) {
      if (error || !user) {
        res.json({ error : error });
      } else {
        user.done = req.body.done;
        user.save(function(error, user) {
          if (error || !user) {
            res.json({ error : error });
          } else {
            res.json({ user : user });
          }
        });
      }
    });
  }
};