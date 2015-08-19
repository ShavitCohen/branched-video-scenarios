angular.module('angularFrameworkApp')
  .controller('startCtrl', function ($scope, $location, dataService) {
      $scope.codeValidate = function () {
          console.log($scope.myCaseCode)
          if ($scope.myCaseCode == 68483) {
              $location.path("/MainPage/" + $scope.myCaseCode);

              //אם הקוד קיים אז ננווט לעמוד הבא

          }
      };

      //$scope.routeEditor = function () {
      //    if ($scope.myCaseCode == "111") {
      //        $location.path("/EditorPage");
      //      $scope.$digest();
      //    }
      //};
      $scope.signIn = function () {

          var user = new Parse.User();
          user.set("username", $scope.LoginEmailAdress);
          user.set("password", $scope.LoginPassword);
          user.set("email", $scope.LoginEmailAdress);

          // other fields can be set just like with Parse.Object
          user.set("phone", "415-392-0202");

          user.signUp(null, {
              success: function (user) {
                  // Hooray! Let them use the app now.
                  debugger;
              },
              error: function (user, error) {
                  // Show the error message somewhere and let the user try again.
                  handleParseError(error);

                  alert("Error: " + error.code + " " + error.message);
                  debugger;

              }
          });
      }

      $scope.login = function () {

          //user:email@example.com
          //pass:1234
          Parse.User.logIn($scope.LoginEmailAdress, $scope.LoginPassword, {
              success: function (user) {
                  // Do stuff after successful login.
                  $location.path("/editorActivities");
                $scope.$digest();

              },
              error: function (user, error) {
                  // The login failed. Check error to see why.
                  handleParseError(error);
                  debugger;
              }
          });
      }
      function handleParseError(err) {
          switch (err.code) {
              case Parse.Error.INVALID_SESSION_TOKEN:
                  Parse.User.logOut();
                  // If web browser, render a log in screen
                 // If Express.js, redirect the user to the log in route
                  break;

                   // Other Parse API errors that you want to explicitly handle
          }
      }

    
  });




