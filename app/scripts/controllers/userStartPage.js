angular.module('angularFrameworkApp')
  .controller('userStartPage', function ($scope, $location, dataService,$timeout) {
      var Activity;
      var Scenario;
      var Interactions;
      var Distractors;
      var myLoginValidation=0;
      $scope.isLoginPossible = true;

      Activity = Parse.Object.extend("Activity");
      Scenario = Parse.Object.extend("Scenario");
      Interactions = Parse.Object.extend("Interactions");
      Distractors = Parse.Object.extend("Distractors");


      $scope.codeValidate = function (myCaseCode) {
           myLoginValidation = 0;

              var query = new Parse.Query(Activity);
              //query.equalTo("parent", Parse.User.current());
              query.equalTo("code", $scope.myCaseCode);//למה הוא מקבל את הערך כמחרוזת ולא כמספר


              query.include("scenarios");
              query.include(["scenarios.interactions"]);
              query.include(["scenarios.interactions.distractors"]);
              query.first({
                  success: function (activity) {
                      //debugger;
                      if (activity == undefined) {
                          $timeout(function () {
                              $scope.isLoginPossible = false,
                          $scope.userNotification = "קוד זה אינו קיים"


                          }, 0);

                      }
                      else { 
                      if (activity.attributes.published) {
                          $timeout(function () {
                              $location.path("/MainPage/" + $scope.myCaseCode);
                          }, 0);
                          // נכנסים לפעילות
                      } else {
                          $scope.isLoginPossible = false;

                          $timeout(function () {
                              $scope.userNotification = "הפעילות טרם פורסמה";
                          }, 0);

                      }
                      }
                      dataService.currentActivity = activity;
                
                      var scenarios = activity.attributes.scenarios;
                      if (scenarios != undefined && scenarios.length > 0) {
                          $scope.scenarios = scenarios;
                          var arr = [];

                          angular.forEach(scenarios, function (scenario) {
                              var myScenario = dataService.getScenariosinJsonFormat(scenario);
                              arr.push(myScenario);
                              dataService.currentActivity = activity;
                              $scope.myActivitie = dataService.currentActivity.scenarios;
                              $scope.activityName = dataService.currentActivity.attributes.name;

                              dataService.currentActivity.scenarios = arr;



                          });

                      }
            
                      //else {
                      //    $scope.isLoginPossible = true;

                      //    $timeout(function () {
                      //        $location.path("/MainPage/" + $scope.myCaseCode);
                      //    }, 300);
                      //}

                  },
                  error: function (error) {
                   
                  }
              });





          console.log($scope.myCaseCode)

          //if ($scope.myCaseCode == 68483) {

              //אם הקוד קיים אז ננווט לעמוד הבא

          //}
      };

  });




