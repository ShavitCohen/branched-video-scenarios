'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioAddMovieCtrl', function ($scope, $modalInstance, scenario, dataService) {
      $scope.scenario = scenario;
      //
      console.log("ll " + $scope.scenario);
      $scope.headlingOfAddScene = "הוספת סרטון חדש";
      $scope.checkIfExist = function (scenario) {
          if (scenario.myMovName[0] != null) {
              $scope.headlingOfAddScene = "עריכת סרטון " + scenario.myMovName;

              $scope.myUrl = scenario.movieLink + scenario.id;
              $scope.loadTheYoutubeUrl($scope.scenario.id);
              $scope.myscenarioName = scenario.myMovName;
              $scope.myStartTime = scenario.StartTime;
              $scope.myEndTime = scenario.endTime;
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
        

       //   console.log("scenario " + $scope.scenario);
          var scenarioUpdateDet = { myMovieNum: "", myMovName: $scope.myscenarioName, id: $scope.myUrlID, StartTime: $scope.myStartTime, endTime: $scope.myEndTime };
          console.log(scenarioUpdateDet);

          dataService.activities[0].scenarios.push(scenarioUpdateDet);
          console.log(dataService.activities);
      }
  });
