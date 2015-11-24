 angular.module('krm')

.controller('AppCtrl', ['$scope', '$http', 'ngDialog', 'list', 'alerts',

	function($scope, $http, ngDialog, list, alerts) {

	$scope.list = list.persons;

	$scope.alerts = alerts;

	$scope.addPerson = function(){

		console.log("add");
		list.addPerson($scope.person);

		$scope.person = '';
	};

	$scope.deletePerson = function(id){
		console.log("delete");
		list.deletePerson(id);
	};

	$scope.editPerson = function(person){
		list.getPerson(person._id, function(response){
			$scope.person = response;
		});
	};

	$scope.updatePerson = function(){
		console.log("update");
		list.updatePerson($scope.person);
		$scope.person = '';
	};

	$scope.closeAlert = function(index){
		alerts.close(index);
	};

	$scope.inputDialog = function (person) {
		var newScope = $scope.$new();
			newScope.person = person;
		
		ngDialog.openConfirm({
			template: 'views/edit-dialog.html',
			scope: newScope
		}).then(function(res){
			if(res){
				list.updatePerson(person);
			}
		});
	};

	$scope.purchasePerson = function(person){
		console.log("purchase");

		var doc = {
			_id: person._id,
				qty: person.qty,
				price: person.price,
			//store
		};

		list.purchasePerson(doc);
	};

	$scope.deletePurchase = function(person, date){
		var purchase = {
			_id: person,
			date: date
		};

		list.deletePurchase(purchase);
	};

}]);