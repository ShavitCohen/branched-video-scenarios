'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService,state, tempAnswerArry) {

      $scope.scenario = scenario;

    $scope.tempAnswerArry = tempAnswerArry;

    $scope.checkIfExist = function (scenario) {


        if (scenario.state = "edit" && scenario.interactions[0].distractors.length != 0) {
            $scope.headlingOfAddScene = "עריכת אינטראקציה עבור סצינת " + scenario.name;
            $scope.editModalBTN = "עדכן";

        }
        else {

            $scope.headlingOfAddScene = "הוספת אינטראקציה חדשה";
            $scope.editModalBTN = "שמור";

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
            var newType = "singleSelection";

                   }
        else if ($scope.checkboxSelection == "endMessege") {

            $scope.whiceInteactionTypeE = true;
            $scope.whiceInteactionTypeS = false;
            var newType = "endMessege";



        }
    }

    $scope.isCheckboxSelected = function (index) {
        return index === $scope.checkboxSelection;
    };

    $scope.addAnswer = function (tempAnswerArry) {


      var newAnswer = { text: "", linkTo: ""};

      //if ($scope.isChecked == true)
      //{
      //  answer.isRightAnswer = true;
      //}

      (tempAnswerArry.distractors).push(newAnswer);


      dataService.setDistractorsIndex();
    }


    $scope.deleteAnswer = function (index, answersArray)
    {
        answersArray.splice(index, 1);

    }




    $scope.saveChangesInOriginArray = function () {
      $scope.scenario.interactions[0] = $scope.tempAnswerArry;
      var interaction =$scope.scenario.original.attributes.interactions[0];


      for(var i=0; i< $scope.tempAnswerArry; i++) {
        if($scope.scenario.interactions[0].length < i+1){
          var distractor = $scope.scenario.interactions[0].distractors[i];
          // 1. we need to check if the distractor has an original value if it does, we need to change $scope.scenario.interactions[0].distractors[i] parse way according to
        }else{
          // we need to create a distractor (parse way)
          // and then push it to $scope.scenario.interactions[0].distractors
        }
      }
      // when the loop is over
      // we need to save only the $scope.scenario.interactions[0] which is the parent of all interactions

      // if the save is success, we close the modal

    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
