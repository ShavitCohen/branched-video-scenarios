'use strict';


angular.module('angularFrameworkApp')
  .controller('scenarioPropertiesCtrl', function ($scope, $modalInstance, scenario,dataService,state,scenarioInteraction,$modal) {
    var Interactions = Parse.Object.extend("Interactions");

    $scope.scenario = scenario;

    $scope.scenarioInteraction = scenarioInteraction;

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

    function getInteractions(){

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

    /**
     * This function will add a new distractor to the interaction
     * @param tempAnswerArry
     */

      //כפתור הפלוס הירוק
    $scope.addAnswer = function () {
        debugger;
      var newAnswer = { text: "", linkTo: null, original:null };
      $scope.scenarioInteraction.distractors.push(newAnswer);

      //var interaction = $scope.scenario.original.attributes.interactions[0];


      //var Distractors = Parse.Object.extend("Distractors");

      //var DistractorsIns = new Distractors();


      //DistractorsIns.set("text", "");
      //DistractorsIns.set("linkTo", "1");//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל
      //DistractorsIns.set("parent", interaction); // חשוב להגדרת האבא של הפעילות


      //interaction.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות


      //interaction.save(null, { // שמירה של הפעילות
      //    success: function (interaction) {
      //        debugger;
      //        (scenario.interactions[0].distractors).push(DistractorsIns);

      //        $scope.$digest();
      //    },
      //    error: function (obj, error) {
      //        debugger;
      //    }
      //});





      /*var interaction = $scope.scenario.original.attributes.interactions[0];*/



      /*(tempAnswerArry.distractors).push(newAnswer);*/
      /*debugger;*/

      /*dataService.setDistractorsIndex();*/
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

    $scope.saveChangesInOriginArray = function () {
        debugger;
      //   scenario.attributes.interactions.text = $scope.interacionText;

      var interaction = $scope.scenario.original.attributes.interactions[0];

      interaction.set("text", $scope.interacionText);
      interaction.save(null,{
        success:function(savedInteraction){
        },
        error:function(err){

        }
      });
      
      for (var i = 0; i < tempAnswerArry.distractors.length; i++) {

        if ($scope.scenario.interactions.length <= i + 1) {
            //$scope.scenario.interactions.length >  what is this? the current scenario's interactions?


            var interaction = $scope.scenario.original.attributes.interactions[0];
            var interaction2 = $scope.scenario.interactions[0].original;


          var Distractors = Parse.Object.extend("Distractors");

          var DistractorsIns = new Distractors();


          DistractorsIns.set("text", tempAnswerArry.distractors[i].text);
          DistractorsIns.set("linkTo", null);//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל
          DistractorsIns.set("parent", interaction); // חשוב להגדרת האבא של הפעילות


          interaction.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות


          interaction.save(null, { // שמירה של הפעילות
            success: function (interaction) {
              debugger;
              //(scenario.interactions[0].distractors).push(DistractorsIns);

              //$scope.$digest();
            },
            error: function (obj, error) {
              debugger;
            }
          });



          //var distractorIns = new Distractor();
          //var distractor = tempAnswerArry.original;
          //distractor.set("text", tempAnswerArry.distractors[i].text);
          //$scope.scenario.interactions[0].distractors.add("distractors", distractor);
          //distractor.save(null, {
          //    success: function (savedDistractor) {

          //    },
          //    error: function (err) {

          //    }
          //});

        }
        else{
          var distractor = $scope.scenario.interactions[0].distractors[i].original;
          distractor.set("text", tempAnswerArry.distractors[i].text);
          distractor.save(null, {
            success: function (savedDistractor) {

            },
            error: function (err) {

            }
          });
        }
        // 1. we need to check if the distractor has an original value if it does, we need to change $scope.scenario.interactions[0].distractors[i] parse way according to
        //} else {

        //var myNewDistractorText = [];
        // myNewDistractorText.push(tempAnswerArry.distractors[i]);
        // distractor.attributes.text = myNewDistractorText[i].text;



        //scenario.original.attributes.interactions[0].attributes.distractors[i].set("text", tempAnswerArry.distractors[i].text);

        //scenario.original.attributes.interactions[0].attributes.distractors[i].save(null, {
        //        success:function(savedDistractors){
        //            //scenario have been successfully saved to Parse
        //            // only then, we close the modal
        //            $modalInstance.close();
        //        },
        //        error:function(err){

        //        }
        //    });







        // we need to create a distractor (parse way)
        // and then push it to $scope.scenario.interactions[0].distractors
      }
      //}
      // when the loop is over
      // we need to save only the $scope.scenario.interactions[0] which is the parent of all interactions







      //  $scope.scenario.interactions[0] = $scope.scenarioInteraction;


      //  for (var i = 0; i < $scope.scenarioInteraction.distractors.length; i++) {
      //      // if ($scope.scenario.interactions[0].length < i + 1) {
      //      var interaction = $scope.scenario.original.attributes.interactions[0];

      //      var distractorsLength = $scope.scenario.interactions[0].distractors;
      //      var originDistracctorArry = [];
      //      originDistracctorArry = $scope.scenario.interactions[0].distractors;
      //      var originDistractor = interaction.attributes.distractors[i];
      //      var distractor = $scope.scenario.interactions[0].distractors[i];





      //      // 1. we need to check if the distractor has an original value if it does, we need to change $scope.scenario.interactions[0].distractors[i] parse way according to
      //      //יש יותר מסיחים בחדש מאשר במקור - צריך להוסיף את המסיח החדש למער
      //      if (distractorsLength.length == i + 1) {
      //          //צור רשומה חדשה בפארס של מסיח
      //         //לא הולךךךךךךך
      //      } else {


      //      //האם התוכן של מסיח קיים ומסיח חדש שונים? כן --צריך לעדכן את פארס
      //      if (distractor.text != originDistractor.attributes.text) {

      //          originDistractor.set("text", distractor.text);
      //          scenario.original.save(null, {
      //              success: function (savedDistractor) {
      //                  //distractor have been successfully saved to Parse
      //                  // only then, we close the modal
      //                  $modalInstance.close();
      //              },
      //              error: function (err) {

      //              }
      //          });
      //      }else{
      //          //הערכים זהים בין מקור לחדש - אין צורך לעשות כלום
      //      }





      //        }
      //  }
      //  // when the loop is over
      //  // we need to save only the $scope.scenario.interactions[0] which is the parent of all interactions

      //  // if the save is success, we close the modal

      //};


      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
    };
  });
