'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioAddMovieCtrl', function ($scope, $modalInstance, scenario, dataService, state) {
      $scope.activities = dataService.activities[0];
      $scope.scenario = scenario;
      $scope.headlingOfAddScene = "הוספת סרטון חדש";
      $scope.movModalBTN = "שמור והמשך";
      $scope.checkIfExist = function (scenario) {


          if (state == "edit") {
              $scope.headlingOfAddScene = "עריכת סרטון " + scenario.myMovName;

              $scope.myUrl = $scope.activities.movieLink + scenario.videoId;
              $scope.loadTheYoutubeUrl($scope.scenario.videoId);
              $scope.myscenarioName = scenario.myMovName;
              $scope.myStartTime = scenario.startTime;
              $scope.myEndTime = scenario.endTime;
              $scope.movModalBTN = "עדכן";
       
            //  $scope.editExistMov();

          }
      }
      

      $scope.youtube_parser  =function(myUrl) {
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
              videoId: myUrlID
          });

       
         

      }
      $scope.dataService = dataService;

      $scope.addToJason = function () {
      
          if (state == "new")
          {

              var scenarioUpdateDet = {
                  movIndex: "",
                  myMovName: $scope.myscenarioName,
                  videoId: $scope.myUrlID,
                  id:25,
                  startTime: $scope.myStartTime,
                  endTime: $scope.myEndTime,
                  interactions: [
                                {
                                    type: "",
                                    text: "",
                                    distractors: [
                                      
                                    ]
                                }
                  ]
              };

              console.log(scenarioUpdateDet);

              dataService.activities[0].scenarios.push(scenarioUpdateDet);
              console.log(dataService.activities);
              $modalInstance.close();
          }
          else if (state == "edit")
          {
           

              console.log("before" + scenario.myMovName);

              scenario.videoId = $scope.myUrlID;
              scenario.myMovName = $scope.myscenarioName;
              scenario.startTime = $scope.myStartTime;
              scenario.endTime = $scope.myEndTime;

             
              $modalInstance.close();

          }
          // 
        
      }

  });
