angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService, $modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
      var myMovIndex = 0;
      var Scenario;
      var Interactions;
      var Distractors;
      $scope.selectedActivity_Scnarios_Dataarr1 = [];

      function init() {
         // console.log(" dataService.currentActivity " + dataService.currentActivity.myID);
          Scenario = Parse.Object.extend("Scenario");
          Interactions = Parse.Object.extend("Interactions");
          Distractors = Parse.Object.extend("Distractors");

          getScenarios();
          console.log("init---goiing to getinteraction function");
          
         
            



          var freezLineTop = $('.freezLine').css('top');
          $(window).on('scroll', function () {
              $('.freezLine').css('top', 200 + $(window).scrollTop());

          });
      }




      init();
      
      $scope.createScenario = function () {
          var scenarioIns = new Scenario();


          scenarioIns.set("name", $scope.updateNameTxt);
          scenarioIns.set("movIndex", myMovIndex);
          scenarioIns.set("firstScenario", true); // חשוב להגדרת האבא של הפעילות
          scenarioIns.set("videoId", $scope.updateUrlTxt);
          scenarioIns.set("startTime", $scope.updateStartTimeTxt);
          scenarioIns.set("endTime", $scope.updateEndTimeTxt);
          scenarioIns.set("openingMessege", "");
          scenarioIns.set("parent", dataService.currentActivity); // חשוב להגדרת האבא של הפעילות

              myMovIndex++;
              
              dataService.currentActivity.add("scenarios", scenarioIns); // הוספת הפעילות למערך הפעילויות
              dataService.currentActivity.save(null, { // שמירה של הפעילות
                  success: function (activity) {
                      
                      var myScenario = getScenariosinJsonFormat(scenarioIns);
                      $scope.selectedActivity_Scnarios_Dataarr1.push(myScenario);
                      //getScenarios();
                      $scope.$digest();

                  },
                  error: function (obj,error) {
                  }
              });
              
              //dataService.currentScenarioId = scenario.objectId;
              //debugger;
              //console.log("lilach: " + dataService.currentScenarioId);


     //       dataService.currentActivity.add("Scenario", scenario); // הוספת הפעילות לעמודת תרחישים
     //       dataService.currentActivity.save(); //שמירת הפעילות


          // Create a new instance of that class.


            
       



       //   dataService.currentScenario = scenario;
      }


    
      //$scope.createInteractions = function () {

      //    var interaction = {
      //        parent: "JkBXzg4Ikb",
             
      //        //dataService.selectedScnarioDataarr.objectId
      //    type: "222",
      //    text: "333",
             

      //    }


      //    var Scenario = Parse.Object.extend("Scenario");
      //    var query = new Parse.Query(Scenario);
      //    query.equalTo("objectId", "JkBXzg4Ikb");
      //    // query.include("scenarios");
      //    query.find({
      //        success: function (mycurrentScenario) {

      //            dataService.currentInteractionId = interaction.objectId;
      //            mycurrentScenario.add("Interactions", interaction); // הוספת הפעילות לעמודת תרחישים
      //            mycurrentScenario.save(); //שמירת הפעילות
      //        }
      //    })







      //    // Simple syntax to create a new subclass of Parse.Object.

      //    // Create a new instance of that class.
      //    var interactionsIns = new Interactions();

      //    interactionsIns.save(interaction, {

      //        success: function (interactionsIns) {
      //            // The object was saved successfully.
      //            console.log("הצלחתי");
      //        },
      //        error: function (interactionsIns, error) {
      //            // The save failed.
      //            // error is a Parse.Error with an error code and message.

      //        }
      //    });

      //    dataService.currentInteraction = interaction;

      //}


      $scope.createDistractors = function () {

          var distractors = {
              parent: "HaktFQYD1t",
             
             
                  text: "444",
                  linkTo: 0,
                  distractorIndex: 0
             


          }
          var Interactions = Parse.Object.extend("Interactions");
          var query = new Parse.Query(Interactions);
          query.equalTo("objectId", "HaktFQYD1t");
          // query.include("scenarios");
          query.find({
              success: function (mycurrentInteractions) {

                  mycurrentInteractions.add("Distractors", distractors); // הוספת הפעילות לעמודת תרחישים
                  mycurrentInteractions.save(); //שמירת הפעילות
              }
          })

          // Simple syntax to create a new subclass of Parse.Object.

          // Create a new instance of that class.
          var distractorsIns = new Distractors();

          distractorsIns.save(distractors, {

              success: function (distractorsIns) {
                  // The object was saved successfully.
                  console.log(" ליצור דיסטרקטור הצלחתי");
              },
              error: function (distractorsIns, error) {
                  // The save failed.
                  // error is a Parse.Error with an error code and message.

              }
          });

          // dataService.currentScenario = scenario;
      }




      function getDistractorsinJsonFormat(distracor) {

          
              if (distracor) {
                  var obj = {};
                  obj.text = distracor.attributes.text;
                  obj.type = distracor.attributes.type;
                  obj.original = distracor;
                  obj.objectId = distracor.id;
                 
              }
       
              return obj;
      }


      function getInteractionsinJsonFormat(interaction) {
     
         
          if (interaction) {
              var obj = {};
              obj.text = interaction.attributes.text;
              obj.type = interaction.attributes.type;
              obj.original = interaction;
              obj.objectId = interaction.id;
              

              var arr = [];
              angular.forEach(interaction.attributes.distractors, function (distractor) {
                  var myDistractor = getDistractorsinJsonFormat(distractor);
                  arr.push(myDistractor);
              })

              obj.distractors = arr;
          }
             
          return obj;
      }
         
   


      function getScenariosinJsonFormat(scenario) {
          
          if (scenario) {
              var obj1 = {};
              obj1.name = scenario.attributes.name;
              obj1.videoId = scenario.attributes.videoId;
              obj1.startTime = scenario.attributes.startTime;
              obj1.endTime = scenario.attributes.endTime;
              obj1.parent = scenario.attributes.parent;
              obj1.original = scenario;
              obj1.objectId = scenario.id;

              
              var arr = [];
              angular.forEach(scenario.attributes.interactions, function (interaction) {
                  var myInteraction = getInteractionsinJsonFormat(interaction);
                  arr.push(myInteraction);
              });

               
              obj1.interactions = arr;

          }
              return obj1;
      }

      function getScenarios() {
          console.log("dataService.currentActivity: " + dataService.currentActivity);
          var query = new Parse.Query(Scenario);
          query.equalTo("parent", dataService.currentActivity);
          query.include("interactions");
          query.include(["interactions.distractors"]);
          query.find({
              success: function (scenarios) {
                  debugger;

                  if (scenarios.length > 0) {
                      $scope.scenarios = scenarios;
                      // dataService.currentScenario = results;
                      var arr = [];
                      angular.forEach(scenarios, function (scenario) {
                          var myScenario = getScenariosinJsonFormat(scenario);
                          arr.push(myScenario);
                      });

                      $scope.selectedActivity_Scnarios_Dataarr1 = arr;
                      dataService.selectedActivity_Scnarios_Dataarr = $scope.selectedActivity_Scnarios_Dataarr1;
                      $scope.$digest();
                     // getInteractions();
                  } else {

                  }
                  //var interaction = scenarios[0].get("Interactions")[0];
                  //debugger;
                  

                //  console.log("dataService.selectedActivity_Scnarios_Dataarr this is : " + dataService.selectedActivity_Scnarios_Dataarr);
                //  console.log("dataService.selectedActivity_Scnarios_Dataarr --name---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.name);
                //  console.log("dataService.selectedActivity_Scnarios_Dataarr --id---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.id);
               //   console.log("dataService.selectedActivity_Scnarios_Dataarr --attr-objectid---- this is : " + dataService.selectedActivity_Scnarios_Dataarr.attributes.objectId);

                 

              },
              error: function (error) {

              }
          });
       //   dataService.currentScenario = scenario;


      }

      
      console.log("im goint to get in ");

      //function getInteractions() {

      //    console.log("im in get interaction function");

      //    angular.forEach(dataService.selectedActivity_Scnarios_Dataarr, function (currentScenario) {
      //        console.log("dataService.selectedActivity_Scnarios_Dataarr2222: " + dataService.selectedActivity_Scnarios_Dataarr);
      //        console.log("currentScenario 21212121" + currentScenario);

      //    console.log("dataService.selectedActivity_Scnarios_Dataarr.objectId: " + dataService.selectedActivity_Scnarios_Dataarr.objectId);
      //        var query = new Parse.Query(Interactions);
      //        query.containedIn("parent", dataService.selectedActivity_Scnarios_Dataarr.objectId);
      //        query.find({
                 
      //            success: function (results) {
      //                debugger;

      //                //  $scope.scenarios = results;
      //                dataService.currentInteraction = results;
      //                dataService.selectedActivityScenario_Interactions_Dataarr.push( getInteractionsinJsonFormat(results));
      //                console.log("dataService.selectedActivityScenario_Interactions_Dataarr33333 " + dataService.selectedActivityScenario_Interactions_Dataarr);

      //                $scope.$digest();

      //            },
      //            error: function (error) {

      //            }
      //        });

      //    //});

      //}


  




      function getDistractors() {

          //var query = new Parse.Query(Distractors);
          //query.containedIn("papaScenarioID", dataService.currentInteraction);
          //query.find({
          //    success: function (results) {
          //        debugger;

          //        //  $scope.scenarios = results;
          //        dataService.selectedActivityScenarioInteractions_Distaractors_Dataarr = getDistractorsinJsonFormat(results);
          //        debugger;
          //        $scope.$digest();

          //    },
          //    error: function (error) {

          //    }
          //});

       //   dataService.currentDistractor = distractor;

      }




      $scope.addHoverYellow = function ($event) {
          //console.log("addHoverYellow > checking if distractor is clicked: " + dataService.is_DistractorClicked2Link);

          if ($scope.dataService.is_DistractorClicked2Link == false) {

              $(event.currentTarget).addClass('sceneHover');
              $('.arrow').addClass('backgroundArrowsGrey');
              $(event.currentTarget).removeClass('backgroundArrowsGrey');
              dataService.myCurrentSceneClicked2Link = $(event.currentTarget);
          };
      }
 

      $scope.removeHoverYellow = function ($event) {
          //console.log("removeHoverYellow > checking if distractor is clicked: " + dataService.is_DistractorClicked2Link);
          if ($scope.dataService.is_DistractorClicked2Link == false) {
              $(event.currentTarget).removeClass('sceneHover');
              $('.arrow').removeClass('backgroundArrowsGrey');
              $(event.currentTarget).removeClass('backgroundArrowsGrey');
              //$(event.currentTarget).removeClass('sceneHoverChilds_border', 'sceneHoverChildscolor', 'sceneHoverChildsBorderLine');
          }
      };
 

  //  $scope.dataService.setDistractorsIndex();

      $scope.openAddMovieDialog = function (scenario) {

          var modalInstance = $modal.open({
              windowClass: 'editModalClass',
              //template:,
              templateUrl: 'views/AddMovie.html',
              controller: "scenarioAddMovieCtrl",
              resolve: {
                  scenario: function () {
                      return $scope.scenario;
                  }
                ,
                  state: function () {
                      return "new";
                  }

              }

          });
      }
      
      //קריאה לפונקציה שיוצרת את הקווים המחברים בין מסיחים
    //  dataService.linkInitDistrctors();
  }



  );

