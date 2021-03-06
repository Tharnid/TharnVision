angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(tvAuth) {
      return tvAuth.authorizeCurrentUserForRoute('admin')
    }},

    user: {auth: function(tvAuth) {
      return tvAuth.authorizeAuthenticatedUserForRoute()
    }},
  }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'tvMainCtrl'})
    .when('/admin/users', { templateUrl: '/partials/admin/user-list',
      controller: 'tvUserListCtrl', resolve: routeRoleChecks.admin
    })
    // adding signup route
    .when('/signup', { templateUrl: '/partials/account/signup', 
      controller: 'tvSignupCtrl'
    })

    // adding profile route
    .when('/profile', { templateUrl: '/partials/account/profile', 
      controller: 'tvProfileCtrl', resolve: routeRoleChecks.user
    })
    // adding course route
    .when('/courses', { templateUrl: '/partials/courses/course-list', 
      controller: 'tvCourseListCtrl', resolve: routeRoleChecks.user
    })
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') { // make sure this matches the reject above
      $location.path('/');
    }
  })
})