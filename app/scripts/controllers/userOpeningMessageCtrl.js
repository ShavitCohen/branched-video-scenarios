angular.module('angularFrameworkApp')
  .controller('userOpeningMessageCtrl', function ($scope, dataService, $modal, $modalInstance, player, state, scenario, $location) {
      $scope.scenario = scenario;
      $scope.theActivityHeadline = dataService.currentActivity.attributes.name;

      if (state == "openMessage")
      {
          //this is opening pop up message
          console.log("this is an opening message");

          $scope.theOpeningMessage = $scope.scenario.attributes.interactions[0].attributes.openingMessege;
          $scope.myOpeiningCloseMessegeModalHeadline = "התחל";

          $scope.CloseModalStartPlayer = function () {

              $modalInstance.close();
              player.playVideo();
          }
      }
      else if (state == "closeMessage") {
          //this is closing pop up message

          console.log("this is a close message, myCurrentmovIndex = " + player);
          $scope.theOpeningMessage = player;
          $scope.myOpeiningCloseMessegeModalHeadline = "צפה במשוב";

          $scope.CloseModalStartPlayer = function () {

              console.log(dataService.userClickedScenariosSummary.length + " ..  " + dataService.currentActivity.attributes.recommendedScenarios.length + " .. " + dataService.scenarioLengthforSummary);

              if (dataService.userClickedScenariosSummary.length > dataService.currentActivity.attributes.recommendedScenarios.length) {
                  //the user clicked on MORE scenarios then the Recommended scenarios by Editor
                  dataService.scenarioLengthforSummary = dataService.userClickedScenariosSummary;
                  console.log(dataService.userClickedScenariosSummary.length);
              }
              else if (dataService.userClickedScenariosSummary.length < dataService.currentActivity.attributes.recommendedScenarios.length) {
                  dataService.scenarioLengthforSummary = dataService.currentActivity.attributes.recommendedScenarios;
                  console.log(dataService.currentActivity.attributes.recommendedScenarios.length);
              }

              dataService.myRedBack = false;
              $location.path("/userSummary");


              $modalInstance.close();
              // player.playVideo();

          }
      }


      $scope.Tamar = "test";
      

  });