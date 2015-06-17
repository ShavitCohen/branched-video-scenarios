'use strict';

/**
 * @ngdoc function
 * @name angularFrameworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFrameworkApp
 */
angular.module('angularFrameworkApp')
  .controller('MainCtrl', function ($scope, dataService, $modal) {

      $scope.myActivitie = dataService.activities[0].scenarios;
      console.log("activities[0].scenarios[0].interactions[0].text = " + dataService.activities[0].scenarios[0].interactions[0].text);
      
      $scope.isEndMovie = false;
      $scope.isMovieEnded = false;
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      console.log(" $scope.myActivitie[0].videoId: " + $scope.myActivitie[0].videoId);
      $scope.onYouTubeIframeAPIReady = function () {
          player = new YT.Player('player', {
              height: '560',
              width: '1024',
              videoId: $scope.myActivitie[0].videoId,
              events: {
                  'onReady': $scope.onPlayerReady,
                  'onStateChange': $scope.onPlayerStateChange
              }
          });


          var modalInstance = $modal.open({
              windowClass: 'editModalClass ourModal',
              //template:,
              templateUrl: 'views/openingMessageModal.html',
              controller: "userOpeningMessageCtrl",
              
              resolve: {
                  scenario: function () {
                      return $scope.scenario;
                  }
                ,
                  state: function () {
                      return "openMessage";
                  }
                  ,
                  player: function () {
                      return player;
                  }
                  
              }

          });


          }

      //$scope.openUserOpeningMessage = function (scenario) {

         
      //}

     

      $scope.startPlayingTest = function () {
          player.playVideo();
      };



      $scope.onPlayerStateChange = function(event) {
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


              if ($scope.myActivitie[$scope.myCurrentmovIndex - 1].interactions[0].type == "endMessege") {
                  console.log("myActivitie type == end message" + $scope.myActivitie[$scope.myCurrentmovIndex - 1].interactions[0].type);
                  var mySTR = $scope.myActivitie[$scope.myCurrentmovIndex - 1].interactions[0].text;
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
          console.log("my curr distractor = " + distractor  + " and distractor.linkTo = " + distractor.linkTo + "  and myCurrentmovIndex = " + $scope.myCurrentmovIndex);
          player.loadVideoById({ 'videoId': $scope.myActivitie[distractor.linkTo - 1].videoId });


      };


  });