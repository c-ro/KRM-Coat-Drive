angular.module('krm')
.directive('item', function(){
	
	var itemFunc = function(scope, element, attrs){
		var crossout = angular.element(element.children()[0]);
		var item = angular.element(element.children()[1]);
		
		var strikeOut = function(){
			item.toggleClass('strikeout');
			// $(this).toggleClass('strikeout');
			//add to purchase array
			//change color
			//only trigger on first TD
			//do not strike through price
		};

		$(crossout).on('click', strikeOut);
	};

	var directive = {
		restrict: 'EA',
		scope: "=name",
		templateUrl: 'views/itemDirective.html',
		link: itemFunc
	};

	return directive;

});