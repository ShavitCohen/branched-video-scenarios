/**
 * Created by cohensha on 8/26/2015.
 */
angular.module('angularFrameworkApp')
  .controller('pageWrapperController', function ($scope,$modal) {
    $scope.openAboutModal = function(){
      var modalInstance = $modal.open({
        windowClass: 'editModalClass ourModal',
        templateUrl: 'views/aboutUsModal.html',
        controller:'aboutUsModalCtrl'
      });
    }
  });
