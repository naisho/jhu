(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
	function ToBuyController($scope,ShoppingListCheckOffService) {
		var list = this;

		list.items = ShoppingListCheckOffService.getToBuy();

		list.buy = function(itemIndex) {
			ShoppingListCheckOffService.buy(itemIndex);
		}

	}

	AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];
	function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
		var list = this;
	
		list.items = ShoppingListCheckOffService.getAlreadyBought();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		// List of shopping items
		var toBuy = [
			{ name: "cookies", quantity: 10 },
			{ name: "laundry detergent", quantity: 2 },
			{ name: "cheez-its", quantity: 30 },
			{ name: "marscapone", quantity: 1 },
			{ name: "gruyere block", quantity: 20}
		]
		
		var alreadyBought = [];

		service.buy = function(itemIndex) {
			alreadyBought.push(toBuy[itemIndex]);
			toBuy.splice(itemIndex,1);
		}

		service.getToBuy = function() {
			return toBuy
		}

		service.getAlreadyBought = function() {
			return alreadyBought
		}

	}

})();