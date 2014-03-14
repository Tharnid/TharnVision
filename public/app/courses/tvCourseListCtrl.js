angular.module('app').controller('tvCourseListCtrl', function($scope, tvCourse) {
	// initially just a list of courses
	$scope.courses = tvCourse.query();

	// sort options query
	$scope.sortOptions = [{value: "title", text: "Sort by Title"},
	{value: "published", text: "Sort by Published Date"}];

	$scope.sortOrder = $scope.sortOptions[0].value;
});