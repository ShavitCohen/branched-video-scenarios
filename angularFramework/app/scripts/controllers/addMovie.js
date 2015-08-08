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
      $scope.checkIfExist = function (scenario) {


          if (state == "edit") {
              $scope.headlingOfAddScene = "עריכת סרטון " + scenario.myMovName;

              $scope.myUrl = $scope.activities.movieLink + scenario.videoId;
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
              videoId: myUrlID
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

                   /*   var Interactions = Parse.Object.extend("Interactions");

                      var InteractionsIns = new Interactions();


                      InteractionsIns.set("type", "singleSelection");
                      InteractionsIns.set("text", "");
                      InteractionsIns.set("parent", scenarioIns); // חשוב להגדרת האבא של הפעילות

                      scenarioIns.add("interactions", InteractionsIns); // הוספת הפעילות למערך הפעילויות
                      scenarioIns.save(null, { // שמירה של הפעילות
                          success: function (scenario) {
                            //  dataService.currentScenario = scenarioIns;

                              var Distractors = Parse.Object.extend("Distractors");

                              var DistractorsIns = new Distractors();


                              DistractorsIns.set("text", "");
                              DistractorsIns.set("linkTo", "1");//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל
                              DistractorsIns.set("parent", InteractionsIns); // חשוב להגדרת האבא של הפעילות


                              InteractionsIns.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות


                              InteractionsIns.save(null, { // שמירה של הפעילות
                                  success: function (interaction) {
                                      debugger;

                                  },
                                  error: function (obj, error) {
                                      debugger;
                                  }
                              });



                          }



                      });*/
                      var myScenario = dataService.getScenariosinJsonFormat(scenarioIns);
                      dataService.selectedActivity_Scnarios_Dataarr.push(myScenario);
                      //getScenarios();
                      $scope.$digest();



                  },
                  error: function (obj, error) {

                  }

              });

              $modalInstance.close();

          }


          else if (state == "edit")
          {
            scenario.videoId = $scope.myUrlID;
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
