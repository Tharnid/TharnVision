angular.module('app').controller('tvNavBarLoginCtrl', function($scope, $http, tvIdentity, tvNotifier, tvAuth, $location) {
  $scope.identity = tvIdentity;
  $scope.signIn = function(username, password) {
    tvAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        tvNotifier.notify('You have successfully signed in!');
      } else {
        tvNotifier.notify('Username/Password combination incorrect');
      }
    });
  }

  $scope.signout = function() {
    tvAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      tvNotifier.notify('You have successfully signed out!');
      $location.path('/');
    })
  }  
});