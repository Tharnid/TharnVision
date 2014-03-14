angular.module('app').factory('tvCourse', function($resource) {
  var CourseResource = $resource('/api/courses/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });

  return CourseResource;
});