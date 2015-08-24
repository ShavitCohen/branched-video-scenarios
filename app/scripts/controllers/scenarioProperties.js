'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService,state,scenarioInteraction,$modal) {
    var Interactions = Parse.Object.extend("Interactions");

    $scope.scenario = scenario;
    $scope.scenarioInteraction = scenarioInteraction;

    $scope.checkIfExist = function (scenario) {

        if (scenario.original.id == dataService.currentActivity.scenarios[0].original.id) {
            $scope.isfirstScenario = true;
            $scope.isDisabled = true;

        }
        else {
            $scope.isfirstScenario = false;


        }
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


    
     
    }

  


    $scope.CheckboxSelectedFunc = function () {
        if (scenario.interactions[0].type == "singleSelection") {
            console.log("print single");

        $scope.whiceInteactionTypeS = true;
        $scope.whiceInteactionTypeE = false;

        dataService.interactionType = "singleSelection";

      }
        else if (scenario.interactions[0].type == "endMessege") {
          console.log("print end");
        $scope.whiceInteactionTypeE = true;
        $scope.whiceInteactionTypeS = false;


      
        dataService.interactionType = "endMessege";



      }
    }

    $scope.isCheckboxSelected = function (index) {
      return index === $scope.checkboxSelection;
    };

    /**
     * This function will add a new distractor to the interaction
     * @param tempAnswerArry
     */

      //כפתור הפלוס הירוק
    $scope.addAnswer = function () {
        debugger;
      var newAnswer = { text: "", linkTo: null, original:null };
      $scope.scenarioInteraction.distractors.push(newAnswer);

   
    }


    $scope.deleteAnswer = function (index, answersArray)
    {
      var distractor = answersArray[index];
      if(!scenarioInteraction.distractorsToRemove){
          scenarioInteraction.distractorsToRemove = [];
          
      }
      if(distractor.original){//if the distractor exists in parse
        scenarioInteraction.distractorsToRemove.push(distractor);
      }
      answersArray.splice(index, 1);
    }

    $scope.closeModal = function(){
      $modalInstance.close(scenarioInteraction);
    };
    $scope.cancel = function(){
        $modalInstance.close();
    };
  });
