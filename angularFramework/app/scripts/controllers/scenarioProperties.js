'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService,state, tempAnswerArry) {
       var Distractors;
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
        debugger;
      $scope.scenario.interactions[0] = $scope.tempAnswerArry;


      for (var i = 0; i < $scope.tempAnswerArry.distractors.length; i++) {
          // if ($scope.scenario.interactions[0].length < i + 1) {
          var interaction = $scope.scenario.original.attributes.interactions[0];

          var distractorsLength = $scope.scenario.interactions[0].distractors;
          var originDistracctorArry = [];
          originDistracctorArry = $scope.scenario.interactions[0].distractors;
          var originDistractor = interaction.attributes.distractors[i];
          var distractor = $scope.scenario.interactions[0].distractors[i];



         

          // 1. we need to check if the distractor has an original value if it does, we need to change $scope.scenario.interactions[0].distractors[i] parse way according to
          //יש יותר מסיחים בחדש מאשר במקור - צריך להוסיף את המסיח החדש למער
          if (distractorsLength.length == i + 1) {
              //צור רשומה חדשה בפארס של מסיח
             //לא הולךךךךךךך
          } else {


          //האם התוכן של מסיח קיים ומסיח חדש שונים? כן --צריך לעדכן את פארס
          if (distractor.text != originDistractor.attributes.text) {

              originDistractor.set("text", distractor.text);
              scenario.original.save(null, {
                  success: function (savedDistractor) {
                      //distractor have been successfully saved to Parse
                      // only then, we close the modal
                      $modalInstance.close();
                  },
                  error: function (err) {

                  }
              });
          }else{
              //הערכים זהים בין מקור לחדש - אין צורך לעשות כלום
          }


    
            
            
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
