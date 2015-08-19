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
          dataService.currentActivity = activity;
          var scenarios = activity.attributes.scenarios;
          if (scenarios != undefined && scenarios.length > 0) {
            $scope.scenarios = scenarios;
            var arr = [];
            angular.forEach(scenarios, function (scenario) {
              var myScenario = dataService.getScenariosinJsonFormat(scenario);
              arr.push(myScenario);
              dataService.currentActivity = activity;
              $scope.activityName = dataService.currentActivity.attributes.name;

              dataService.currentActivity.scenarios = arr;
            });
          }

          $scope.dataService.setDistractorsIndex(dataService.currentActivity);
          $scope.$digest();
        },
        error: function (error) {

        }
      });
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
          windowClass: 'editModalClass ourModal',
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



    $scope.recommendedScenariosOpenTheModal = function ()
    {


        var modalInstance = $modal.open({
            windowClass: 'editModalClass ourModal',
            //template:,
            templateUrl: 'views/recommendedScenariosModal.html',
            controller: "recommendedScenariosModalCtrl",
            resolve: {
           
                state: function () {
                    return "new";
                }

            }

        });
    }
    //קריאה לפונקציה שיוצרת את הקווים המחברים בין מסיחים
     
  }



);

