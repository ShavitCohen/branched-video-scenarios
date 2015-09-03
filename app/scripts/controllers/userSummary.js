'use strict';


angular.module('angularFrameworkApp')
  .controller('userSummaryCtrl', function ($scope, dataService, $modal) {
      $scope.dataService = dataService;
      $scope.errorIndexHTML = 0;
      $scope.additionalHeadererrorIndex = Number(0);
      $scope.YourScenario = String("התרחיש המומלץ");
      $scope.scenariosAreTheSame = false;
      dataService.myCounter = 1;
      dataService.errorIndex = 0;

      $scope.checkingeditorUserDifferences = function ()
      {


        var myParseRecommendedScenarios;
          var myUserClickesScenarios;
          console.log("checking if no errors were found... dataService.errorIndex = " + dataService.errorIndex + "  && dataService.myRedBack = " + dataService.myRedBack + "  &&   dataService.myCounter = " + dataService.myCounter)
         
          //for (var i = 0; i < dataService.scenarioLengthforSummary.length; i++) {

           //   if (dataService.currentActivity.attributes.recommendedScenarios.length >= dataService.scenarioLengthforSummary.length) {

          if (dataService.currentActivity.attributes.recommendedScenarios[dataService.myCounter]) {

              myParseRecommendedScenarios = dataService.currentActivity.attributes.recommendedScenarios[dataService.myCounter].name;
              console.log("recommended name = " + dataService.currentActivity.attributes.recommendedScenarios[dataService.myCounter].name);
          }
          else {
              myParseRecommendedScenarios = "undefined";
              console.log("myParseRecommendedScenarios = undefined");
          }

          if (dataService.userClickedScenariosSummary[dataService.myCounter]) {
              myUserClickesScenarios = dataService.userClickedScenariosSummary[dataService.myCounter].name;
              console.log("user click name = " + dataService.userClickedScenariosSummary[dataService.myCounter].name);
              console.log("checking if no errors were found... dataService.errorIndex = " + dataService.errorIndex + "  && dataService.myCounter = " + dataService.myCounter + "  && dataService.myRedBack = " + dataService.myRedBack + "  &&   dataService.myCounter = " + dataService.myCounter)
          }
          else {
              myUserClickesScenarios = "undefined";
              console.log("myUserClickesScenarios = undefined");
          }
         

                  if (myParseRecommendedScenarios != myUserClickesScenarios) {
                      console.log("myParseRecommendedScenarios name == myUserClickesScenarios name  --> " + myParseRecommendedScenarios + "   &  " + myUserClickesScenarios);
                      $scope.scenariosAreTheSame = true;

                      if (dataService.myRedBack == false) {
                          dataService.errorIndex++;
                          console.log("found an error...");
                          $('#userSummaryRowsLi').addClass('editorUserDifferences');
                          console.log("adding class...");
                          console.log("dataService.myCounter = " + dataService.myCounter);
                          if (dataService.myCounter == 1) {
                              $scope.additionalHeadererrorIndex = 60;

                          }
                          else {
                              $scope.additionalHeadererrorIndex = 0;
                          }

                          $scope.errorIndexHTML = dataService.myCounter;
                          console.log("$scope.errorIndex = " + $scope.errorIndexHTML);
                          console.log("$scope.additionalHeadererrorIndex = " + $scope.additionalHeadererrorIndex);
                          dataService.myRedBack = true;
                      }

                  }

             
       //   }
         
                  console.log("123checking if no errors were found... dataService.errorIndex = " + dataService.errorIndex + "  &&  dataService.myCounter = " + dataService.myCounter + "  && dataService.myRedBack = " + dataService.myRedBack + "  &&   dataService.myCounter = " + dataService.myCounter)
          if (Number(dataService.errorIndex) == 0) {
              console.log("no errors were found");
              $scope.eq = "=";
          }
          //errorIndex
          dataService.myCounter++;
          

      }

      $scope.openMovDialog = function (scenario) {

          var modalInstance = $modal.open({
              windowClass: 'editModalClass ourModal',
              templateUrl: 'views/userSummaryPreview.html',
              controller: "userSummaryPreviewCtrl",
              resolve: {
                  scenario: function () {
                      return scenario;
                  }
              }
          });

      }
   

  });