'use strict';


angular.module('angularFrameworkApp')
  .controller('userSummaryCtrl', function ($scope, dataService) {
      $scope.dataService = dataService;
      $scope.checkingeditorUserDifferences = function ($index)
      {


var myParseRecommendedScenarios;
          var myUserClickesScenarios;

          if (dataService.currentActivity.attributes.recommendedScenarios.length >= $index)
          {
              myParseRecommendedScenarios=dataService.currentActivity.attributes.recommendedScenarios[$index].name;

          
          }
          if (dataService.userClickedScenariosSummary.length >= $index) {
          
              myUserClickesScenarios = dataService.userClickedScenariosSummary[$index].name;
          
          }

          

          if (myParseRecommendedScenarios!= myUserClickesScenarios) {
              if(dataService.myRedBack == false){
                  $('.rowDiv_' + $index).addClass('editorUserDifferences');
                  dataService.myRedBack = true;
          }
              
          }

      }








   

  });