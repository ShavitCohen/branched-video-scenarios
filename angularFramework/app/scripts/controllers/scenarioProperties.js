'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario, dataService, tempAnswerArry) {
    $scope.scenario = scenario;
    $scope.tempAnswerArry = tempAnswerArry;

   

    $scope.headlingOfAddScene = "הוספת שאלה חדשה";
    $scope.checkIfExist = function (scenario) {
      if (scenario.myMovName[0] != null) {
          $scope.headlingOfAddScene = "עריכת שאלה עבור סצינת " + scenario.myMovName;
        //להוסיף מה שיהיה צריך כשמנגנון יוסיף עמודים


        //$scope.myUrl = scenario.movieLink + scenario.id;
        //$scope.loadTheYoutubeUrl($scope.scenario.id);
        //$scope.myscenarioName = scenario.myMovName;
        //$scope.myStartTime = scenario.StartTime;
        //$scope.myEndTime = scenario.endTime;
      }
    }



    $scope.addAnswer = function (tempAnswerArry) {

        var newAnswer = { text: "", scenario: "", isRightAnswer: "" };

      if ($scope.isChecked == true)
      {
        answer.isRightAnswer = true;
      }
        //  $scope.tempAnswerArry = [];
    //  console.log();
      tempAnswerArry.push(newAnswer);
      console.log("afterpush: " + tempAnswerArry);
      console.log("orginArry:" + scenario.interactions[0].distractors);
     //answersArray.push(answer);
      dataService.setDistractorsIndex();
    }


    $scope.deleteAnswer = function (index, answersArray)
    {
        answersArray.distractors.splice(index, 1);

    }

    $scope.deleteQuestions = function (index, myScenario) {
        myScenario.interactions.splice(index, 1);
      $modalInstance.close();
      console.log(myScenario);
    }

  });
