angular.module('krm', ['ui.router', 'ui.bootstrap', 'ngDialog'])

.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('/', {
			url: '/',
			templateUrl: 'views/list.html',
			controller: 'AppCtrl',
			resolve: {
				itemPromise: ['list', function (list){
					return list.getAll();
				}]
			}
		})
		.state('admin', {
			url: '/admin',
			templateUrl: 'views/admin.html',
			controller: 'AppCtrl',
			resolve: {
				itemPromise: ['list', function (list){
					return list.getAll();
				}]
			}

		});

		$urlRouterProvider.otherwise('/');

}]);