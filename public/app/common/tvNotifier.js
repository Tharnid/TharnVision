angular.module('app').value('tvToastr', toastr);

angular.module('app').factory('tvNotifier', function(tvToastr) {
	return {
		notify: function(msg) {
			tvToastr.success(msg);
			console.log(msg);
		},

		error: function(msg) {
			tvToastr.error(msg);
			console.log(msg);
		}
	}
});