'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPreviewCtrl', function ($scope, $modalInstance, scenario, dataService, state) {
     // $scope.myCurrentmovIndex = 1;

      $scope.isMyEndMessege = false;
      $scope.scenario = scenario;
      $scope.myTempScenario = ({ videoId: $scope.scenario.videoId, name: $scope.scenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text });
      console.log("$scope.scenario: " + $scope.scenario);
      $scope.isEndMovie = false;
      $scope.isMovieEnded = false;
      $scope.videoDuration = 0;
      $scope.videDurationEnded_Paused = false;
      var myCurrentPlaybackScenarioIndex = 0;

      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
     

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      $scope.previewBreadcrumbsArray = [];
      var previewBreadCrumbsNewArray = [];
     

      if (dataService.currentActivity.attributes.recommendedScenarios == undefined) {
          //אין תרחיש מומלץ עדיין ולכן נכייל את המערכים מחדש
          $scope.tempArrDistractors = [];
          for (var i = 0; i < $scope.scenario.interactions[0].distractors.length; i++) {
              $scope.tempArrDistractors.push({ text: $scope.scenario.interactions[0].distractors[i].text, linkTo: $scope.scenario.interactions[0].distractors[i].linkTo});
          }
          $scope.previewBreadcrumbsArray.push({ videoId: $scope.scenario.videoId, name: $scope.scenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text, interactionType: $scope.scenario.interactions[0].type,interactionEndMessegeText: $scope.scenario.interactions[0].endMessegeText });
          var obj = { videoId: $scope.scenario.videoId, name: $scope.scenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text, interactionType: $scope.scenario.interactions[0].type,interactionEndMessegeText: $scope.scenario.interactions[0].endMessegeText };
          previewBreadCrumbsNewArray.push(obj);
          console.log("Creating new Recommended scenarios...");
          //$scope.previewBreadcrumbsArray.push({ videoId: $scope.scenario.videoId, name: $scope.scenario.name });

         
      }
      else {
          //יש כבר הגדרה של תרחיש מומלץ
          //נטען את התרחיש המומלץ שכבר הוגדר מהפארס
          console.log("a recommended scenario is already configured... loading configuration...");
          for (var i = 0; i < dataService.currentActivity.attributes.recommendedScenarios.length; i++) {
              $scope.previewBreadcrumbsArray.push(dataService.currentActivity.attributes.recommendedScenarios[i]);
              var obj = dataService.currentActivity.attributes.recommendedScenarios[i];
              previewBreadCrumbsNewArray.push(obj);
          }
         
      }
      

      $scope.onYouTubeIframeAPIReady = function () {


          player = new YT.Player('player', {
              height: '200',
              width: '400',
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

         
          //www.youtube.com/v/VIDEO_ID?playlist=VIDEO_ID&autoplay=1&rel=0


        //  $scope.myMovNameBreadCrumbs = scenario.myMovName + " >";
        //  //var myBreadCrumb_a = $compile(angular.element('<div><a href="#" ng-click="breadCrumbClickFunc()" class="BreadCrumb_a"  '+ $scope.myMovNameBreadCrumbs +'</a></div>'))(scope);
        // var myBreadCrumb_a = angular.element('<div ng-click="breadCrumbClickFunc()" class="BreadCrumb_a">' + $scope.myMovNameBreadCrumbs + '</div>');
        //$('#myBreadCrumbsHolder').append(myBreadCrumb_a);
      
          //$scope.previewBreadcrumbsArray.push(scenario);
          //באנגולר תמיד עדיף ליצור מערכים ולדחוף להם אלמנטים לטובת לולאה
          
          
      };

  



      //$scope.startPlayingTest = function () {
      //   // player.playVideo();
      //    player.loadVideoById({
      //        'videoId': scenario.videoId,
      //        'startSeconds': 5,
      //        'endSeconds': 8
      //    });
      //    //player.playVideo();
      //};


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
          console.log("onPlayerStateChange....");
          if (event.data == YT.PlayerState.ENDED || $scope.videDurationEnded_Paused == true) {
              console.log("movie ended");
              //player.pauseVideo();
              //console.log("paused video...");
              //pauseVideo();

              $scope.$apply(function () {
                  if ($scope.isEndMovie == false &&  $scope.ifIsRecommended == true) {
                      $scope.isEndMovie = true;
                      console.log("IsEndMovie = " + $scope.isEndMovie);

                  }
              });

              console.log("$scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex].interactions[0].type" + $scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex].interactionType);
              if ($scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex].interactionType == "endMessege") {
                  $scope.isMyEndMessege = true;
                  $scope.myEndMessege = $scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex].interactionEndMessegeText;


                  //console.log("lilach mySTR: " + mySTR);
               //   player = mySTR;
                  //   console.log("lilach mySTR myEndMessageString: " + $scope.myEndMessageString);
                  //var modalInstance = $modal.open({
                  //    windowClass: 'editModalClass',
                  //    //template:,
                  //    templateUrl: 'views/openingMessageModal.html',
                  //    controller: "userOpeningMessageCtrl",
                  //    resolve: {
                  //        scenario: function () {
                  //            return $scope.scenario;
                  //        }
                  //      ,
                  //        state: function () {
                  //            return "closeMessage";
                  //        }
                  //        ,
                  //        player: function () {
                  //            return player;
                  //        }

                  //    }

                  //});

              }


          }
      }




    $scope.myCurrentmovIndex = 1;
    $scope.myTempScenarioDistractors = $scope.scenario.interactions[0].distractors;

    
    $scope.gotoNextMovie = function (distractor, scenario) {
        $scope.isMyEndMessege = false;
          // $scope.$apply(function () {
          console.log("checking what IsEndMovie = " + $scope.isEndMovie);
          if ($scope.isEndMovie == true) {
              $scope.isEndMovie = false;

          }

          $scope.myCurrentmovIndex = distractor.linkTo;
          $scope.scenario = dataService.currentActivity.scenarios[distractor.linkTo];
          
        //באנגולר תמיד עדיף ליצור מערכים ולדחוף להם אלמנטים לטובת לולאה

          var nextScenario = dataService.myFuncFindingScenarioToPush(distractor.linkTo);
          $scope.myTempScenarioDistractors = nextScenario.interactions[0].distractors;
          //$scope.previewBreadcrumbsArray.push({ videoId: nextScenario.videoId, name: nextScenario.name });
          $scope.tempArrDistractors = [];
          for (var i = 0; i < $scope.scenario.interactions[0].distractors.length; i++) {
              $scope.tempArrDistractors.push({ text: $scope.scenario.interactions[0].distractors[i].text, linkTo: $scope.scenario.interactions[0].distractors[i].linkTo });
          }

          //if ($scope.previewBreadcrumbsArray.length > scenario.index+1) {
              //בדיקה האם המערך של הפירורי לחם גדול יותר ויש עוד פירורי לחם אחרי הסצינה הנוכחית 
          if (($scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex]) && (dataService.currentActivity.scenarios[distractor.linkTo].name == $scope.previewBreadcrumbsArray[myCurrentPlaybackScenarioIndex].name)) {
                  console.log("test - the same");
                 
              }
              else {
                  console.log("test - not the same");
                  //לחצת על מסיח חדש שאינו הבא בתור בתרחיש המומלץ שכבר הוגדר
                  //נמחק את הפירורי הלחם הלא רלוונטיים מהמערך פירורי לחם
                  $scope.previewBreadcrumbsArray.splice((scenario.index + 1), ($scope.previewBreadcrumbsArray.length - (myCurrentPlaybackScenarioIndex + 1)));
                  myCurrentPlaybackScenarioIndex = $scope.previewBreadcrumbsArray.length - 1;
                  //$scope.previewBreadcrumbsArray.push({ videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text });
                  //var obj = { videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text };
                  //previewBreadCrumbsNewArray.push(obj);
              }
          $scope.previewBreadcrumbsArray.push({ videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text, interactionType: $scope.scenario.interactions[0].type, interactionEndMessegeText: $scope.scenario.interactions[0].endMessegeText });
          var obj = { videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text, interactionType: $scope.scenario.interactions[0].type,interactionEndMessegeText: $scope.scenario.interactions[0].endMessegeText };
              previewBreadCrumbsNewArray.push(obj);

          //}
          //else {
          //    //או האם מערך הפירורי לחם הסתיים ומכאן יש רק להוסיף עוד סצינות לתרחיש
          //    //לחצת על מסיח חדש שאינו הבא בתור בתרחיש המומלץ שכבר הוגדר
          //    $scope.previewBreadcrumbsArray.push({ videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text });
          //    var obj = { videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: $scope.scenario.interactions[0].text };
          //    previewBreadCrumbsNewArray.push(obj);
          //}

              $scope.myTempScenario = ({ videoId: nextScenario.videoId, name: nextScenario.name, distractors: $scope.tempArrDistractors, interactionText: nextScenario.interactions[0].text });
          //$scope.previewBreadcrumbsArray.push({ videoId: nextScenario.videoId, name: nextScenario.name });
          
        //player.loadVideoById({ 'videoId': dataService.currentActivity.scenarios[distractor.linkTo].videoId });
              myCurrentPlaybackScenarioIndex++;
          player.loadVideoById({
              'videoId': dataService.currentActivity.scenarios[distractor.linkTo].videoId,
              'startSeconds': 5,
              'endSeconds': 8
          });


          

          //$scope.myMovNameBreadCrumbs = dataService.activities[0].scenarios[distractor.linkTo - 1].myMovName + " >";

          //var myBreadCrumb_a = angular.element('<div class="BreadCrumb_a">' + $scope.myMovNameBreadCrumbs + '</div>');
          //$('#myBreadCrumbsHolder').append(myBreadCrumb_a);

        //dataService.myCurrentmovIndex++;
      };

    $scope.breadCrumbClick = function (scenario, $index) {
        $scope.isMyEndMessege = false;
        $scope.previewBreadcrumbsArray.splice(($index + 1), ($scope.previewBreadcrumbsArray.length - $index + 1));
        previewBreadCrumbsNewArray.splice(($index + 1), (previewBreadCrumbsNewArray.length - $index + 1));
        myCurrentPlaybackScenarioIndex = $scope.previewBreadcrumbsArray.length - 1;
        //$scope.previewBreadcrumbsArray_IDs.splice(($index + 1), ($scope.previewBreadcrumbsArray.length - $index + 1));
        $scope.isEndMovie = false;
        $scope.myTempScenarioDistractors = previewBreadCrumbsNewArray[$index].distractors;
        $scope.myTempScenario = previewBreadCrumbsNewArray[$index];
        //player.loadVideoById({ 'videoId': scenario.videoId });
        player.loadVideoById({
            'videoId': scenario.videoId,
            'startSeconds': 5,
            'endSeconds': 8
        });
    }





    
    if (state == "recommendedScenarios") {
        $scope.ifIsRecommended = true;


    }
    else {

        $scope.ifIsRecommended = false;

    }


    $scope.saveRecommendedScenarios = function ()
    {
        dataService.currentActivity.set("recommendedScenarios", previewBreadCrumbsNewArray);
        //activityIns.set("parent", Parse.User.current()); // חשוב להגדרת האבא של הפעילות

        for (var i = 0; i < previewBreadCrumbsNewArray.length; i++) {

            delete previewBreadCrumbsNewArray[i].$$hashKey;
            for (var b = 0; b < previewBreadCrumbsNewArray[i].distractors.length; b++) {

                delete previewBreadCrumbsNewArray[i].distractors[b].$$hashKey;


            }
        }

        //Parse.User.current().add("recommendedScenarios", activityIns); // הוספת הפעילות למערך הפעילויות
        dataService.currentActivity.save(null, { // שמירה של הפעילות
            success: function (Activity) {
                $modalInstance.close();
            },
            error: function (err) {
                debugger;

            }
        });

    }
      $scope.exitPreviewModal = function ()
      {

          $modalInstance.close();
      }





  });
