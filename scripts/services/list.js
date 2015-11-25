angular.module('krm').factory('list', ['$http', 'alerts',
	function($http, alerts) {
		var list = {
			persons: []
		};

		list.getAll = function() {
			$http.get('/list').success(function(res){
				console.log("got data from mongo. . .");
				angular.copy(res, list.persons);
			});
		};

		list.addPerson = function(person){
			$http.post('/list', person).success(
				function(error, response){
					if (error.message) {
						alerts.open(error.errors.phone.message, "danger");
					} else {
						list.persons.push(response);
						list.getAll();
					}
			});
		};

		list.getPerson = function(id, response){
			return $http.get('/list/' + id).success(response);
		};

		list.deletePerson = function (person){
			console.log(person);
			$http.delete('/list/' + person).success(
				function(res){
					list.getAll();
				}
			);
		};

		list.updatePerson = function(person){
			$http.put('/list/' + person._id, person);
			list.getAll();
		};

		list.purchasePerson = function(person){
			$http.put('/list/purchase/' + person._id, person);
			list.getAll();
		};

		list.deletePurchase = function (person){
			$http.put('/purchase/remove/' + person._id + '/' + person.date).success(
				function(res){
					list.getAll();
				}
			);
		};

		return list;
}]);