angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService,$modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      var myMovIndex = 0;
      var Scenario;

      function init() {
          console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
          Scenario = Parse.Object.extend("Scenario");

          getScenarios();
         
            



          var freezLineTop = $('.freezLine').css('top');
          $(window).on('scroll', function () {
              $('.freezLine').css('top', 200 + $(window).scrollTop());

          });
      }




      init();
      
      $scope.createScenario = function () {
              var scenario = {
              name: "איש מתמוטט",
              movIndex: myMovIndex,
              firstScenario: true,
              videoId: "XIsXgNFGTJQ",
           
              startTime: 0,
              endTime: 5,
              openingMessege: "הגיע הזמן להציל חיים. מוכן להתחיל?",
              papaActivityID: dataService.currentActivity,
       
          }


          // Simple syntax to create a new subclass of Parse.Object.

          // Create a new instance of that class.
              var scenarioIns = new Scenario();
          scenarioIns.save(scenario, {
              success: function (scenarioIns) {
                  // The object was saved successfully.
                  getScenarios();
              },
              error: function (scenarioIns, error) {
                  // The save failed.
                  // error is a Parse.Error with an error code and message.
                  debugger;

              }
          });

          dataService.currentScenario = scenario;
      }



      function getScenarios() {

          var query = new Parse.Query(Scenario);
          query.equalTo("papaActivityID", dataService.currentActivity);
          query.find({
              success: function (results) {
                  debugger;
                  $scope.scenarios = results;
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
 

    $scope.dataService.setDistractorsIndex();

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
      dataService.linkInitDistrctors();
  }



  );

