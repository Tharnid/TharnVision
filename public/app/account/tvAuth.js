angular.module('app').factory('tvAuth', function($http, tvIdentity, $q) {
	return {
		authenticateUser: function(username, password) {
			var dfd = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response){
				if(response.data.success) {
					// console.log('Logged in!!!');
					tvIdentity.currentUser = response.data.user;
					dfd.resolve(true);
				}
				else {
					// console.log('Not logged in!!!');
					dfd.resolve(false);
				}
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
		}
	}
});