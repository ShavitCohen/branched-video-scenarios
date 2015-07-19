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
     // צריכה למצוא את האינטראקציה עליה לחצתי ולעדכן אותה ספציפית. אחרת הוא פשוט מוסיף עוד רשומה

     
        var Scenario = Parse.Object.extend("Scenario");
        var Interactions = Parse.Object.extend("Interactions");
        var Distractors = Parse.Object.extend("Distractors");
        debugger;

        var query = new Parse.Query(Interactions);
        query.equalTo("parent", dataService.currentScenario);//צריך לשמור איכשהו את האבא של איטראקשיין שהוא למעשה האיידי של סנריו כערך פארסי
      // query.include(["interactions.distractors"]);
        query.find({
            success: function (interactions) {
                debugger;




            },
            error: function (error) {
                debugger;
            }
        });













       
 




        //var Interactions = Parse.Object.extend("Interactions");

        //var InteractionsIns = new Interactions();


        //InteractionsIns.set("type", $scope.tempAnswerArry.type);
        //InteractionsIns.set("text", $scope.tempAnswerArry.text);
        //InteractionsIns.set("parent", scenario.original); // חשוב להגדרת האבא של הפעילות


        //scenario.original.add("interactions", InteractionsIns); // הוספת הפעילות למערך הפעילויות
        //scenario.original.save(null, { // שמירה של הפעילות
        //    success: function (scenario) {

        //        var Distractors = Parse.Object.extend("Distractors");

        //        var DistractorsIns = new Distractors();


        //        DistractorsIns.set("text", tempAnswerArry.distractors.text);
        //        DistractorsIns.set("linkTo", "1");//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל
        //        DistractorsIns.set("parent", InteractionsIns); // חשוב להגדרת האבא של הפעילות


        //        InteractionsIns.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות


        //        InteractionsIns.save(null, { // שמירה של הפעילות
        //            success: function (interaction) {
        //                debugger;
        //                $modalInstance.close(tempAnswerArry);
        //            },
        //            error: function (obj, error) {
        //                debugger;
        //            }
        //        });
               


        //    }



        //});


        //if ($scope.checkboxSelection == "singleSelection") {



        //    $modalInstance.close(tempAnswerArry);

        //}
        //else if ($scope.checkboxSelection == "endMessege") {

        //    console.log("אני בהודעת סיום");
        //    $modalInstance.close();
    };
        

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
