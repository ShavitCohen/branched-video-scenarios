angular.module('angularFrameworkApp')
  .directive("scenarioTop", function ($modal, dataService) {
      return {
          restrict: 'E',
          templateUrl: "scripts/modules/scenarioTop/scenario.top.view.html",
          scope: {
              scenario: "="
          },
          link: function (scope, element, attrs) {
              scope.shavit = JSON.stringify(scope.data);
              scope.dataService = dataService;
              //scope.isyoutubeHolderHoverEnterFunc = function () {
              //    scope.isyoutubeHolderHover = true;
              //}
              //scope.isyoutubeHolderHoverLeaveFunc = function () {
              //    scope.isyoutubeHolderHover = false;
              //}


              //scope.removeGreenClass = function () {
              //    $('.distractorDot').hover(function ()
              //    {
              //        if (dataService.is_DistractorClicked2Link == false) {
              //        $(this).removeClass('sceneHoverChildscolor') , $(this).addClass('addingLinkGlyphicon')} });
              //}

              //scope.addGreenClass = function () {
              //    $('.distractorDot').hover(function ()
              //    { $(this).addClass('sceneHoverChildscolor'), $(this).removeClass('addingLinkGlyphicon') });
              //}




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
                  dataService.myCurrentDistractorClicked.original.set("linkTo", scenario.index);//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל

                 

                  
                  dataService.myCurrentDistractorClicked.original.save(null, {
                      success: function (distractor) {
                          //The distractor have been updated.
                      },
                      error: function (obj, error) {

                      }
                  });

                  dataService.myCurrentDistractorClicked.linkTo = scenario.index;
                  //calling arrows function
                  dataService.linkInitDistrctors();
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

              };

              scope.openEditDialog = function (scenario) {
                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass',
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
                      interaction.original.set("text", copyOf_scenarioInteraction.text);
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
                              //after setting the distractor with the new values we should save it
                              distractor.original.save(null, {
                                  success: function (distractor) {
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
                  DistractorsIns.set("linkTo", distractor.linkTo);//לילך תזכורת לעצמי - לא אמור להיות כאן בכללללללללללל
                  DistractorsIns.set("parent", parent); // חשוב להגדרת האבא של הפעילות
                  parent.add("distractors", DistractorsIns); // הוספת הפעילות למערך הפעילויות
                  return DistractorsIns;
              }

              scope.openMovDialog = function (scenario) {

                  var modalInstance = $modal.open({
                      //windowClass: 'editModalClass',
                      templateUrl: 'views/editPreviewModal.html',
                      controller: "scenarioPreviewCtrl",
                      resolve: {
                          scenario: function () {
                              return scope.scenario;
                          }
                      }
                  });

              }





              scope.openAddMovieDialog = function (scenario) {

                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass',
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
                      windowClass: 'editModalClass',
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
                          }
                      }
                  });


     



              }

          }

      }
  });
