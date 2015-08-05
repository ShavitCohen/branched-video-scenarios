'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPreviewCtrl', function ($scope, $modalInstance, scenario, dataService) {
     // $scope.myCurrentmovIndex = 1;


      $scope.scenario = scenario;
      $scope.myTempScenario = scenario;
      console.log("   $scope.scenario: " + $scope.scenario);
      $scope.isEndMovie = false;
      $scope.isMovieEnded = false;
      $scope.videoDuration = 0;
      $scope.videDurationEnded_Paused = false;


      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      $scope.previewBreadcrumbsArray = [];


      $scope.previewBreadcrumbsArray.push(dataService.activities[0].scenarios[0]);


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

         
        //  $scope.myMovNameBreadCrumbs = scenario.myMovName + " >";
        //  //var myBreadCrumb_a = $compile(angular.element('<div><a href="#" ng-click="breadCrumbClickFunc()" class="BreadCrumb_a"  '+ $scope.myMovNameBreadCrumbs +'</a></div>'))(scope);
        // var myBreadCrumb_a = angular.element('<div ng-click="breadCrumbClickFunc()" class="BreadCrumb_a">' + $scope.myMovNameBreadCrumbs + '</div>');
        //$('#myBreadCrumbsHolder').append(myBreadCrumb_a);
      
          //$scope.previewBreadcrumbsArray.push(scenario);
          //באנגולר תמיד עדיף ליצור מערכים ולדחוף להם אלמנטים לטובת לולאה
          
          
      };

  



      $scope.startPlayingTest = function () {
          player.playVideo();
      };


      $scope.done = false;

      $scope.onPlayerReady = function () {
          console.log("entered player ready function...");
          player.playVideo();
          console.log("playing video now...");
          $scope.videoDuration = player.getDuration();
          console.log("videoDuration in general is : " + $scope.videoDuration);

              // pause few seconds before the end - for test 170 sec before end
              setTimeout($scope.pauseVideo, ($scope.videoDuration - 170) * 1000);
              console.log("set timeout was done successfully");
              $scope.done = true;
      };
 

      $scope.pauseVideo = function() {
          $scope.videDurationEnded_Paused = true;
          player.pauseVideo();

          console.log("paused video...");
      }


      $scope.onPlayerStateChange = function (event) {
          if (event.data == YT.PlayerState.ENDED || $scope.videDurationEnded_Paused == true) {
              console.log("movie ended");
              //player.pauseVideo();
              //console.log("paused video...");
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
    $scope.myTempScenarioDistractors = scenario.interactions[0].distractors;


    $scope.gotoNextMovie = function (distractor, scenario) {

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
          
        //באנגולר תמיד עדיף ליצור מערכים ולדחוף להם אלמנטים לטובת לולאה

          var nextScenario = dataService.myFuncFindingScenarioToPush(distractor.linkTo);
          $scope.myTempScenarioDistractors = nextScenario.interactions[0].distractors;
          $scope.previewBreadcrumbsArray.push(nextScenario);
          $scope.myTempScenario = nextScenario;
          

          player.loadVideoById({ 'videoId': dataService.activities[0].scenarios[distractor.linkTo - 1].videoId });


          

          //$scope.myMovNameBreadCrumbs = dataService.activities[0].scenarios[distractor.linkTo - 1].myMovName + " >";

          //var myBreadCrumb_a = angular.element('<div class="BreadCrumb_a">' + $scope.myMovNameBreadCrumbs + '</div>');
          //$('#myBreadCrumbsHolder').append(myBreadCrumb_a);

        //dataService.myCurrentmovIndex++;
      };

    $scope.breadCrumbClick = function (scenario, $index) {
        $scope.previewBreadcrumbsArray.splice(($index +1), ($scope.previewBreadcrumbsArray.length - $index+1));
        $scope.isEndMovie = false;
        $scope.myTempScenarioDistractors = $scope.previewBreadcrumbsArray[$index].interactions[0].distractors;
        $scope.myTempScenario = $scope.previewBreadcrumbsArray[$index];
        player.loadVideoById({ 'videoId': scenario.videoId });
    }





    

      

      $scope.exitPreviewModal = function ()
      {

          $modalInstance.close();
      }

  });
