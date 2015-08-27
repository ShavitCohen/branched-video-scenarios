angular.module('angularFrameworkApp')
  .controller('userStartPage', function ($scope, $location, dataService) {

      $scope.codeValidate = function () {
          console.log($scope.myCaseCode)

          //if ($scope.myCaseCode == 68483) {
              $location.path("/MainPage/" + $scope.myCaseCode);

              //אם הקוד קיים אז ננווט לעמוד הבא

          //}
      };

  });




