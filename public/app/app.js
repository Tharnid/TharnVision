angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(tvAuth) {
      return tvAuth.authorizeCurrentUserForRoute('admin')
    }}
  }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'tvMainCtrl'})
    .when('/admin/users', { templateUrl: '/partials/admin/user-list',
      controller: 'tvUserListCtrl', resolve: routeRoleChecks.admin
    })
    // adding signup link
    .when('/signup', { templateUrl: '/partials/account/signup', 
      controller: 'tvSignupCtrl'
    })

});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') { // make sure this matches the reject above
      $location.path('/');
    }
  })
})