angular.module('angularFrameworkApp')
  .controller('editorNewActivityCtrl', function ($scope, $modal, dataService, $modalInstance,modalNewEditState) {


      if (modalNewEditState == 1) {
          console.log("this is a new Activity request...");
          $scope.newActivityHeader = "הוספת תרחיש חדש";
      }
      else if (modalNewEditState == 2) {
          console.log("this is an edit request for existing activity...");
          $scope.newActivityHeader = " עריכת תרחיש - לא פעיל עדיין לערוך תרחיש קיים";
      }

      var Activity = Parse.Object.extend("Activity");
    
      var activityIns;
      activityIns = new Activity();
      


      $scope.closeNewActivityPopUP = function (myBtnState) { 
          if (myBtnState == 1) {
              activityIns.set("name", $scope.myActivityName);
              activityIns.set("code", Math.floor((Math.random() * 99999) + 1000));
              activityIns.set("published", true); // חשוב להגדרת האבא של הפעילות
              activityIns.set("description", $scope.myActivityDescription);

              activityIns.set("parent", Parse.User.current()); // חשוב להגדרת האבא של הפעילות

              Parse.User.current().add("activities", activityIns); // הוספת הפעילות למערך הפעילויות
              Parse.User.current().save(null, { // שמירה של הפעילות
                success: function (user) {
                  //getActivities();
                  console.log("success creating & saving new activity");
                  $modalInstance.close();
                },
                error: function (err) {

                }
              });
          }
          else if (myBtnState == 2) {
              console.log("cancelling changes - no save actions are required...");
              $modalInstance.close();
          }
          

      }



});








      //$scope.theActivityHeadline = dataService.activities[0].activitycodeName;

      //if (state == "openMessage")
      //{
      //    //this is opening pop up message
      //    console.log("this is an opening message");

      //    $scope.theOpeningMessage = dataService.activities[0].scenarios[0].openingMessege;
      //    $scope.myOpeiningCloseMessegeModalHeadline = "התחל";

      //    $scope.CloseModalStartPlayer = function () {

      //        $modalInstance.close();
      //        player.playVideo();
      //    }
      //}
      //else if (state == "closeMessage") {
      //    //this is closing pop up message

      //    console.log("this is a close message, myCurrentmovIndex = " + player);
      //    $scope.theOpeningMessage = player;
      //    $scope.myOpeiningCloseMessegeModalHeadline = "סיום";

      //    $scope.CloseModalStartPlayer = function () {

      //        $modalInstance.close();
      //        // player.playVideo();

      //    }
      //}


      //$scope.Tamar = "test";
      

  //});