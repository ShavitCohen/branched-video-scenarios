angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService, $modal, $routeParams, $location) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      var myMovIndex = 0;
    
      $scope.myCourrentUser = Parse.User.current().attributes.email;
      $scope.selectedActivity_Scnarios_Dataarr1 = [];

      function init() {
          dataService.myCounterLoop = 0;
          dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

         dataService.getScenarios($routeParams.id)
          .then(function (activity) {
              $scope.activityName = dataService.currentActivity.attributes.name;
          });


          var freezLineTop = $('.freezLine').css('top');
          $(window).on('scroll', function () {
              $('.freezLine').css('top', 200 + $(window).scrollTop());

          });
      }




      init();

      $scope.logOutFunc = function () {
          Parse.User.logOut();
          $location.path("/StartPage");

      }

      //function getScenarios(activityId) {
      //    var query = new Parse.Query(Activity);
      //    query.equalTo("parent", Parse.User.current());
      //    query.equalTo("objectId", activityId);


      //    query.include("scenarios");
      //    query.include(["scenarios.interactions"]);
      //    query.include(["scenarios.interactions.distractors"]);
      //    query.first({
      //        success: function (activity) {
      //            //debugger;

      //            dataService.setCurrentActivity(activity);
      //            $scope.activityName = dataService.currentActivity.attributes.name;
      //            $scope.$digest();
      //        },
      //        error: function (error) {

      //        }
      //    });
      //}




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
          dataService.closeAllBtns();
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



      $scope.recommendedScenariosOpenTheModal = function () {


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
  
