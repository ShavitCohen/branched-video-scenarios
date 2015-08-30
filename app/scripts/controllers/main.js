'use strict';

/**
 * @ngdoc function
 * @name angularFrameworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFrameworkApp
 */
angular.module('angularFrameworkApp')
  .controller('MainCtrl', function ($scope, dataService, $modal, $routeParams) {


      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      var myMovIndex = 0;
      var Activity;
      var Scenario;
      var Interactions;
      var Distractors;
      var timerId;
      $scope.stateEnd = false;

      function init() {
          dataService.userClickedScenariosSummary = [];
          $scope.scenario;
          // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
          Activity = Parse.Object.extend("Activity");
          Scenario = Parse.Object.extend("Scenario");
          Interactions = Parse.Object.extend("Interactions");
          Distractors = Parse.Object.extend("Distractors");

          getScenarios(Number($routeParams.id));


      }




      init();



      $scope.isEndMovie = false;
      $scope.isMovieEnded = false;
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      //console.log(" $scope.myActivitie[0].videoId: " + $scope.myActivitie[0].videoId);
      $scope.onYouTubeIframeAPIReady = function () {
          player = new YT.Player('player', {
              height: '560',
              width: '980',
              videoId: dataService.currentActivity.attributes.scenarios[0].attributes.videoId,
              playerVars: {
                  
                  'enablejsapi': 1
              },
              events: {
                  'onReady': $scope.onPlayerReady,
                  'onStateChange': $scope.onPlayerStateChange,
                  'onytplayerStateChange': $scope.onPlayerStateChange
              }
          });

          $scope.scenario = dataService.currentActivity.attributes.scenarios[0];
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
          $scope.stateEnd = false;

      };

     var done = false;

      $scope.onPlayerStateChange = function(event) {
          //if (event.data == YT.PlayerState.PLAYING && !done) {
          //    getDurationFunc();
          //}
          $scope.videoDuration = player.getDuration();

          $scope.videoDuration = $scope.videoDuration - player.getCurrentTime();
          console.log("$scope.videoDuration :" + $scope.videoDuration);
          console.log("player.getCurrentTime() :" + player.getCurrentTime());

          if (event.data == YT.PlayerState.PLAYING)
          {
              clearTimeout(timerId);
              timerId=setTimeout(pauseVideo, ($scope.videoDuration - 0.1) * 1000);
              done = true;
          }


          else if (event.data == YT.PlayerState.ENDED  &&  $scope.stateEnd == false) {
              console.log("123movie ended");
              console.log("$scope.videoDuration " + $scope.videoDuration);

              var videoDuration2 = Number(player.getCurrentTime() - 1);

              console.log("videoDuration2 " + videoDuration2);
              player.seekTo(videoDuration2);
              $scope.stateEnd = true;



          }
      }
      function pauseVideo()
      {
         
              console.log("pause");
              player.pauseVideo();
          //pauseVideo();
              if ($scope.scenario.attributes.interactions[0].attributes.type == "endMessege") {
                  var mySTR = $scope.scenario.attributes.interactions[0].attributes.endMessegeText;
                  //console.log("lilach mySTR: " + mySTR);
                  player = mySTR;
                  //   console.log("lilach mySTR myEndMessageString: " + $scope.myEndMessageString);
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
                              return "closeMessage";
                          }
                          ,
                          player: function () {
                              return player;
                          }

                      }

                  });



              }
              else {
                  $scope.$apply(function () {
                      if ($scope.isEndMovie == false) {
                          $scope.isEndMovie = true;
                          console.log("IsEndMovie = " + $scope.isEndMovie);

                      }
                  });

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
          //    $scope.myCurrentmovIndex = distractor.linkTo;
          $scope.scenario = dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo];

          dataService.userClickedScenariosSummary.push({ 'name': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.name, 'videoId': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.videoId });

          player.loadVideoById({ 'videoId': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.videoId });
          $scope.stateEnd = false;


      };



      function getScenarios(activityCode) {
          var query = new Parse.Query(Activity);
          //query.equalTo("parent", Parse.User.current());
          query.equalTo("code", activityCode);//למה הוא מקבל את הערך כמחרוזת ולא כמספר


          query.include("scenarios");
          query.include(["scenarios.interactions"]);
          query.include(["scenarios.interactions.distractors"]);
          query.first({
              success: function (activity) {
                  //debugger;
                  dataService.currentActivity = activity;
                  var scenarios = activity.attributes.scenarios;
                  if (scenarios != undefined && scenarios.length > 0) {
                      $scope.scenarios = scenarios;
                      var arr = [];
                      angular.forEach(scenarios, function (scenario) {
                          var myScenario = dataService.getScenariosinJsonFormat(scenario);
                          arr.push(myScenario);
                          dataService.currentActivity = activity;
                          $scope.myActivitie = dataService.currentActivity.scenarios;
                          $scope.activityName = dataService.currentActivity.attributes.name;

                          dataService.currentActivity.scenarios = arr;

                      });
                      $scope.onYouTubeIframeAPIReady();

                  }

                  $scope.dataService.setDistractorsIndex(dataService.currentActivity);
                  dataService.userClickedScenariosSummary.push({ 'name': dataService.currentActivity.attributes.scenarios[0].attributes.name, 'videoId': dataService.currentActivity.attributes.scenarios[0].attributes.videoId });
                  $scope.$digest();
              },
              error: function (error) {

              }
          });


      }

  });
