angular.module('app').controller('tvNavBarLoginCtrl', function($scope, $http) {
	$scope.signIn = function(username, password) {
		$http.post('/login', {username:username, password:password}).then(function(response){
			if(response.data.success) {
				console.log('Logged in!!!');
			}
			else {
				console.log('Not logged in!!!');
			}
		})
	}
});