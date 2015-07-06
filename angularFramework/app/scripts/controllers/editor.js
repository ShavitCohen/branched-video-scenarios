angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService, $modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      var myMovIndex = 0;
      var Scenario;
      var Interactions;
      var Distractors;
      $scope.selectedActivity_Scnarios_Dataarr1 = [];

      function init() {
         // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
          Scenario = Parse.Object.extend("Scenario");
          Interactions = Parse.Object.extend("Interactions");
          Distractors = Parse.Object.extend("Distractors");

          getScenarios();
          console.log("init---goiing to getinteraction function");






          var freezLineTop = $('.freezLine').css('top');
          $(window).on('scroll', function () {
              $('.freezLine').css('top', 200 + $(window).scrollTop());

          });
      }




      init();

      //$scope.createScenario = function () {
      //        var scenario = {
      //        name: $scope.updateNameTxt,
      //        movIndex: myMovIndex,
      //        firstScenario: true,
      //        videoId: $scope.updateUrlTxt,
      //        startTime: $scope.updateStartTimeTxt,
      //        endTime: $scope.updateEndTimeTxt,
      //        openingMessege: "הגיע הזמן להציל חיים. מוכן להתחיל?",
      //        papaActivityID: dataService.currentActivity,

      //    }


      //    // Simple syntax to create a new subclass of Parse.Object.

      //    // Create a new instance of that class.
      //        var scenarioIns = new Scenario();
      //    scenarioIns.save(scenario, {
      //        success: function (scenarioIns) {
      //            // The object was saved successfully.
      //            getScenarios();

      //        },
      //        error: function (scenarioIns, error) {
      //            // The save failed.
      //            // error is a Parse.Error with an error code and message.
      //            debugger;

      //        }
      //    });

      //    dataService.currentScenario = scenario;
      //    debugger;
      //}



      //$scope.createInteractions = function () {
      //    debugger;

      //    var interaction = {
      //        papaScenarioID: "111",
      //        //dataService.selectedScnarioDataarr.objectId
      //    type: "222",
      //    text: "333",


      //    }


      //    // Simple syntax to create a new subclass of Parse.Object.

      //    // Create a new instance of that class.
      //    var interactionsIns = new Interactions();
      //    debugger;

      //    interactionsIns.save(interaction, {

      //        success: function (interactionsIns) {
      //            // The object was saved successfully.
      //            console.log("הצלחתי");
      //        },
      //        error: function (interactionsIns, error) {
      //            // The save failed.
      //            // error is a Parse.Error with an error code and message.

      //        }
      //    });

      //    dataService.currentInteraction = interaction;
      //    debugger;

      //}


      //$scope.createDistractors = function () {
      //    debugger;

      //    var distractors = {
      //        papaScenarioID: "222",


      //            text: "444",
      //            linkTo: 0,
      //            distractorIndex: 0



      //    }


      //    // Simple syntax to create a new subclass of Parse.Object.

      //    // Create a new instance of that class.
      //    var distractorsIns = new Distractors();
      //    debugger;

      //    distractorsIns.save(distractors, {

      //        success: function (distractorsIns) {
      //            // The object was saved successfully.
      //            console.log(" ליצור דיסטרקטור הצלחתי");
      //        },
      //        error: function (distractorsIns, error) {
      //            // The save failed.
      //            // error is a Parse.Error with an error code and message.

      //        }
      //    });

      //    // dataService.currentScenario = scenario;
      //}









      function getScenariosinJsonFormat(results) {
          var arr1 = [];
          angular.forEach(results, function (result) {
              var obj1 = {};
              obj1.name = result.attributes.name;
              obj1.videoId = result.attributes.videoId;
              obj1.startTime = result.attributes.startTime;
              obj1.endTime = result.attributes.endTime;
              obj1.papaActivityID = result.attributes.papaActivityID;
              obj1.objectId = result.id;
              obj1.original = result;
              arr1.push(obj1);
          });
          return arr1;
      }

      function getScenarios() {
          debugger;
          console.log("dataService.currentActivity: " + dataService.currentActivity);
          var query = new Parse.Query(Scenario);
          query.equalTo("papaActivityID", dataService.currentActivity);
          query.find({
              success: function (results) {

                  $scope.scenarios = results;
                 // dataService.currentScenario = results;
                  $scope.selectedActivity_Scnarios_Dataarr1 = getScenariosinJsonFormat(results);
                  dataService.selectedActivity_Scnarios_Dataarr = $scope.selectedActivity_Scnarios_Dataarr1;

                  console.log("dataService.selectedActivity_Scnarios_Dataarr this is : " + dataService.selectedActivity_Scnarios_Dataarr);
                  console.log("dataService.selectedActivity_Scnarios_Dataarr --name---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.name);
                  console.log("dataService.selectedActivity_Scnarios_Dataarr --id---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.id);
                  //console.log("dataService.selectedActivity_Scnarios_Dataarr --attr-objectid---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.attributes.objectId);

                  $scope.$digest();
                  getInteractions();

              },
              error: function (error) {

              }
          });
       //   dataService.currentScenario = scenario;


      }


      console.log("im goint to get in ");

      function getInteractions() {

          console.log("im in get interaction function");

          //angular.forEach(dataService.selectedActivity_Scnarios_Dataarr, function (currentScenario) {
          //    console.log("dataService.selectedActivity_Scnarios_Dataarr2222: " + dataService.selectedActivity_Scnarios_Dataarr);
          //    console.log("currentScenario 21212121" + currentScenario);

          console.log("dataService.selectedActivity_Scnarios_Dataarr.objectId: " + dataService.selectedActivity_Scnarios_Dataarr.objectId);
              var query = new Parse.Query(Interactions);
              query.containedIn("papaScenarioID", dataService.selectedActivity_Scnarios_Dataarr.objectId);
              query.find({

                  success: function (results) {
                      debugger;

                      //  $scope.scenarios = results;
                      dataService.currentInteraction = results;
                      dataService.selectedActivityScenario_Interactions_Dataarr.push( getInteractionsinJsonFormat(results));
                      console.log("dataService.selectedActivityScenario_Interactions_Dataarr33333 " + dataService.selectedActivityScenario_Interactions_Dataarr);

                      $scope.$digest();

                  },
                  error: function (error) {

                  }
              });

          //});

      }


      function getInteractionsinJsonFormat(results) {
          console.log("im in getInteractionsinJsonFormat");
          var arr = [];
          angular.forEach(results, function (result) {
              var obj = {};
              obj.text = result.attributes.text;
              obj.type = result.attributes.type;

              obj.objectId = result.id;
              arr.push(obj);
          });
          return arr;
      }



      function getDistractorsinJsonFormat(results) {
          var arr = [];
          angular.forEach(results, function (result) {
              var obj = {};
              obj.text = result.attributes.text;
              obj.type = result.attributes.type;

              obj.objectId = result.id;
              arr.push(obj);
          });
          return arr;
      }

      function getDistractors() {

          var query = new Parse.Query(Distractors);
          query.containedIn("papaScenarioID", dataService.currentInteraction);
          query.find({
              success: function (results) {
                  debugger;

                  //  $scope.scenarios = results;
                  dataService.selectedActivityScenarioInteractions_Distaractors_Dataarr = getDistractorsinJsonFormat(results);
                  debugger;
                  $scope.$digest();

              },
              error: function (error) {

              }
          });

       //   dataService.currentDistractor = distractor;

      }




      $scope.addHoverYellow = function ($event) {
          //console.log("addHoverYellow > checking if distractor is clicked: " + dataService.is_DistractorClicked2Link);

          if ($scope.dataService.is_DistractorClicked2Link == false) {

              $(event.currentTarget).addClass('sceneHover');
              $('.arrow').addClass('backgroundArrowsGrey');
              $(event.currentTarget).removeClass('backgroundArrowsGrey');
              dataService.myCurrentSceneClicked2Link = $(event.currentTarget);
          };
      }


      $scope.removeHoverYellow = function ($event) {
          //console.log("removeHoverYellow > checking if distractor is clicked: " + dataService.is_DistractorClicked2Link);
          if ($scope.dataService.is_DistractorClicked2Link == false) {
              $(event.currentTarget).removeClass('sceneHover');
              $('.arrow').removeClass('backgroundArrowsGrey');
              $(event.currentTarget).removeClass('backgroundArrowsGrey');
              //$(event.currentTarget).removeClass('sceneHoverChilds_border', 'sceneHoverChildscolor', 'sceneHoverChildsBorderLine');
          }
      };


  //  $scope.dataService.setDistractorsIndex();

      $scope.openAddMovieDialog = function (scenario) {

          var modalInstance = $modal.open({
              windowClass: 'editModalClass',
              //template:,
              templateUrl: 'views/AddMovie.html',
              controller: "scenarioAddMovieCtrl",
              resolve: {
                  scenario: function () {
                      return $scope.scenario;
                  }
                ,
                  state: function () {
                      return "new";
                  }

              }

          });
      }

      //קריאה לפונקציה שיוצרת את הקווים המחברים בין מסיחים
    //  dataService.linkInitDistrctors();
  }



  );

