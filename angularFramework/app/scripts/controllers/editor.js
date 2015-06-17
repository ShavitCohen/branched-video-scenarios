angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService,$modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML

      function init() {
          var freezLineTop = $('.freezLine').css('top');
          $(window).on('scroll', function () {
              $('.freezLine').css('top', 200 + $(window).scrollTop());
          });
      }

      init();


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

