﻿angular.module('angularFrameworkApp')
  .controller('recommendedScenariosModalCtrl', function ($scope, dataService, $modal, $modalInstance,state) {
      //$scope.scenario = scenario;
      $scope.theActivityHeadline = dataService.currentActivity.attributes.name;
      if (dataService.currentActivity.attributes.recommendedScenarios == undefined) {

          $scope.recommendedMessegeTestStartorEdit = "התחל";
          $scope.recommendedScenarioModalBodyText = true;
      }
      else {


          $scope.recommendedMessegeTestStartorEdit = "ערוך";
          $scope.recommendedScenarioModalBodyText = false;

      }

      $scope.settingRecommendedScenarios = function () {
      //הגדרת תרחיש מומלץ
          //פתיחת המודל של תצוגה המקדימה
          $modalInstance.close();
          $scope.scenario = dataService.currentActivity.scenarios[0];
              var modalInstance = $modal.open({
                  windowClass: 'editModalClass ourModal',
                  templateUrl: 'views/editPreviewModal.html',
                  controller: "scenarioPreviewCtrl",
                  resolve: {
                      scenario: function () {
                          return $scope.scenario;
                      },
                      state: function () {
                          return "recommendedScenarios";
                      }
                  }
              });

          }
      
      
      $scope.ClosesettingRecommendedScenarios = function () {
          //סגירת המודל
          $modalInstance.close();
      }

  });