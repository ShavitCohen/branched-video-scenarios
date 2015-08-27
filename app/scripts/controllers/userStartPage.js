angular.module('angularFrameworkApp')
  .controller('userStartPage', function ($scope, $location, dataService, $timeout) {

      $scope.codeValidate = function () {
          console.log($scope.myCaseCode)

          if ($scope.myCaseCode == 26103) {
              $location.path("/MainPage/" + $scope.myCaseCode);

              //אם הקוד קיים אז ננווט לעמוד הבא

          }
      };

  });




