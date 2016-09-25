(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ShoppingListController', ShoppingListController)
		.controller('ToBuyShoppingController', ToBuyShoppingController)
		.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
		.provider('ToBuyShoppingList', ShoppingListProvider)
		.provider('AlreadyBoughtShoppingList', ShoppingListProvider)
		.service('ShoppingListService', ShoppingListService);

	ShoppingListController.$inject = ['$scope'];
	function ShoppingListController($scope) {
		$scope.slc = {}

		$scope.buy = function(itemIndex) {
			var item = $scope.slc.ToBuyShoppingController.items[itemIndex]
			var newitem = { name: item.name, quantity: item.quantity }

			$scope.slc.AlreadyBoughtShoppingController.addItem(newitem);
			$scope.slc.ToBuyShoppingController.removeItem(itemIndex);
		}
	}

	ToBuyShoppingController.$inject = ['$scope','ToBuyShoppingList'];
	function ToBuyShoppingController($scope,ToBuyShoppingList) {
		$scope.slc.ToBuyShoppingController = this;
		var list = this;

		var itemsToBuy = [
			{ name: "cookies", quantity: 10 },
			{ name: "laundry detergent", quantity: 2 },
			{ name: "cheez-its", quantity: 30 },
			{ name: "marscapone", quantity: 1 },
			{ name: "gruyere block", quantity: 20}
		]

		list.items = ToBuyShoppingList.populate(itemsToBuy)

		list.removeItem = function(itemIndex) {
			ToBuyShoppingList.removeItem(itemIndex);
		}

	}

	AlreadyBoughtShoppingController.$inject = ['$scope','AlreadyBoughtShoppingList'];
	function AlreadyBoughtShoppingController($scope,AlreadyBoughtShoppingList) {
		$scope.slc.AlreadyBoughtShoppingController = this;
		var list = this;
		
		list.items = AlreadyBoughtShoppingList.populate([])

		list.addItem = function (item) {
			AlreadyBoughtShoppingList.addItem(item);
		}

	}

	// Shopping List Service
	function ShoppingListService() {
		var service = this;

		// List of shopping items
		var items = [];

		service.addItem = function(item) {
			items.push(item);
		}

		service.removeItem = function(itemIndex) {
			items.splice(itemIndex,1);
		}

		// Populate items with imported list
		service.populate = function(list) {
			for (var i = 0; i < list.length; i++) {
				items.push(list[i]);
				// console.log("Added ",list[i]);
			}
			return items
		}

	}

	// Shopping List Provider
	function	ShoppingListProvider() {
		var provider = this;

		provider.$get = function() {
			var shoppingList = new ShoppingListService();

			return shoppingList;
		};
	}

})();