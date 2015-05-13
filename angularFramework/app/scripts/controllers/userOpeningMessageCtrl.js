angular.module('angularFrameworkApp')
  .controller('userOpeningMessageCtrl', function ($scope, dataService, $modal, $modalInstance, player) {
      $scope.Tamar = "test";
      $scope.theOpeningMessage = dataService.activities[0].scenarios[0].interactions[1].text;

      $scope.CloseModalStartPlayer = function () {
         
          $modalInstance.close();
        player.playVideo();
      }

  });