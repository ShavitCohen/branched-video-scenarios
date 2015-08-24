angular.module('angularFrameworkApp')
  .controller('aboutUsModalCtrl', function ($scope, dataService, $modalInstance) {
  
      $scope.closeModal = function()
      {
          $modalInstance.close();

      }
  });