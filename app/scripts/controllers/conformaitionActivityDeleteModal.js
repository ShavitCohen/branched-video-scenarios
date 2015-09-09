angular.module('angularFrameworkApp')
  .controller('conformaitionActivityDeleteModalCtrl', function ($scope, dataService, row, state, $modalInstance) {
  
      $scope.closeModal = function (val) {

          $modalInstance.close(val);
      }
  });