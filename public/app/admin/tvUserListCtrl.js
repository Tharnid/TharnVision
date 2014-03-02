angular.module('app').controller('tvUserListCtrl', function($scope, tvUser) {
	$scope.users = tvUser.query();
});