'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService,state, tempAnswerArry) {

    $scope.scenario = scenario;
    $scope.tempAnswerArry = tempAnswerArry;

   
  
    $scope.checkIfExist = function (scenario) {

       
        if (scenario.state = "edit") {
            $scope.headlingOfAddScene = "עריכת אינטראקציה עבור סצינת " + scenario.myMovName;
            $scope.editModalBTN = "עדכן";
          


            console.log("scenario[0].interactions[0].type " + scenario.interactions[0].type);
            //להוסיף מה שיהיה צריך כשמנגנון יוסיף עמודים


            //$scope.myUrl = scenario.movieLink + scenario.id;
            //$scope.loadTheYoutubeUrl($scope.scenario.id);
            //$scope.myscenarioName = scenario.myMovName;
            //$scope.myStartTime = scenario.StartTime;
            //$scope.myEndTime = scenario.endTime;
        }
        else {

            $scope.headlingOfAddScene = "הוספת אינטראקציה חדשה";
        }


        $scope.checkboxSelection = scenario.interactions[0].type;
        $scope.CheckboxSelectedFunc();

     
        if (scenario.movIndex == 1) {
            $scope.isDisabled = true;
        }
       
    }
    $scope.CheckboxSelectedFunc = function () {
        if ($scope.checkboxSelection == "singleSelection") {
            $scope.whiceInteactionTypeS = true;
            $scope.whiceInteactionTypeE = false;

        }
        else if ($scope.checkboxSelection == "endMessege") {
            $scope.whiceInteactionTypeE = true;
            $scope.whiceInteactionTypeS = false;


        }
    }

    $scope.isCheckboxSelected = function (index) {
        return index === $scope.checkboxSelection;
    };

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
        answersArray.splice(index, 1);

    }

    //$scope.deleteQuestions = function (index, myScenario) {
    //    myScenario.interactions.splice(index, 1);
    //  $modalInstance.close();
    //  console.log(myScenario);
    //}


    $scope.saveChangesInOriginArray = function () {
        if ($scope.checkboxSelection == "singleSelection") {

            $modalInstance.close(tempAnswerArry);

        }
        else if ($scope.checkboxSelection == "endMessege") {

            console.log("אני בהודעת סיום");
            $modalInstance.close();
        }
        console.log("passed ok function to save changes of modal... = " + tempAnswerArry);
        scenario.interactions[0].distractors = tempAnswerArry;
        console.log("orig arr = " + scenario.interactions[0].distractors);
        dataService.setDistractorsIndex();

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
