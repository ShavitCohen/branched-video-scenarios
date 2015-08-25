﻿angular.module('angularFrameworkApp')
  .controller('editorNewActivityCtrl', function ($scope, $modal, dataService, $modalInstance, modalNewEditState, myCurrentRow, $timeout) {


      if (modalNewEditState == 1) {
          console.log("this is a new Activity request...");
          $scope.newActivityHeader = "הוספת פעילות חדשה";
          myCurrentRow;
      }
      else if (modalNewEditState == 2) {
          console.log("this is an edit request for existing activity...");
          

          for (var i = 0; i < dataService.allActivity.length; i++) {

              if (dataService.allActivity[i].attributes.code == myCurrentRow.entity.code) {
                  dataService.currentActivityForEditInGrid = dataService.allActivity[i];

              }
          }
        
          $scope.myActivityName = dataService.currentActivityForEditInGrid.attributes.name;
          $scope.newActivityHeader = "עריכת פעילות " + $scope.myActivityName;

          $scope.myActivityDescription = dataService.currentActivityForEditInGrid.attributes.description;
          

      }

      var Activity = Parse.Object.extend("Activity");
      var activityIns;
      activityIns = new Activity();
      


      $scope.closeNewActivityPopUP = function (myBtnState) { 
          if (myBtnState == 1) {
              if (modalNewEditState == 1) {
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
              else if (modalNewEditState == 2) {

                  dataService.currentActivityForEditInGrid.set("name", $scope.myActivityName);

                  dataService.currentActivityForEditInGrid.set("description", $scope.myActivityDescription);


                  dataService.currentActivityForEditInGrid.save(null, { // שמירה של הפעילות
                      success: function (user) {
                          //getActivities();
                          $timeout(function () {
                             //צריך להוסיף כאן משהו כדי שהטבלה תתרענן אוטומטית

                          }, 100);
                          $modalInstance.close();
                      },
                      error: function (err) {

                      }
                  });


              }
          }
             
          else if (myBtnState == 2) {
              console.log("cancelling changes - no save actions are required...");


          }
          

      }



});







