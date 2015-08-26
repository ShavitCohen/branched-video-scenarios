angular.module('angularFrameworkApp')
  .controller('confirmationModalCtrl', function ($scope, $modalInstance, scenario, dataService, state, activityScenario, headerText, bodyText, okButtonText, cancelButtonText) {
      //Are you sure you want to delete?
    $scope.headerText = headerText;
    $scope.bodyText = bodyText;
    $scope.okButtonText = okButtonText;
    $scope.cancelButtonText = cancelButtonText;

    $scope.closeModal = function (val) {

      $modalInstance.close(val);
    }
  });
