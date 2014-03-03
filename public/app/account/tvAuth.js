angular.module('app').factory('tvAuth', function($http, tvIdentity, $q, tvUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new tvUser();
          angular.extend(user, response.data.user);
          tvIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    // create User
      createUser: function(newUserData) {
        var newUser = new tvUser(newUserData);
        var dfd = $q.defer();

        newUser.$save().then(function() {
          tvIdentity.currentUser = newUser;
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        tvIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(tvIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    }
  }
});