'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPreviewCtrl', function ($scope, $modalInstance, scenario, dataService) {
     // $scope.myCurrentmovIndex = 1;


      $scope.scenario = scenario;
      console.log("   $scope.scenario: " + $scope.scenario);
      $scope.isEndMovie = false;
      $scope.isMovieEnded = false;
      $scope.myMovNameBreadCrumbs += dataService.activities[0].scenarios[dataService.myCurrentmovIndex - 1].myMovName +" >";


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
              videoId: scenario.videoId,
              events: {
                  'onReady': $scope.onPlayerReady,
                  'onStateChange': $scope.onPlayerStateChange
              }
          });
      }

       
      



      $scope.startPlayingTest = function () {
          player.playVideo();
      };

 

      $scope.onPlayerStateChange = function (event) {
          //if (event.data == YT.PlayerState.PLAYING && !done) {
          //    getDurationFunc();
          //}

          if (event.data == YT.PlayerState.ENDED) {
              console.log("movie ended");
              //pauseVideo();

              $scope.$apply(function () {
                  if ($scope.isEndMovie == false) {
                      $scope.isEndMovie = true;
                      console.log("IsEndMovie = " + $scope.isEndMovie);

                  }
              });

              console.log("$scope.scenario[$scope.myCurrentmovIndex - 1].interactions[0].type: " + $scope.scenario.interactions[0].type);
              if ($scope.scenario.interactions[0].type == "endMessege") {
                  var mySTR = $scope.scenario.interactions[0].text;
                  //console.log("lilach mySTR: " + mySTR);
                  player = mySTR;
                  //   console.log("lilach mySTR myEndMessageString: " + $scope.myEndMessageString);
                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass',
                      //template:,
                      templateUrl: 'views/openingMessageModal.html',
                      controller: "userOpeningMessageCtrl",
                      resolve: {
                          scenario: function () {
                              return $scope.scenario;
                          }
                        ,
                          state: function () {
                              return "closeMessage";
                          }
                          ,
                          player: function () {
                              return player;
                          }

                      }

                  });

              }


          }
      }




    $scope.myCurrentmovIndex = 1;

      $scope.gotoNextMovie = function (distractor) {

          // $scope.$apply(function () {
          console.log("checking what IsEndMovie = " + $scope.isEndMovie);
          if ($scope.isEndMovie == true) {
              $scope.isEndMovie = false;
              console.log("IsEndMovie after distractor click = " + $scope.isEndMovie);

          }

          $scope.myCurrentmovIndex = distractor.linkTo;
          console.log("my curr distractor = " + distractor + " and distractor.linkTo = " + distractor.linkTo + "  and myCurrentmovIndex = " + $scope.myCurrentmovIndex);
          console.log("dataService.activities.scenarios[distractor.linkTo - 1].videoId: " + dataService.activities[0].scenarios[distractor.linkTo - 1].videoId);
          $scope.scenario = dataService.activities[0].scenarios[distractor.linkTo - 1];

          player.loadVideoById({ 'videoId': dataService.activities[0].scenarios[distractor.linkTo - 1].videoId });

          dataService.myCurrentmovIndex++;
      };
























    

      

      $scope.exitPreviewModal = function ()
      {

          $modalInstance.close();
      }

  });
