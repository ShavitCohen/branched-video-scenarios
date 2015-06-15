﻿angular.module('angularFrameworkApp')
  .directive("scenario", function ($modal,dataService) {
      return {
          restrict: 'E',
          templateUrl: "scripts/modules/scenario/scenario.view.html",
          scope: {
              scenario: "="
          },
          link: function (scope, element, attrs) {
              //scope.shavit = "hey";
              scope.shavit = JSON.stringify(scope.data);

              scope.dataService = dataService;



              //scope.promoteDistractorCount = function (distractor)
              //{
              //    distractor.globalIndex = scope.globalDistractorCount.count++;
              //}
              scope.isyoutubeHolderHoverEnterFunc = function () {

                  scope.isyoutubeHolderHover = true;
               
              }
              scope.isyoutubeHolderHoverLeaveFunc = function () {

                  scope.isyoutubeHolderHover = false;

              }


              scope.removeGreenClass = function () {
                  // $(myElementHover).addClass("sceneHover");
                  // angular(this).addClass("sceneHover");
                  $('.distractorDot').hover(function ()
                  {
                      if (dataService.is_DistractorClicked2Link == false) {
                      $(this).removeClass('sceneHoverChildscolor') , $(this).addClass('addingLinkGlyphicon')} });



                 
              }
              scope.addGreenClass = function () {
                
                  $('.distractorDot').hover(function ()
                  { $(this).addClass('sceneHoverChildscolor'), $(this).removeClass('addingLinkGlyphicon') });

                  
              }
              

              scope.btnarr = 1;
              scope.btnURL = ["glyphicon glyphicon-plus", "glyphicon glyphicon-pencil", "glyphicon glyphicon-link"]
              scope.changeBTN = function () {
                  switch (scope.btnarr) {
                      case 0:
                          scope.btnarr=1;
                          break;
                      case 1:
                          scope.btnarr = 2;
                          break;
                      case 2:
                          scope.btnarr = 0;
                          break;
            
                  }
              }


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
                  else
                  {
                      if (dataService.isSelectRelationship == false) {

                          dataService.isSelectRelationship = true;
                          scope.isShowDistractors = true;
                          dataService.isBtnState = false;

                      }

                  }

              };

              
              


              scope.answerClickToLink = function (distractor,event) {
                  dataService.is_DistractorClicked2Link = true;
                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  console.log("you are now clicked: " + dataService.is_DistractorClicked2Link);
                  $(event.target).addClass('distractorClickToLinkNewStyle');
                  $(event.target).removeClass('sceneHoverChildsBorderLine');
                  $(event.target).removeClass('sceneHoverChildscolor');
                  $('.myscene').removeClass('sceneHover');
                  scope.myClickedDistractor2Link_Name = event.target;
                  console.log("clicked distrctor name :" + scope.myClickedDistractor2Link_Name);



                  //saving current distractor for scenarioClickToLink function
                  dataService.myDistractorCurrentLinkTo = distractor;
               


                //  scope.btnarr = 2;
                //  dataService.clickedDistactor = distractor;
               //   dataService.clickedScenarioMovieNum = scope.scenario.movIndex;


               dataService.isBtnState = !dataService.isBtnState;

                  dataService.isSelectRelationship = true;


              };
              scope.scenarioClickToLink = function (scenario) {
                  //changing linkTo num of the save distracor
                  dataService.myDistractorCurrentLinkTo.linkTo = scenario.movIndex;
                  //calling arrows function
                  dataService.linkInitDistrctors();
                  //Tamar

                  dataService.is_DistractorClicked2Link = false;
                 
                  
                  console.log("clicked distrctor name :" +  angular.element(scope.myClickedDistractor2Link_Name));
                  console.log("you are now clicked: " + dataService.is_DistractorClicked2Link);
                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  $('.distractorDot').removeClass('distractorClickToLinkNewStyle');
                  $('.distractorDot').addClass('sceneHoverChildsBorderLine');
                  $('.distractorDot').addClass('sceneHoverChildscolor');
                  $('.myscene').addClass('sceneHover');
                  dataService.isBtnState = false;
              };

              scope.openEditDialog = function (scenario) {
                  scope.tempAnswerArry = scenario.interactions[0];
                  //console.log("mytempAnswerArry " + tempAnswerArry);
                  var modalInstance = $modal.open({
                      windowClass: 'editModalClass',
                      //template:,
                      templateUrl: 'views/editMovModal.html',
                      controller:"scenarioPropertiesCtrl",
                      resolve: {
                          scenario: function () {
                              return scope.scenario;
                          },
                          state: function () {
                              return "edit";
                          },
                          tempAnswerArry: function () {
                              return angular.copy(scope.tempAnswerArry);

                          }
                      }
                  });
                  modalInstance.result.then(function (tempAnswerArry) {
                      scope.modalUpdates = tempAnswerArry;
                      console.log("selectedItem = " + scope.modalUpdates);
                  }, function () {
                      log.info('Modal dismissed at: ' + new Date());
                  });
              };
           
          

   

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
                        return scope.scenario;
                    },
                    state: function () {
                        return "edit";
                    }
                }
            });
        }




      

      }

    }

  });
