angular.module('angularFrameworkApp')
  .directive("scenarioTop", function ($modal, dataService,$timeout) {
      return {
          restrict: 'E',
          templateUrl: "scripts/modules/scenarioTop/scenario.top.view.html",
          scope: {
              scenario: "="
          },
          link: function (scope, element, attrs) {
              scope.shavit = JSON.stringify(scope.data);
              scope.dataService = dataService;
              
             

              //function init() {

              //    if (dataService.currentActivity.scenarios[0].original.id)
              //    {
              //        if (scope.scenario.original.id == dataService.currentActivity.scenarios[0].original.id) {
              //            $('.firstScenarioIndicator' + dataService.myCounterLoop).removeClass('firstScenarioIndicator_hidden');
              //            // dataService.firstScenarioIndicator = true;
              //            $('.firstScenarioIndicator' + dataService.myCounterLoop).addClass('firstScenarioIndicator_show');
              //            dataService.myCounterLoop++;
              //            console.log("flag is set to true");
                          
              //        }
              //        else {

              //            //    dataService.firstScenarioIndicator = false;
              //            $('.firstScenarioIndicator' + dataService.myCounterLoop).removeClass('firstScenarioIndicator_hidden');
              //            console.log("flag is set to false");
              //            dataService.myCounterLoop++;
              //        }
              //    }
                  
              //}
              //init();

              scope.isShowDistractors = false;

              scope.toggle = function () {


                  scope.btnarr = 1;
                  if (dataService.isBtnState == true) {

                      dataService.isBtnState = false;

                  }


                  if (scope.isShowDistractors == true) {
                      scope.isShowDistractors = false;
                      dataService.isSelectRelationship = false;
                  }
                  else {
                      if (dataService.isSelectRelationship == false) {

                          dataService.isSelectRelationship = true;
                          scope.isShowDistractors = true;
                          dataService.isBtnState = false;

                      }

                  }

              };


              scope.scenarioClickToLink = function (scenario) {
                  //changing linkTo num of the save distracor
                  $('.bigLinkBtn').removeClass('bigLinkBtn_hover');

                  //var Distractors = Parse.Object.extend("Distractors");
                  //var DistractorsIns = new Distractors();
                  dataService.myCurrentDistractorClicked.original.set("linkTo", scenario.index);
                  dataService.myCurrentDistractorClicked.original.set("linkToScenarioID", scenario.objectId);
                  //linkToScenarioID
                  dataService.myCurrentDistractorClicked.original.save(null, {
                      success: function (distractor) {
                          dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

                      },
                      error: function (obj, error) {
                      }
                  });

                  dataService.myCurrentDistractorClicked.linkTo = scenario.index;
                  dataService.myCurrentDistractorClicked.linkToScenarioID = scenario.objectId;

                  //calling arrows function

                  $('.myscene').removeClass('sceneHover');
                  $('.arrow').removeClass('backgroundArrowsGrey');
                  $('.myscene').removeClass('backgroundArrowsGrey');

                  dataService.is_DistractorClicked2Link = false;


                  console.log("clicked distrctor name :" + angular.element(scope.myClickedDistractor2Link_Name));
                  console.log("you are now clicked: " + dataService.is_DistractorClicked2Link);
                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  $('.distractorDot').removeClass('distractorClickToLinkNewStyle');
                  $('.distractorDot').addClass('sceneHoverChildsBorderLine');
                  $('.distractorDot').addClass('sceneHoverChildscolor');
                  // $('.myscene').addClass('sceneHover');
                  dataService.isBtnState = false;
                  //קריאה לפונקציה שתאפס את כל מצבי הכפתורים
                  dataService.closeAllBtns();
                  dataService.setArrows();
              };

              scope.openEditDialog = function (scenario) {
                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass ourModal',
                      templateUrl: 'views/editMovModal.html',
                      controller: "scenarioPropertiesCtrl",
                      resolve: {
                          scenario: function () {
                              return scenario;
                          },
                          state: function () {
                              return "edit";
                          },
                          scenarioInteraction: function () {
                              return angular.copy(scenario.interactions[0]);
                          }
                      }
                  });
                  modalInstance.result.then(function (copyOf_scenarioInteraction) {
                      var interaction = scenario.interactions[0];
                      //First we save the text
                      interaction.text = copyOf_scenarioInteraction.text;
                      interaction.openingMessege = copyOf_scenarioInteraction.openingMessege;
                      interaction.endMessegeText = copyOf_scenarioInteraction.endMessegeText;
                      interaction.original.set("text", copyOf_scenarioInteraction.text);
                      interaction.original.set("type", dataService.interactionType);
                      interaction.original.set("openingMessege", copyOf_scenarioInteraction.openingMessege);
                      interaction.original.set("endMessegeText", copyOf_scenarioInteraction.endMessegeText);



                      //Then we want to remove the deleted distractors
                      interaction.distractors = copyOf_scenarioInteraction.distractors;
                      if (copyOf_scenarioInteraction.distractorsToRemove) {
                          angular.forEach(copyOf_scenarioInteraction.distractorsToRemove, function (distractor) {
                              if (distractor.original) {
                                  interaction.original.remove("distractors", distractor.original); //removing the distractor form the instructions array
                              }
                          })
                      }

                      //Then we want to copy/extend the items from the interactions we created in the modal to the real interaction
                      angular.extend(interaction.distractors, copyOf_scenarioInteraction.distractors);
                      angular.forEach(interaction.distractors, function (distractor) {
                          if (distractor.original) { // this mean that this is not a new item
                              distractor.original.set("text", distractor.text);
                              distractor.original.set("linkTo", distractor.linkTo);
                              distractor.original.set("linkToScenarioID", scenario.objectId);
                              console.log("scenario top directive - setting -  distractor.original.set(linkToScenarioID, scenario.objectId) --> so scenario.objectId  === " + scenario.objectId);
                              //after setting the distractor with the new values we should save it
                              distractor.original.save(null, {
                                  success: function (distractor) {
                                      dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

                                      //The distractor have been updated.
                                  },
                                  error: function (obj, error) {

                                  }
                              });
                          } else {
                              distractor.original = addDistractor(interaction.original, distractor);
                          }
                      });

                      interaction.original.save(null, { // שמירה של הפעילות
                          success: function (interaction) {
                              dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

                              dataService.setDistractorsIndex(dataService.currentActivity);
                              scope.$parent.$parent.$digest(); // this refresh the view of the parent of the directive (the parent that holds both .top and .bottom)
                          },
                          error: function (obj, error) {

                          }
                      });


                  }, function () {
                      log.info('Modal dismissed at: ' + new Date());
                  });

              };

              function addDistractor(parent, distractor) {
                  var Distractors = Parse.Object.extend("Distractors");
                  var DistractorsIns = new Distractors();
                  DistractorsIns.set("text", distractor.text);
                  DistractorsIns.set("linkTo", distractor.linkTo);
                  DistractorsIns.set("linkToScenarioID", distractor.linkToScenarioID);
                  DistractorsIns.set("parent", parent); // חשוב להגדרת האבא של הפעילות
                  parent.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות
                  return DistractorsIns;
              }

              scope.openMovDialog = function (scenario) {

                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass ourModal',
                      templateUrl: 'views/editPreviewModal.html',
                      controller: "scenarioPreviewCtrl",
                      resolve: {
                          scenario: function () {
                              return scope.scenario;
                          },
                          state: function () {
                              return "previewScenarios";
                          }
                      }
                  });

              }





              scope.openAddMovieDialog = function (scenario) {

                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass ourModal',
                      //template:,
                      templateUrl: 'views/AddMovie.html',
                      controller: "scenarioAddMovieCtrl",
                      resolve: {
                          scenario: function () {
                              return scenario;
                          },
                          state: function () {
                              return "edit";
                          }
                      }
                  });


                  //After the modal is being closed we want to manualy ask angular to render the view by scope.$digest();
                  modalInstance.result.then(function () {
                      scope.$digest();
                  });
              }


              scope.openDeleteMovieDialog = function (scenario) {

                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass ourModal',
                      //template:,
                      templateUrl: 'views/confirmationModal.html',
                      controller: "confirmationModalCtrl",
                      resolve: {
                          scenario: function () {
                              return scenario;
                          },
                          state: function () {
                              return "deleteScenario";
                          },
                          activityScenario: function () {
                              return angular.copy(dataService.currentActivity);
                          },
                          headerText:function(){
                            return "מחיקת תרחיש";
                          },
                          bodyText:function(){
                            return "האם אתה בטוח שתרצה למחוק את התרחיש ואת התוכון שהוגדר עבורו ?";
                          },
                          okButtonText:function(){
                            return "מחק";
                          },
                          cancelButtonText:function(){
                            return "בטל";
                          }
                      }
                  });

                modalInstance.result.then(function (val) {
                  if (val == true) {
                    if (scenario.original) {
                        var _scenario = scenario; // just to be able to refer it later



                        for (var i = 0; i < dataService.currentActivity.scenarios.length; i++) {

                            for (var j = 0; j < dataService.currentActivity.scenarios[i].interactions[0].distractors.length; j++) {

                                if (dataService.currentActivity.scenarios[i].interactions[0].distractors[j].linkTo == scenario.index) {
                                    dataService.currentActivity.scenarios[i].interactions[0].distractors[j].original.set("linkToScenarioID", null);

                                     dataService.currentActivity.scenarios[i].interactions[0].distractors[j].original.set("linkTo", null);
                                    //after setting the distractor with the new values we should save it
                                     dataService.currentActivity.scenarios[i].interactions[0].distractors[j].original.save(null, {
                                         success: function (distractor) {
                                             dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

                                            //The distractor have been updated.
                                        },
                                        error: function (obj, error) {

                                        }
                                    });

                                }
                            }
                        }
                      dataService.currentActivity.remove("scenarios", scenario.original); //removing the distractor form the instructions array

                      dataService.currentActivity.save(null, {
                          success: function (scenario) {
                              dataService.myCurrentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");


                          $timeout(function(){
                            dataService.setCurrentActivity(dataService.currentActivity);
                          },100);
                        },
                        error: function (obj, error) {

                        }
                      })
                    }


                  }
                  else {
                    //בטל
                  }
                });






              }

          }

      }
  });
