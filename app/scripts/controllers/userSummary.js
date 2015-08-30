'use strict';


angular.module('angularFrameworkApp')
  .controller('userSummaryCtrl', function ($scope, dataService) {
      $scope.dataService = dataService;
      $scope.errorIndex = Number(0);
      $scope.additionalHeadererrorIndex = Number(0);
      $scope.YourScenario = String("התרחיש המומלץ");
      
      $scope.checkingeditorUserDifferences = function (errorIndex)
      {


        var myParseRecommendedScenarios;
          var myUserClickesScenarios;

         
          for (var i = 0; i < dataService.scenarioLengthforSummary.length; i++) {

           //   if (dataService.currentActivity.attributes.recommendedScenarios.length >= dataService.scenarioLengthforSummary.length) {
                  myParseRecommendedScenarios = dataService.currentActivity.attributes.recommendedScenarios[i].name;
                  console.log("recommended name = " + dataService.currentActivity.attributes.recommendedScenarios[i].name);

           //   }

            //  if (dataService.userClickedScenariosSummary.length >= dataService.scenarioLengthforSummary.length) {

                  myUserClickesScenarios = dataService.userClickedScenariosSummary[i].name;
                  console.log("user click name = " + dataService.userClickedScenariosSummary[i].name);

           //   }

                  if (myParseRecommendedScenarios != myUserClickesScenarios) {
                      console.log("myParseRecommendedScenarios name == myUserClickesScenarios name  --> " + myParseRecommendedScenarios + "   &  " + myUserClickesScenarios);

                      if (dataService.myRedBack == false) {
                          dataService.myCounter++;
                          console.log("found an error...");
                          $('#userSummaryRowsLi').addClass('editorUserDifferences');
                          console.log("adding class...");
                          console.log("i = " + i);
                          if (i == 1) {
                              $scope.additionalHeadererrorIndex = 60;

                          }
                          else {
                              $scope.additionalHeadererrorIndex = 0;
                          }

                          $scope.errorIndex = Number(i);
                          console.log("$scope.errorIndex = " + $scope.errorIndex);
                          console.log("$scope.additionalHeadererrorIndex = " + $scope.additionalHeadererrorIndex);
                          dataService.myRedBack = true;
                      }

                  }

             
          }
         
          if (dataService.myCounter == 0) {
              console.log("no errors were found");
              $scope.eq = "=";
          }
          //errorIndex

          

      }


   

  });