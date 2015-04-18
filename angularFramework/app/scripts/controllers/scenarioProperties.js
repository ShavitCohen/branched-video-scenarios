'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService) {
    $scope.scenario = scenario;


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



    $scope.addAnswer = function (answersArray) {

      var answer = { text: "", scenario: "", isRightAnswer:""}

      if ($scope.isChecked == true)
      {
        answer.isRightAnswer = true;
      }
      answersArray.push(answer);
      dataService.setDistractorsIndex();
    }


    $scope.deleteAnswer = function (index, answersArray)
    {
      answersArray.answers.splice(index, 1);

    }

    $scope.deleteQuestions = function (index, myScenario) {
      myScenario.questions.splice(index, 1);
      $modalInstance.close();
      console.log(myScenario);
    }

  });
