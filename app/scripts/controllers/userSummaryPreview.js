'use strict';


angular.module('angularFrameworkApp')
  .controller('userSummaryPreviewCtrl', function ($scope, $modalInstance, scenario, dataService) {
     // $scope.myCurrentmovIndex = 1;

      $scope.scenario = scenario;
      $scope.videoDuration = 0;
      $scope.videDurationEnded_Paused = false;

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
              width: '368',
              videoId: scenario.videoId,
              startSeconds: 5,
              endSeconds: 8,
              playerVars: {
                  'rel': 0,
                  'enablejsapi': 1
              },
              events: {
                  'onReady': $scope.onPlayerReady,
                  'onStateChange': $scope.onPlayerStateChange
              }
          });

  
          
          
      };

  


      $scope.done = false;

      $scope.onPlayerReady = function () {

          console.log("entered player ready function...");
          player.playVideo();
          console.log("playing video now...");
          $scope.videoDuration = player.getDuration();
          console.log("videoDuration in general is : " + $scope.videoDuration);

              // pause few seconds before the end - for test 170 sec before end
              console.log("set timeout was done successfully");
              $scope.done = true;
      };
 

      $scope.pauseVideo = function() {
          $scope.videDurationEnded_Paused = true;
          player.pauseVideo();

          console.log("paused video...");
      }


      $scope.onPlayerStateChange = function (event) {
          console.log("onPlayerStateChange....");
          if (event.data == YT.PlayerState.ENDED || $scope.videDurationEnded_Paused == true) {
              console.log("movie ended");
           
          }
      }





   
      $scope.exitPreviewModal = function ()
      {

          $modalInstance.close();
      }





  });
