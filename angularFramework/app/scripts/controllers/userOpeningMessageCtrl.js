angular.module('angularFrameworkApp')
  .controller('userOpeningMessageCtrl', function ($scope, dataService, $modal, $modalInstance, player, state, scenario) {
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
          $scope.myOpeiningCloseMessegeModalHeadline = "סיום";

          $scope.CloseModalStartPlayer = function () {

              $modalInstance.close();
              // player.playVideo();

          }
      }


      $scope.Tamar = "test";
      

  });