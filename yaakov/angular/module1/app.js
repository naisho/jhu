(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";

  $scope.check = function() {
    var items = $scope.LunchItems || ""
    items = items.split(',')
    var count = items.length;
    angular.forEach(items, function(item) {
      if (item.trim() == "") {count--};
    });

    if (count == 0) {
      $scope.message = "Please enter data first"
      $scope.style = "alert alert-warning"
    } else if (count <= 3) {
      $scope.message = "Enjoy!"
      $scope.style = "alert alert-success"
    } else if (count > 3) {
      $scope.message = "Too much!"
      $scope.style = "alert alert-danger"
    } else {
      $scope.message = "Error!"
      $scope.style = "alert alert-danger"
    };
  };
}

})();