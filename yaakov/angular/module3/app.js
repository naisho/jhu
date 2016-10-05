(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItemsDirective)
		.directive('itemsLoaderIndicator', itemsLoaderIndicatorDirective);

	NarrowItDownController.$inject = ['$scope','MenuSearchService', '$timeout'];
	function NarrowItDownController($scope, MenuSearchService, $timeout) {
		var menu = this;

		menu.warning = false;
		menu.loading = false;

		menu.found = function(searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			menu.warning = false;
			menu.loading = true;

			$timeout(function(){
				promise.then(function (result) {
					var items = MenuSearchService.getItems();

					if ((items.length == 0) || ($scope.searchTerm == "")) {
						menu.items = [];
						menu.warning = true;
					} else {
						menu.items = items;
						menu.warning = false;
					}

					menu.loading = false;
				});
			}, 2000);
		}

		menu.removeItem = function(index) {
			 MenuSearchService.removeItem(index);
			 if (MenuSearchService.getItems().length == 0) {
			 	menu.warning = true;
			 }
		};

	}

	MenuSearchService.$inject = ['$http']
	function MenuSearchService($http) {
		var service = this;

		var foundItems = [];

		service.getItems = function() {
			return foundItems;
		};

		service.removeItem = function(index) {
			return foundItems.splice(index,1);
		};

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: "GET",
				url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
			}).then(function (result) {
				// process result and only keep items that match
				var menuItems = result.data.menu_items

				foundItems = [];

				for (var i = 0; i < menuItems.length; i++) {
					if (menuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
						foundItems.push(menuItems[i]);
					}
				}

				// return processed items
				return foundItems;
			})
		}
	}

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&',
				warning: '='
			}
		}

		return ddo;
	}

	function itemsLoaderIndicatorDirective() {
		var ddo = {
			templateUrl: 'loading.html',
			scope: {
				loading: '='
			}
		}

		return ddo;
	}	

})();