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
                      return "new";
                  }
                  ,
                  player: function () {
                      return $scope.player;
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
              if ($scope.isEndMovie == false) {
                  $scope.isEndMovie = true;
                  console.log("IsEndMovie = " + $scope.isEndMovie);
                      
                  }
              //console.log("movie endedddd");
              //console.log("movie endedddd");
              //console.log("myisMovieEnded before :" + $scope.isMovieEnded);
              //$scope.myCurrentmovIndex = distractor.linkTo;
              //console.log("my curr distractor = " + distractor + " and distractor.linkTo = " + distractor.linkTo + "  and myCurrentmovIndex = " + $scope.myCurrentmovIndex);
              //$scope.isMovieEnded = true;

              //console.log("myisMovieEnded after:" + $scope.isMovieEnded);
              //console.log("myisMovieEnded before :" + isMovieEnded);
          }
      }
   

      $scope.showQuestionDiv = function(){
          $scope.isEndMovie = true;
      };

      $scope.myCurrentmovIndex = 1;

      $scope.gotoNextMovie = function (distractor) {

          $scope.myCurrentmovIndex = distractor.linkTo;
          console.log("my curr distractor = " + distractor  + " and distractor.linkTo = " + distractor.linkTo + "  and myCurrentmovIndex = " + $scope.myCurrentmovIndex);
          player.loadVideoById({ 'videoId': $scope.myActivitie[distractor.linkTo -1].videoId });
          //if (distractor.linkTo) { }
      };
      //if (scope.IsEndMovie == true) {
      //    scope.IsEndMovie = false;
      //    
      //}


      //$scope.$on('YT.PlayerState.ENDED', function ($event, player) {
      //    // play it again
      //    //player.playVideo();
      //    console.log("movie endedddd");
      //    console.log("myisMovieEnded before :" + isMovieEnded);
      //    $scope.myCurrentmovIndex = distractor.linkTo;
      //    console.log("my curr distractor = " + distractor + " and distractor.linkTo = " + distractor.linkTo + "  and myCurrentmovIndex = " + $scope.myCurrentmovIndex);
      //    $scope.isMovieEnded = true;

      //    console.log("myisMovieEnded after:" + isMovieEnded);

      //    //player.loadVideoById({ 'videoId': $scope.myActivitie[distractor.linkTo - 1].videoId });

         
      //});

  });