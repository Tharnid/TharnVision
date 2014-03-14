angular.module('app').factory('tvCachedCourses', function(tvCourse) {
  var courseList;

  return {
    query: function() {
      if(!courseList) {
        courseList = mvCourse.query();
      }

      return courseList;
    }
  }
})