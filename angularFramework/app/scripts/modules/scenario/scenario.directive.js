angular.module('angularFrameworkApp')
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

              
              


              scope.answerClickToLink = function (distractor, $event) {

                  dataService.is_DistractorClicked2Link = true;                 

                  //console.log("event.currentTarget = " + $(event.currentTarget));
                  //console.log("dataService.myCurrentSceneClicked2Link = " + dataService.myCurrentSceneClicked2Link);

                  dataService.myCurrentSceneClicked2Link.removeClass('sceneHover');
                  dataService.myCurrentSceneClicked2Link.parent().removeClass('sceneHover');

                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  $('.distractorDot').removeClass('distractorClickToLinkNewStyle');

                  $(event.currentTarget).parent().parent().parent().addClass('sceneHover');
                  
                  // dataService.is_DistractorClicked2Link = true;
                  console.log("answer click2link  >  is_DistractorClicked2Link = " + dataService.is_DistractorClicked2Link);

                
                  console.log("you are now clicked: " + dataService.is_DistractorClicked2Link);

                  $(event.target).addClass('distractorClickToLinkNewStyle');
                  // $(event.currentTarget).addClass('sceneHover');
                  $('.bigLinkBtn').addClass('bigLinkBtn_hover');
                  

                  if (dataService.isBtnState == false) {
                      dataService.isBtnState = !dataService.isBtnState;
                      console.log("btn is false...");
                  }

                  ////////this is not working///////////
                  //if (angular.element(event.currentTarget) == angular.element(dataService.myCurrentSceneClicked2Link)) {
                  //    dataService.isBtnState = !dataService.isBtnState;
                  //    console.log("clicked on the same btn11111111111111111111111111111111111111111111111111111111111...");
                  //}
                  ////////this is not working///////////

                  if (distractor == dataService.myDistractorCurrentLinkTo) {
                      dataService.isBtnState = !dataService.isBtnState;
                  }

                  scope.myClickedDistractor2Link_Name = event.target;
                  console.log("clicked distrctor name :" + scope.myClickedDistractor2Link_Name);

                  dataService.myDistractorCurrentLinkTo = distractor;

                  dataService.myCurrentSceneClicked2Link = $(event.currentTarget).parent().parent().parent();

              };




              scope.scenarioClickToLink = function (scenario) {
                  //changing linkTo num of the save distracor
                  $('.bigLinkBtn').removeClass('bigLinkBtn_hover');
                  dataService.myDistractorCurrentLinkTo.linkTo = scenario.movIndex;
                  //calling arrows function
                  dataService.linkInitDistrctors();
                  $('.myscene').removeClass('sceneHover');
                  $('.arrow').removeClass('backgroundArrowsGrey');
                  $('.myscene').removeClass('backgroundArrowsGrey');

                  dataService.is_DistractorClicked2Link = false;
                 
                  
                  console.log("clicked distrctor name :" +  angular.element(scope.myClickedDistractor2Link_Name));
                  console.log("you are now clicked: " + dataService.is_DistractorClicked2Link);
                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  $('.distractorDot').removeClass('distractorClickToLinkNewStyle');
                  $('.distractorDot').addClass('sceneHoverChildsBorderLine');
                  $('.distractorDot').addClass('sceneHoverChildscolor');
                 // $('.myscene').addClass('sceneHover');
                  dataService.isBtnState = false;
              };

              scope.openEditDialog = function (scenario) {
                  scope.tempAnswerArry = angular.copy(scenario.interactions[0]);
                  console.log("tempAnswerArrytempAnswerArrytempAnswerArrytempAnswerArry " + scope.tempAnswerArry[0]);
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
                   //   tempAnswerArry.type = scope.checkboxSelection;
                     // console.log("checkboxSelection :" + scope.checkboxSelection);
                      //scope.modalUpdates = tempAnswerArry;
                      angular.extend(scenario.interactions[0], tempAnswerArry);
                      console.log("tttttttttttt---scenario.interactions[0] :" + scenario.interactions[0]);
                      console.log("selectedItem = " + scope.modalUpdates);
                      dataService.setDistractorsIndex();
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
