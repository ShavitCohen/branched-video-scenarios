angular.module('angularFrameworkApp')
  .controller('userOpeningMessageCtrl', function ($scope, dataService, $modal, $modalInstance, player, state) {

      if (state == "openMessage")
      {
          //this is opening pop up message

          console.log("this is an opening message");

          $scope.theOpeningMessage = dataService.activities[0].scenarios[0].openingMessege;

          $scope.CloseModalStartPlayer = function () {

              $modalInstance.close();
              player.playVideo();
          }
      }
      else if (state == "closeMessage") {
          //this is closing pop up message

          console.log("this is a close message, myCurrentmovIndex = " + $scope.myEndMessageString);
          $scope.theOpeningMessage = $scope.myEndMessageString

          $scope.CloseModalStartPlayer = function () {

              $modalInstance.close();
              // player.playVideo();

          }
      }


      $scope.Tamar = "test";
      

  });