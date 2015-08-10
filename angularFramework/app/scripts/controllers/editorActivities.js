angular.module('angularFrameworkApp')
  .controller('editorActivitiesCtrl', function ($scope, dataService, $modal, $location) {
    var Activity = Parse.Object.extend("Activity");

    init();

    var activityIns;
    $scope.activitiesData = [];
    //activity tables information
    $scope.gridOptions = {
      data: "activitiesData",

      columnDefs: [
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
          cellTemplate: '<img src="images/PreviewTV_small.png" alt="preview" class="gridBtnCss" ng-click="myWatchFunc()" >'
          //cellTemplate: '<img src="img/watch_ico.png" alt="watch_ico" class="gridBtnCss" ng-click="myWatchFunc()" >'

        },
        {
          field: 'duplicate',
          displayName: 'שכפול',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<img src="images/DuplicateFile_small.png" alt="duplicate" class="gridBtnCss" ng-click="myDuplicateFunc()" >'
          //cellTemplate: '<img src="img/duplicate_ico.png" alt="watch_ico" class="gridBtnCss" ng-click="myDuplicateFunc()" >'

        },
        {
          field: 'edit',
          displayName: 'עריכה',
          width: "52",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<img src="images/EditPencil_small.png" alt="edit" class="gridBtnCss" ng-click="myEditFunc()" >'

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
        },
        {
          field: 'name',

          width: "220",
          cellClass: 'nameCell',
          headerClass: 'deleteHeader',
          displayName: 'שם הפעילות',
          cellTemplate:'<div class="ui-grid-cell-contents" ng-click="grid.appScope.loadById(row)">{{grid.appScope.getProperty(row,"name")}}</div>'
        },
        {
          field: 'published',
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',

          displayName: 'פרסום',
          cellTemplate: '<img src="images/UploadShare_small.png" alt="upload" class="gridBtnCss" ng-click="myPubFunc()" >'

          //cellTemplate: '<input type="checkbox" ng-model="row.entity.pub" ng-click="toggle(row.entity.name,row.entity.pub)">'
        }]
    };

    $scope.getProperty = function( row,property ) {
      return row.entity[property];
    };

    function init() {
      dataService.checkifEditorisLoggedin();
      getActivities();
    }

    function setDataForUiGrid(results){
      var arr = [];
      angular.forEach(results,function(result){
        var obj = {};
        obj.name = result.attributes.name;
        obj.code = result.attributes.code;
        obj.myID = result.id;
        obj.original = result;
        console.log("obj.myID " + obj.myID);
        obj.description = result.attributes.description;
        arr.push(obj);
      });
      return arr;
    }



    dataService.allActivity = [];

    function getActivities(){

      var query = new Parse.Query(Activity);
      query.equalTo("parent", Parse.User.current());
      query.find({
        success: function (results) {
          $scope.activities = results;
          dataService.allActivity = results;
          $scope.activitiesData = setDataForUiGrid(results);
          $scope.$digest();

        },
        error: function (error) {

        }
      });


    }


    $scope.createNewActivity = function ()
    {
        //adding modal to open pop up for configuring new activity
        var modalInstance = $modal.open({
            windowClass: 'editModalClass',
            //template:,
            //templateUrl: 'views/openingMessageModal.html',
            //controller: "userOpeningMessageCtrl",
            templateUrl: 'views/editorNewActivityModal.html',
            controller: "editorNewActivityCtrl",
            resolve: {
                allActivities: function () {
                    return dataService.allActivity;
                }
              //,
              //  state: function () {
              //      return "closeMessage";
              //  }
              //  ,
              //  player: function () {
              //      return player;
              //  }

            }

        });

        //end of modal for new activity

        //working code for creating new activity automatically - moving this to new modal above
      //activityIns = new Activity();
      //activityIns.set("name", "עזרה ראשונה");
      //activityIns.set("code", Math.floor((Math.random() * 99999) + 1000));
      //activityIns.set("published", true); // חשוב להגדרת האבא של הפעילות
      //activityIns.set("description", "תיאור");
      //activityIns.set("parent", Parse.User.current()); // חשוב להגדרת האבא של הפעילות

      //Parse.User.current().add("activities", activityIns); // הוספת הפעילות למערך הפעילויות
      //Parse.User.current().save(null, { // שמירה של הפעילות
      //  success: function (user) {
      //    getActivities();
      //  }
      //});

      //activityIns.save(activity, {
      //     success: function (activityIns) {

      //         getActivities();
      //     },
      //     error: function (activityIns, error) {

      //         debugger;

      //     }
      // });


    }

    //$scope.gotoActivity = function (activity) {
    //  console.log("lilach: " + activity);
    //  dataService.currentActivity = activity;
    //  $location.path("/EditorPage");
    //}

    $scope.loadById = function (row) {
      console.log("row.entity :"+row.entity);
      //dataService.currentActivity;
      //var index = $scope.activitiesData.index[row.entity.myID];
      //var obj = $scope.activitiesData.data[index];

     // dataService.currentActivity = row.entity.original;
      console.log("myrow.entity :" + row.entity.original);
      $location.path("/EditorPage/" + row.entity.original.id);

      //debugger;
      //dataService.currentActivity = row.entity.code;
      //$location.path("/EditorPage");


    };



  });
