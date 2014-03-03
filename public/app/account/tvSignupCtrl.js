angular.module('app').controller('tvSignupCtrl', function($scope, tvUser, tvNotifier, $location, tvAuth) {
	$scope.signup = function() {
    	var newUserData = {
     	  username: $scope.email,
      	  password: $scope.password,
	      firstName: $scope.fname,
	      lastName: $scope.lname
    };

    tvAuth.createUser(newUserData).then(function() {
      tvNotifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      tvNotifier.error(reason);
    })
  }
});