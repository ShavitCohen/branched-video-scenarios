angular.module('angularFrameworkApp')
  .controller('confirmationModalCtrl', function ($scope, $modalInstance, scenario, dataService, state, activityScenario) {
      //Are you sure you want to delete?
      $scope.myHeader = "Are you sure you want to delete?";
    $scope.bodyText = "this will delete all";

    $scope.closeModal = function (val) {

      $modalInstance.close(val);
    }
  });
