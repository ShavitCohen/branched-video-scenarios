/**
 * Created by cohensha on 8/26/2015.
 */
angular.module('angularFrameworkApp')
  .controller('pageWrapperController', function ($scope, $modal, $location) {

      $scope.goToHomePage = function () {
         
              $location.path("/#");

     
      }
      $scope.goToEditorPage = function () {
          if (Parse.User.current() == null) {
              $location.path("/StartPage");

          }
          else {
              $location.path("/editorActivities");


          }
      }
    $scope.openAboutModal = function(){
      var modalInstance = $modal.open({
        windowClass: 'editModalClass ourModal',
        templateUrl: 'views/aboutUsModal.html',
        controller:'aboutUsModalCtrl'
      });
    }
  });
