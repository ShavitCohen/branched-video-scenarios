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


      function init() {
          dataService.userClickedScenariosSummary = [];
          $scope.scenario;
          // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
          Activity = Parse.Object.extend("Activity");
          Scenario = Parse.Object.extend("Scenario");
          Interactions = Parse.Object.extend("Interactions");
          Distractors = Parse.Object.extend("Distractors");

          getScenarios($routeParams.id);


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
              width: '1024',
              videoId: dataService.currentActivity.attributes.scenarios[0].attributes.videoId,
              playerVars: {
                  'rel': 0,
                  'enablejsapi': 1
              },
              events: {
                  'onReady': $scope.onPlayerReady,
                  'onStateChange': $scope.onPlayerStateChange
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
      };



      $scope.onPlayerStateChange = function(event) {
          //if (event.data == YT.PlayerState.PLAYING && !done) {
          //    getDurationFunc();
          //}

          if (event.data == YT.PlayerState.ENDED) {
              console.log("movie ended");
              //pauseVideo();
              if ($scope.scenario.attributes.interactions[0].attributes.type == "endMessege") {
                  var mySTR = $scope.scenario.attributes.interactions[0].attributes.endMessegeText;
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
              else {
                  $scope.$apply(function () {
                      if ($scope.isEndMovie == false) {
                          $scope.isEndMovie = true;
                          console.log("IsEndMovie = " + $scope.isEndMovie);

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
          //    $scope.myCurrentmovIndex = distractor.linkTo;
          $scope.scenario = dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo];
      
          dataService.userClickedScenariosSummary.push({ 'name': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.name, 'videoId': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.videoId });

          player.loadVideoById({ 'videoId': dataService.currentActivity.attributes.scenarios[distractor.attributes.linkTo].attributes.videoId });
     

      };



      function getScenarios(activityCode) {
          var query = new Parse.Query(Activity);
          //query.equalTo("parent", Parse.User.current());
          query.equalTo("code", 68483);//למה הוא מקבל את הערך כמחרוזת ולא כמספר


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
                  $scope.$digest();
              },
              error: function (error) {

              }
          });
          dataService.userClickedScenariosSummary.push({ 'name': dataService.currentActivity.attributes.scenarios[0].attributes.name, 'videoId': dataService.currentActivity.attributes.scenarios[0].attributes.videoId });

      }

  });