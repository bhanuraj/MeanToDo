function AppController($scope, $http) {
  $scope.sessions = [];
  $scope.currentId = location.pathname.split('/')[1];
  $scope.newSession = {
    title : 'Empty Presentation',
    date : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    rating : 0,
	noofusersrated : 0
  };


  $scope.setSessions = function(sessions) {
    $scope.sessions = sessions;
  };

  $scope.updateSession = function(session) {
    $http.put('/session/' + session._id + '.json', session).success(function(data) {
      if (!data.session) {
        alert(JSON.stringify(data));
      }
    });
  };

  $scope.updateSessionList = function() {
    $http.get('/sessions.json').success(function(data) {
      $scope.sessions = data.sessions;
    });
  };

  setInterval(function() {
    $scope.updateSessionList();
    $scope.$apply();
  }, 30 * 60 * 1000); // update every 30 minutes;

  $scope.updateSessionList();

  $scope.addNewSession = function() {
    $http.post('/session.json', $scope.newSession).success(function(data) {
      if (data.session) {
        $scope.sessions.push(data.session);
        $scope.newSession.description = '';
      } else {
	    alert(JSON.stringify(data));
      }
    });
  };
  $scope.users = [];
  $scope.currentUser = {};
  $scope.newUser = {
    name : 'Test User',
    email : 'test@gmail.com'
  };


  $scope.setUsers = function(users) {
    $scope.users = users;
  };

  $scope.updateUser = function(user) {
    $http.put('/user/' + user._id + '.json', user).success(function(data) {
      if (!data.user) {
        alert(JSON.stringify(data));
      }
    });
  };
  
  $scope.findUser = function(user) {
    $http.get('/user/find/' + user._id + '.json', user).success(function(data) {
      $scope.currentUser = data;
    });
  };

  $scope.updateUserList = function() {
    $http.get('/users.json').success(function(data) {
      $scope.users = data.users;
    });
  };

  setInterval(function() {
    $scope.updateUserList();
    $scope.$apply();
  }, 30 * 60 * 1000); // update every 30 minutes;

  $scope.updateUserList();

  $scope.addNewUser = function() {
    $http.post('/user.json', $scope.newUser).success(function(data) {
      if (data.user) {
        $scope.users.push(data.user);
        $scope.newUser.description = '';
      } else {
        alert(JSON.stringify(data));
      }
    });
  };
  
}
