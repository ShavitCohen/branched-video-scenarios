/**
 * Created by shavit on 8/9/15.
 */
'use strict';


angular.module('angularFrameworkApp')
  .controller('confirmationModalCtrl', function ($scope, $modalInstance, scenario, dataService, state, activityScenario) {
    
    $scope.header = "Are you sure you want to delete?";
    $scope.bodyText = "this will delete all";

    $scope.closeModal = function (val) {
        if (val == true) {
          
           
            //activityScenario.splice(scenario.index, 1);
            if (scenario.original) {
                dataService.currentActivity.remove("scenarios", scenario.original); //removing the distractor form the instructions array
                dataService.currentActivity.save(null, {
                    success: function (scenario) {
                        debugger;
                    },
                    error: function (obj, error) {

                    }
                })
            }

            
        }
        else {
            //бим
        }
      $modalInstance.close(val);
    }
  });
