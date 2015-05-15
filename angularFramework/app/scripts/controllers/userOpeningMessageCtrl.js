angular.module('angularFrameworkApp')
  .controller('userOpeningMessageCtrl', function ($scope, dataService, $modal, $modalInstance, player, state) {
      $scope.theActivityHeadline = dataService.activities[0].activitycodeName;

      if (state == "openMessage")
      {
          //this is opening pop up message
          console.log("this is an opening message");

          $scope.theOpeningMessage = dataService.activities[0].scenarios[0].openingMessege;
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