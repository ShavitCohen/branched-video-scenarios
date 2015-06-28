angular.module('angularFrameworkApp')
  .controller('editorActivitiesCtrl', function ($scope, dataService, $modal, $location) {

      init();
      var Activity;
    $scope.activitiesData = [];

    //activity tables information
    $scope.gridOptions = {
      data:"activitiesData",
      columnDefs: [
        {
          width: "100",
          cellClass: 'dateCell',
          headerClass: 'deleteHeader',
          field: 'dateOfChange',
          selectWithCheckboxOnly: true,
          displayName: 'תאריך שינוי'
        },
        {
          field: 'myDel',
          displayName: 'מחיקה',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',

          cellTemplate: '<img src="img/delete_ico.png" alt="delete_ico" class="gridBtnCss" ng-click="myDeleteFunc()">'

        },
        {
          field: 'watch',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          displayName: 'צפייה',
          cellTemplate: '<img src="img/watch_ico.png" alt="watch_ico" class="gridBtnCss" ng-click="myWatchFunc()" >'

        },
        {
          field: 'duplicate',
          displayName: 'שכפול',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<img src="img/duplicate_ico.png" alt="watch_ico" class="gridBtnCss" ng-click="myDuplicateFunc()" >'

        },
        {
          field: 'edit',
          displayName: 'עריכה',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<img src="img/edit_ico.png" alt="watch_ico" class="gridBtnCss" ng-click="myEditFunc()" >'

        },
        {
          field: 'code',
          width: "82",
          cellClass: 'codeCell',
          headerClass: 'deleteHeader',
          displayName: 'קוד גישה'
        }, {
          field: 'description',
          width: "300",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          displayName: 'תיאור'
        }, {
          field: 'name',
          cellTemplate:"<div ng-click='goToActivity()'>{{row.getProperty(col.field)}}</div>",
          width: "220",
          cellClass: 'nameCell',
          headerClass: 'deleteHeader',
          displayName: 'שם הפעילות'
          //cellTemplate: '<input type="button" ng-model="row.entity.activiteyName" ng-click="myActiviteyNameVal(row.entity.activiteyName)">'
        },
        {
          field: 'published',
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',

          displayName: 'פרסום',
          cellTemplate: '<img src="img/upload_Active.png" alt="upload_Active" class="gridBtnCss" ng-click="myPubFunc()" >'

          //cellTemplate: '<input type="checkbox" ng-model="row.entity.pub" ng-click="toggle(row.entity.name,row.entity.pub)">'
        }]
    };

      function init() {
        dataService.checkifEditorisLoggedin();
        Activity = Parse.Object.extend("Activity");
        getActivities();
      }

    function setDataForNgGrid(results){
      var arr = [];
      angular.forEach(results,function(result){
        var obj = {};
        obj.name = result.attributes.name;
        obj.code = result.attributes.code;
        obj.description = "bla bla bla";
        arr.push(obj);
      });
      return arr;
    }

      function getActivities(){

          var query = new Parse.Query(Activity);
          query.equalTo("createdBy", Parse.User.current());
          query.find({
              success: function (results) {
                  $scope.activities = results;
                  $scope.activitiesData = setDataForNgGrid(results);
                  $scope.$digest();
              },
              error: function (error) {

              }
          });


      }
      $scope.createNewActivity = function ()
      {
          var activity = {
              name: "עזרה ראשונה",
              code: Math.floor((Math.random() * 99999) + 1000),
              createdBy: Parse.User.current(),
              published: true,
              description: "תיאור",
          }
          // Simple syntax to create a new subclass of Parse.Object.

          // Create a new instance of that class.
          var activityIns = new Activity();
          activityIns.save(activity, {
              success: function (activityIns) {
                  // The object was saved successfully.
                  getActivities();
              },
              error: function (activityIns, error) {
                  // The save failed.
                  // error is a Parse.Error with an error code and message.
                  debugger;

              }
          });


      }

      $scope.gotoActivity = function (activity) {
          dataService.currentActivity = activity;
          $location.path("/EditorPage");
      }





  });
