angular.module('angularFrameworkApp')
  .controller('startCtrl', function ($scope, $location, dataService) {
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
      $scope.signIn = function () {

          var user = new Parse.User();
          user.set("username", "email@example.com");
          user.set("password", "1234");
          user.set("email", "email@example.com");

          // other fields can be set just like with Parse.Object
          user.set("phone", "415-392-0202");

          user.signUp(null, {
              success: function (user) {
                  // Hooray! Let them use the app now.
                  debugger;
              },
              error: function (user, error) {
                  // Show the error message somewhere and let the user try again.
                  alert("Error: " + error.code + " " + error.message);
                  debugger;

              }
          });
      }

      $scope.login = function () {


          Parse.User.logIn("email@example.com", "1234", {
              success: function (user) {
                  // Do stuff after successful login.
                  $location.path("/editorActivities");

              },
              error: function (user, error) {
                  // The login failed. Check error to see why.
                  debugger;
              }
          });
      }

  });




