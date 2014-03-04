angular.module('app').controller('tvProfileCtrl', function($scope, tvAuth, tvIdentity, tvNotifier) {
  $scope.email = tvIdentity.currentUser.username;
  $scope.fname = tvIdentity.currentUser.firstName;
  $scope.lname = tvIdentity.currentUser.lastName;

  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    }
    if($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    tvAuth.updateCurrentUser(newUserData).then(function() {
      tvNotifier.notify('Your user account has been updated');
    }, function(reason) {
      tvNotifier.error(reason);
    })
  }
})