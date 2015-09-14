angular.module('angularFrameworkApp')
  .controller('editorActivitiesCtrl', function ($scope, dataService, $modal, $location, $timeout) {
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
              field: 'updatedAt',
              width: "200",
              cellClass: 'deleteCell',
              headerClass: 'deleteHeader',
              displayName: 'תאריך שינוי אחרון'
          },
        {
          field: 'myDel',
          displayName: 'מחיקה',
          width: "62",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',

          cellTemplate: '<div class="btn gridBtnCss" ng-click="grid.appScope.myDeleteFunc(row)"><i class="glyphicon glyphicon-trash" </i></div>'

        },
           {
               field: 'edit',
               displayName: 'עריכה',
               width: "62",
               cellClass: 'deleteCell',
               headerClass: 'deleteHeader',
               cellTemplate: '<div ng-click="grid.appScope.createNewActivity(2,row)" class="btn gridBtnCss"><i class="glyphicon glyphicon-edit" alt="edit"</i></div>'

           },
        //{
        //  field: 'watch',
        //  width: "62",
        //  cellClass: 'deleteCell',
        //  headerClass: 'deleteHeader',
        //  displayName: 'צפייה',
        //  cellTemplate: '<div class="btn gridBtnCss" ng-click="myWatchFunc()"><i class="glyphicon glyphicon-eye-open" </i></div>'

            
        //},
        //{
        //  field: 'duplicate',
        //  displayName: 'שכפול',
        //  width: "62",
        //  cellClass: 'deleteCell',
        //  headerClass: 'deleteHeader',
        //  cellTemplate: '<div class="btn gridBtnCss" ng-click="myWatchFunc()"><i class="glyphicon glyphicon-duplicate" </i></div>'

        //},
         
        
     
              //{
              //    field: 'published',
              //    cellClass: 'deleteCell',
              //    headerClass: 'deleteHeader',
              //    width: "230",
              //    displayName: 'סטאטוס פרסום'


              //    //cellTemplate: '<input type="checkbox" ng-model="row.entity.pub" ng-click="toggle(row.entity.name,row.entity.pub)">'
              //},
        {
          field: 'code',
          width: "82",
          cellClass: 'codeCell',
          headerClass: 'deleteHeader',
          displayName: 'קוד גישה'

        }, {
          field: 'description',
          width: "394",
          cellClass: 'deleteCell',
          headerClass: 'deleteHeader',
          displayName: 'תיאור'
        },
     
        {
          field: 'name',

          width: "423",
          cellClass: 'nameCell',
          headerClass: 'deleteHeader',
          displayName: 'שם הפעילות',
          cellTemplate:'<div class="ui-grid-cell-contents enterToActivity" ng-click="grid.appScope.loadById(row)">{{grid.appScope.getProperty(row,"name")}}</div>'
        },
             {
                 field: 'published',
                 cellClass: 'deleteCell',
                 headerClass: 'deleteHeader',
                 width: "60",
                 displayName: 'פרסום',
                 cellTemplate: '<div class="btn gridBtnCss"  ng-click="grid.appScope.publishActivity(row.entity)"><i ng-class={"isPublished":row.entity.published} class="glyphicon glyphicon-cloud-upload" alt="upload"  tooltip-placement="left" tooltip="אחרי פרסום הפעילות, יש לספק למשתמשים קוד גישה" </i></div>'


                 //cellTemplate: '<input type="checkbox" ng-model="row.entity.pub" ng-click="toggle(row.entity.name,row.entity.pub)">'
             },
     ]
    };


    var myLoginValidation = 0;
  


    $scope.getProperty = function( row,property ) {
      return row.entity[property];
    };

    function init() {
      dataService.checkifEditorisLoggedin();
      getActivities();
   
    }
   
    $scope.publishActivity = function (activity)
    {
        dataService.getScenarios(activity.myID)
        .then(function (completeActivity) {
            if (completeActivity.attributes.published == true) {
                dataService.currentActivity.set("published", false);

                dataService.currentActivity.save(null, { // שמירה של הפעילות
                    success: function () {

                        activity.published = false;
                        $scope.$digest();
                    },
                    error: function (err) {

                    }
                });

            }
            else { 
                dataService.isActivityComplete = true;
                if (dataService.currentActivity.scenarios.length == 0) {
                    dataService.isActivityComplete = false;


                }
              
            angular.forEach(dataService.currentActivity.scenarios, function (scenario) {
                if (scenario.interactions[0] && scenario.interactions[0].type != "endMessege") {
                    if (scenario.interactions[0].distractors.length==0) {
                        dataService.isActivityComplete = false;

                        
                    }
                    angular.forEach(scenario.interactions[0].distractors, function (distractor) {
                     
                        if (distractor.linkTo == null) {
                            dataService.isActivityComplete = false;
                        }
                    })
                }
            
            })
      
     

            dataService.isRecommendedScenario = true;

            //בדיקה האם הוגדר תרחיש מומלץ
            if (dataService.currentActivity.attributes.recommendedScenarios == undefined) {

                dataService.isRecommendedScenario = false;
            }
            if (dataService.isRecommendedScenario && dataService.isActivityComplete) {


                dataService.currentActivity.set("published", true);

                dataService.currentActivity.save(null, { // שמירה של הפעילות
                    success: function () {

                        activity.published = true;
                        $scope.$digest();
                    },
                    error: function (err) {

                    }
                });


            }
            else {

                var modalInstance = $modal.open({
                    windowClass: 'editModalClass ourModal',
                    //template:,
                    templateUrl: 'views/publishedNotificationModal.html',
                    controller: "publishedNotificationModalCtrl"
              
                });

              
            }
        }
        })


    }
    $scope.myDeleteFunc=function(row)
    {
        var modalInstance = $modal.open({
            windowClass: 'editModalClass ourModal',
            //template:,
            templateUrl: 'views/conformaitionActivityDeleteModal.html',
            controller: "conformaitionActivityDeleteModalCtrl",
            resolve: {
                row: function () {
                    return row;
                },
                state: function () {
                    return "deleteActivity";
                }
            }
        });

        modalInstance.result.then(function (val) {
            if (val == true) {
                if (row.entity.original) {
                   
                    row.entity.original.destroy({
                        success: function (myObject) {
                            $timeout(function () {
                                $scope.activitiesData.splice(row.entity.index, 1);
                            },0)
                            
                        },
                        error: function (myObject, error) {
                            // The delete failed.
                            // error is a Parse.Error with an error code and message.
                        }
                    });

                    
                }

            }
            else {
                //בטל
                console.log("myVal: " + val);
            }
        });




    }
    $scope.logOutFunc = function () {
        Parse.User.logOut();
        $location.path("/StartPage");

    }

    function setDataForUiGrid(results){
      var arr = [];
      angular.forEach(results,function(result,index){
        var obj = {};
        obj.name = result.attributes.name;
        obj.code = result.attributes.code;
        obj.index = index;
        obj.myID = result.id;
        obj.original = result;
        console.log("obj.myID " + obj.myID);
        obj.description = result.attributes.description;
        obj.updatedAt = result.updatedAt;
        obj.published = result.attributes.published;

        
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
