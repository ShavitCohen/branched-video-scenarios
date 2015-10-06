angular.module('angularFrameworkApp')
  .controller('embedModalCtrl', function ($scope, dataService, $modalInstance) {
      $scope.EmbbedCode=dataService.myEmbbedCode;
      $scope.closeModal = function()
      {
          $modalInstance.close();

      }
  });