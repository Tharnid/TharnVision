angular.module('app').factory('tvIdentity', function($window, tvUser) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = new tvUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }

  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    }

    // isAuthorized: function(role) {
    //   return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    // }
  }
});