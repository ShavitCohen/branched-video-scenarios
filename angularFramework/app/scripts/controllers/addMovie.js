'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioAddMovieCtrl', function ($scope, $modalInstance, scenario, dataService, state) {
    $scope.dataService = dataService;
    var Scenario;
    var myMovIndex = 0;
    $scope.selectedActivity_Scnarios_Dataarr1 = [];
    init();
    function init() {
      // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
      //debugger;
      Scenario = Parse.Object.extend("Scenario");

    }

    $scope.activities = dataService.activities[0];
    $scope.scenario = scenario;
    $scope.headlingOfAddScene = "הוספת סרטון חדש";
    $scope.movModalBTN = "שמור והמשך";
    $scope.myVideoDuration = 0;

    $scope.checkIfExist = function (scenario) {

      if (state == "edit") {
        $scope.headlingOfAddScene = "עריכת סרטון " + scenario.name;

        $scope.myUrl = "https://www.youtube.com/iframe_api?wmode=opaque "+ scenario.videoId;
        $scope.loadTheYoutubeUrl(scenario.videoId);
        $scope.myscenarioName = scenario.name;
        $scope.myStartTime = scenario.startTime;
        $scope.myEndTime = scenario.endTime;
        $scope.movModalBTN = "עדכן";
        
        //  $scope.editExistMov();

      }
    }


    $scope.youtube_parser = function (myUrl) {
      //debugger;
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = myUrl.match(regExp);
      if (match && match[7].length == 11) {
        console.log("videoId " + match[7]);
        $scope.myUrlID = match[7];
        $scope.loadTheYoutubeUrl($scope.myUrlID);

        //  return match[7];
      }
    }




    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    $scope.loadTheYoutubeUrl = function (myUrlID) {
      player = new YT.Player('player', {
        //height: '200',
        //width: '400',
          videoId: myUrlID,
          startSeconds: 5,
          endSeconds: 8,
          playerVars: {
              'rel': 0,
              'enablejsapi': 1
          },
          events: {
              'onReady': onPlayerReady
              
          }
      });
    }



    function onPlayerReady(event) {
        $scope.myVideoDuration = player.getDuration();
        console.log("duration of video = " + player.getDuration());
        //$scope.myStartTime = player.playerVars.startSeconds;
        //$scope.myEndTime = player.playerVars.endSeconds;
    };


    $scope.updateMovStartEndTime = function (myChangeRequestID) {
        if (myChangeRequestID == 1) {
            //request for updating start time
            console.log("request to update start time..");
           // $scope.myStartTime = 0;
            //?start=840&end=1240&autoplay=1
        }
        else if (myChangeRequestID == 2) {
            //request for updating end time
            console.log("request to update end time..");
           // $scope.myEndTime = $scope.myVideoDuration;
        }
    };

    /**
     * This function creates an interaction and assign it to the parent
     * THe last parameter "successFunctionAfterCreation" should be a function
     * which will triggered once the creation was successful
     * @param parent
     * @param type
     * @param text
     * @param successFunctionAfterCreation
     */
    function addFirstInteraction(parent,type,text,successFunctionAfterCreation){
      var Interactions = Parse.Object.extend("Interactions");
      var InteractionsIns = new Interactions();
      InteractionsIns.set("type", "singleSelection");
      InteractionsIns.set("endMessegeText", "");
      InteractionsIns.set("text", "");
      InteractionsIns.set("openingMessege", "");
      InteractionsIns.set("parent", parent); // חשוב להגדרת האבא של הפעילות

      parent.add("interactions", InteractionsIns); // הוספת הפעילות למערך הפעילויות
      parent.save(null, { // שמירה של הפעילות
        success: function (scenario) {

          successFunctionAfterCreation(scenario);



        }



      });
    }

    $scope.addToJason = function () {
      var scenarioIns = new Scenario();

      if (state == "new")
      {
        scenarioIns.set("name", $scope.myscenarioName);
        scenarioIns.set("movIndex", myMovIndex);
        scenarioIns.set("firstScenario", true); // חשוב להגדרת האבא של הפעילות
        scenarioIns.set("videoId", $scope.myUrlID);
        scenarioIns.set("startTime", $scope.myStartTime);
        scenarioIns.set("endTime", $scope.myEndTime);
        scenarioIns.set("openingMessege", "");
        scenarioIns.set("parent", dataService.currentActivity); // חשוב להגדרת האבא של הפעילות

        myMovIndex++;

        dataService.currentActivity.add("scenarios", scenarioIns); // הוספת הפעילות למערך הפעילויות
        dataService.currentActivity.save(null, { // שמירה של הפעילות
          success: function (activity) {

            //We are adding the first interaction
            addFirstInteraction(scenarioIns,"singleSelection","",function(scenario){
              //The first instance creation was successful, and we are adding the video to the array
              var myScenario = dataService.getScenariosinJsonFormat(scenario);
              dataService.currentActivity.attributes.scenarios.push(scenario);
              dataService.currentActivity.scenarios.push(myScenario);
              $modalInstance.close(myScenario);
            });


          },
          error: function (obj, error) {

          }

        });



      }


      else if (state == "edit")
      {
          $scope.myUrl = "https://www.youtube.com/iframe_api?wmode=opaque " + scenario.videoId;
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = $scope.myUrl.match(regExp);
          if (match && match[7].length == 11) {
              console.log("videoId = " + match[7]);
              $scope.myUrlID = match[7];
              //$scope.myUrlID = $scope.youtube_parser($scope.myUrl);
              scenario.videoId = $scope.myUrlID;

              console.log("video id = " + $scope.myUrlID);


              ///כל זה לא עובד לא יודעות למה//
              //מנסות לעדכן סהכ את הכתובת החדשה וזהו///
              //אולי לא צריך בכלל לעשות את זה//
          }
        scenario.name = $scope.myscenarioName;
        scenario.startTime = $scope.myStartTime;
        scenario.endTime = $scope.myEndTime;


        scenario.original.set("name", scenario.name);
        scenario.original.set("videoId", scenario.videoId);
        scenario.original.set("startTime", scenario.startTime);
        scenario.original.set("endTime", scenario.endTime);

        scenario.original.save(null,{
          success:function(savedScenario){
            //scenario have been successfully saved to Parse
            // only then, we close the modal
            $modalInstance.close();
          },
          error:function(err){

          }
        });


      }


    }

  });
