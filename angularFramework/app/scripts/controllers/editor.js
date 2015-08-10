angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService, $modal,$routeParams) {
    $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
    var myMovIndex = 0;
    var Activity;
    var Scenario;
    var Interactions;
    var Distractors;

    $scope.selectedActivity_Scnarios_Dataarr1 = [];

    function init() {
      // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
      Activity = Parse.Object.extend("Activity");
      Scenario = Parse.Object.extend("Scenario");
      Interactions = Parse.Object.extend("Interactions");
      Distractors = Parse.Object.extend("Distractors");

      getScenarios($routeParams.id);


      var freezLineTop = $('.freezLine').css('top');
      $(window).on('scroll', function () {
        $('.freezLine').css('top', 200 + $(window).scrollTop());

      });
    }




    init();

    //$scope.createScenario = function () {
    //    var scenarioIns = new Scenario();


    //    scenarioIns.set("name", $scope.updateNameTxt);
    //    scenarioIns.set("movIndex", myMovIndex);
    //    scenarioIns.set("firstScenario", true); // חשוב להגדרת האבא של הפעילות
    //    scenarioIns.set("videoId", $scope.updateUrlTxt);
    //    scenarioIns.set("startTime", $scope.updateStartTimeTxt);
    //    scenarioIns.set("endTime", $scope.updateEndTimeTxt);
    //    scenarioIns.set("openingMessege", "");
    //    scenarioIns.set("parent", dataService.currentActivity); // חשוב להגדרת האבא של הפעילות

    //        myMovIndex++;

    //        dataService.currentActivity.add("scenarios", scenarioIns); // הוספת הפעילות למערך הפעילויות
    //        dataService.currentActivity.save(null, { // שמירה של הפעילות
    //            success: function (activity) {

    //                var myScenario = dataService.getScenariosinJsonFormat(scenarioIns);
    //                $scope.selectedActivity_Scnarios_Dataarr1.push(myScenario);
    //                //getScenarios();
    //                $scope.$digest();

    //            },
    //            error: function (obj,error) {
    //            }
    //        });


    //}





    //$scope.createDistractors = function () {

    //    var distractors = {
    //        parent: "HaktFQYD1t",


    //            text: "444",
    //            linkTo: 0,
    //            distractorIndex: 0



    //    }
    //    var Interactions = Parse.Object.extend("Interactions");
    //    var query = new Parse.Query(Interactions);
    //    query.equalTo("objectId", "HaktFQYD1t");
    //    // query.include("scenarios");
    //    query.find({
    //        success: function (mycurrentInteractions) {

    //            mycurrentInteractions.add("Distractors", distractors); // הוספת הפעילות לעמודת תרחישים
    //            mycurrentInteractions.save(); //שמירת הפעילות
    //        }
    //    })

    //    // Simple syntax to create a new subclass of Parse.Object.

    //    // Create a new instance of that class.
    //    var distractorsIns = new Distractors();

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





    function getScenarios(activityId) {
      var query = new Parse.Query(Activity);
      query.equalTo("parent",Parse.User.current());
      query.equalTo("objectId",activityId);


      query.include("scenarios");
      query.include(["scenarios.interactions"]);
      query.include(["scenarios.interactions.distractors"]);
      query.first({
        success: function (activity) {
            //debugger;
         
          var scenarios = activity.attributes.scenarios;
          if (scenarios.length > 0) {
            $scope.scenarios = scenarios;
            // dataService.currentScenario = results;
            var arr = [];
            angular.forEach(scenarios, function (scenario) {
              var myScenario = dataService.getScenariosinJsonFormat(scenario);
              arr.push(myScenario);
            });
            dataService.currentActivity = activity;
            dataService.currentActivity.scenarios = arr;
          
            dataService.selectedActivity_Scnarios_Dataarr = $scope.selectedActivity_Scnarios_Dataarr1;
            $scope.$digest();
            // getInteractions();
          } else {

          }



        },
        error: function (error) {

        }
      });
      //   dataService.currentScenario = scenario;


    }










    function getDistractors() {

      //var query = new Parse.Query(Distractors);
      //query.containedIn("papaScenarioID", dataService.currentInteraction);
      //query.find({
      //    success: function (results) {
      //        debugger;

      //        //  $scope.scenarios = results;
      //        dataService.selectedActivityScenarioInteractions_Distaractors_Dataarr = getDistractorsinJsonFormat(results);
      //        debugger;
      //        $scope.$digest();

      //    },
      //    error: function (error) {

      //    }
      //});

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

