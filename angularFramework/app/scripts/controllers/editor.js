angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService,$modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      $scope.hoverYellow=function(bool)
      {
          if (bool == true)
          {
              $scope.isChangeColor = true;
          }
          else if (bool == false)

          {
              $scope.isChangeColor = false;

          }
      }

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

