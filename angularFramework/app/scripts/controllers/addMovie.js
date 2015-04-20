'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioAddMovieCtrl', function ($scope, $modalInstance, scenario, dataService,state) {
      $scope.scenario = scenario;
      $scope.headlingOfAddScene = "הוספת סרטון חדש";
      $scope.movModalBTN = "שמור והמשך";
      $scope.checkIfExist = function (scenario) {


          if (scenario.myMovName[0] != null) {
              $scope.headlingOfAddScene = "עריכת סרטון " + scenario.myMovName;

              $scope.myUrl = scenario.movieLink + scenario.id;
              $scope.loadTheYoutubeUrl($scope.scenario.id);
              $scope.myscenarioName = scenario.myMovName;
              $scope.myStartTime = scenario.StartTime;
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
              var scenarioUpdateDet = { myMovieNum: "", myMovName: $scope.myscenarioName, id: $scope.myUrlID, StartTime: $scope.myStartTime, endTime: $scope.myEndTime, movieLink: "https://www.youtube.com/iframe_api?wmode=" };
              console.log(scenarioUpdateDet);

              dataService.activities[0].scenarios.push(scenarioUpdateDet);
              console.log(dataService.activities);
              $modalInstance.close();
          }
          else if (state == "edit")
          {
           
              console.log("before" + scenario.myMovName);

              scenario.id = $scope.myUrlID;
              scenario.myMovName = $scope.myscenarioName;
              scenario.StartTime = $scope.myStartTime;
              scenario.endTime = $scope.myEndTime;

              console.log("my scenario; " + scenario);

              //i dont know to whice arry to push it
              

              console.log("after" + $scope.scenario.myMovName);
              $modalInstance.close();

          }
        // 
      }

  });
