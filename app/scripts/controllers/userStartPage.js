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
                      dataService.currentActivity = activity;
                      if (dataService.currentActivity==undefined)
                      {
                       $timeout(function () {
                           $scope.isLoginPossible = false,
                       $scope.userNotification = "לא קיים קוד כזה"


                      }, 300);
                      }
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
                    
                      angular.forEach(dataService.currentActivity.scenarios, function (scenario) {
                          if (scenario.interactions[0] && scenario.interactions[0].type != "endMessege") {
                              angular.forEach(scenario.interactions[0].distractors, function (distractor) {
                                  if (distractor.linkTo == null) {
                                      myLoginValidation++;
                                  }
                              })
                          }
                      })

                      if (dataService.currentActivity.attributes.recommendedScenarios == undefined) {
                      
                          myLoginValidation++;
                      }
                      if (myLoginValidation > 0) {

                          $timeout(function () {
                              $scope.isLoginPossible = false,
                                $scope.userNotification="לא ניתן להיכנס, הפעילות טרם הושלמה"


                          }, 300);

                      }
                      else {
                          $scope.isLoginPossible = true;

                          $timeout(function () {
                              $location.path("/MainPage/" + $scope.myCaseCode);
                          }, 300);
                      }

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




