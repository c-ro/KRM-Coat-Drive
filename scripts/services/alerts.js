angular.module('krm')
.service('alerts', [
	function() {
		var alerts = [];

		alerts.open = function(msg, type) {
			alerts.push({msg: msg, type: type});
		};

		alerts.close = function(index) {
			alerts.splice(index, 1);
		};

	return alerts;
}]);