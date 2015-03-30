angular.module('angularFrameworkApp')
  .controller('startCtrl', function ($scope, $location) {
      $scope.codeValidate = function () {
          console.log($scope.myCaseCode)
          if ($scope.myCaseCode == "123") {
              $location.path("/MainPage");
              //אם הקוד קיים אז ננווט לעמוד הבא

          }
      };

      $scope.routeEditor = function () {
          if ($scope.myCaseCode == "111") {
              $location.path("/EditorPage");
          }
      };


  });




