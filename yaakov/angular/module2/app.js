(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.provider('ShoppingList', ShoppingListProvider)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['$scope','ShoppingList'];
	function ToBuyController($scope,ShoppingList) {
		var list = this;

		list.items = ShoppingList.getToBuy();

		list.buy = function(itemIndex) {
			ShoppingList.buy(itemIndex);
		}

	}

	AlreadyBoughtController.$inject = ['$scope','ShoppingList'];
	function AlreadyBoughtController($scope,ShoppingList) {
		var list = this;
	
		list.items = ShoppingList.getAlreadyBought();
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

	function	ShoppingListProvider() {
		var provider = this;

		provider.$get = function() {
			var shoppingList = new ShoppingListCheckOffService();

			return shoppingList;
		};
	}

})();