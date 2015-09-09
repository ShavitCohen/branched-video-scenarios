angular.module('angularFrameworkApp')
  .controller('editorActivitiesCtrl', function ($scope, dataService, $modal, $location) {
    var Activity = Parse.Object.extend("Activity");
    $scope.myCourrentUser = Parse.User.current().attributes.email;
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
          width: "62",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',

          cellTemplate: '<div class="btn gridBtnCss" ng-click="grid.appScope.myDeleteFunc(row)"><i class="glyphicon glyphicon-trash" </i></div>'

        },
        {
          field: 'watch',
          width: "62",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          displayName: 'צפייה',
          cellTemplate: '<div class="btn gridBtnCss" ng-click="myWatchFunc()"><i class="glyphicon glyphicon-eye-open" </i></div>'

            
        },
        {
          field: 'duplicate',
          displayName: 'שכפול',
          width: "62",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<div class="btn gridBtnCss" ng-click="myWatchFunc()"><i class="glyphicon glyphicon-duplicate" </i></div>'

        },
        {
          field: 'edit',
          displayName: 'עריכה',
          width: "62",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          cellTemplate: '<div ng-click="grid.appScope.createNewActivity(2,row)" class="btn gridBtnCss"><i class="glyphicon glyphicon-edit" alt="edit"</i></div>'

        },
        {
          field: 'code',
          width: "82",
          cellClass: 'codeCell',
          headerClass: 'deleteHeader',
          displayName: 'קוד גישה'
        }, {
          field: 'description',
          width: "464",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          displayName: 'תיאור'
        },
        {
          field: 'name',

          width: "383",
          cellClass: 'nameCell',
          headerClass: 'deleteHeader',
          displayName: 'שם הפעילות',
          cellTemplate:'<div class="ui-grid-cell-contents enterToActivity" ng-click="grid.appScope.loadById(row)">{{grid.appScope.getProperty(row,"name")}}</div>'
        },
        {
          field: 'published',
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
         
          displayName: 'פרסום',
          cellTemplate: '<div class="btn gridBtnCss" ng-click="myPubFunc()"><i class="glyphicon glyphicon-cloud-upload" alt="upload" </i></div>'


          //cellTemplate: '<input type="checkbox" ng-model="row.entity.pub" ng-click="toggle(row.entity.name,row.entity.pub)">'
        }]
    };


    var myLoginValidation = 0;
  


    $scope.getProperty = function( row,property ) {
      return row.entity[property];
    };

    function init() {
      dataService.checkifEditorisLoggedin();
      getActivities();
   
    }

   
    $scope.myDeleteFunc=function(row)
    {
   
   //deleteActivity

    }
    $scope.logOutFunc = function () {
        Parse.User.logOut();
        $location.path("/StartPage");

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


    $scope.createNewActivity = function (modalNewEditState,row)
    {
        console.log("modalNewEditState = " + modalNewEditState);
        //adding modal to open pop up for configuring new activity
        var modalInstance = $modal.open({
            windowClass: 'editModalClass ourModal',
          
            templateUrl: 'views/editorNewActivityModal.html',
            controller: "editorNewActivityCtrl",
            resolve: {
                allActivities: function () {
                    return dataService.allActivity;
                },
                modalNewEditState: function () {
                    return modalNewEditState;
                },
                myCurrentRow: function () {


                    return row;

                }
            }

        });
    }



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
