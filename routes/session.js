
/*
 * GET home page.
 */

exports.index = function(Session) {
  return function(req, res) {
    Session.find({}, function(error, sessions) {
      res.render('indexSession', {
        title: 'Express',
        sessions : sessions
      });
    });
  };
};

exports.addSession = function(Session) {
  return function(req, res) {
    var session = new Session(req.body);
    session.save(function(error, session) {
      if (error || !session) {
        res.json({ error : error });
	  } else {
        res.json({ session : session });
		console.writelog(session);
      }
    });
  };
};

exports.getSessions = function(Session) {
  return function(req, res) {
    Session.find({}, function(error, sessions) {
      res.json({ sessions : sessions });
    });
  }
};

exports.updateSession = function(Session) {
  return function(req, res) {
    Session.findOne({ _id : req.params.id }, function(error, session) {
      if (error || !session) {
        res.json({ error : error });
      } else {
        session.done = req.body.done;
        session.save(function(error, session) {
          if (error || !session) {
            res.json({ error : error });
          } else {
            res.json({ session : session });
          }
        });
      }
    });
  }
};