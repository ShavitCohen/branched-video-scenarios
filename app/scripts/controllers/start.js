angular.module('angularFrameworkApp')
  .controller('startCtrl', function ($scope, $location, dataService, $timeout) {
      $scope.yourSignUpRequstAccepted = false;

     
      

      $scope.toggleToSignUpSignIn = function (state) {
          if (state == true) {
              $scope.signInorSignUpSelected = true;


          }
          else {
              $scope.signInorSignUpSelected = false;


          }




      }
   


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
                 
                  $timeout(function () {
                      $scope.yourSignUpRequstAccepted = true;
                  }, 300);
                  // Hooray! Let them use the app now.

              },
              error: function (user, error) {
                  // Show the error message somewhere and let the user try again.
                  handleParseError(error);

                  alert("Error: " + error.code + " " + error.message);

              }
          });
      }

      $scope.login = function () {

          //user:email@example.com
          //pass:1234
          Parse.User.logIn($scope.LoginEmailAdress, $scope.LoginPassword, {
              success: function (user) {
                  // Do stuff after successful login.

                $timeout(function(){
                  $location.path("/editorActivities")
                },300);



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




