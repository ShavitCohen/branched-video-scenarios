/**
 * Created by shavit on 8/9/15.
 */
'use strict';


angular.module('angularFrameworkApp')
  .controller('confirmationModalCtrl', function ($scope, $modalInstance, scenario, dataService, state, activityScenario) {

    $scope.header = "Are you sure you want to delete?";
    $scope.bodyText = "this will delete all";

    $scope.closeModal = function (val) {

      $modalInstance.close(val);
    }
  });
