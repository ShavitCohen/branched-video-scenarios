'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPreviewCtrl', function ($scope, $modalInstance, scenario) {
      $scope.scenario = scenario;
    

      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;

      $scope.onYouTubeIframeAPIReady = function () {

     
          player = new YT.Player('player', {
              height: '200',
              width: '400',
              videoId: scenario.videoId
          });
      }

      $scope.exitPreviewModal = function ()
      {

          $modalInstance.close();
      }

  });
