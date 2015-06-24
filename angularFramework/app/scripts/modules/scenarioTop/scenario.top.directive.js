angular.module('angularFrameworkApp')
  .directive("scenarioTop", function ($modal,dataService) {
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
                  else
                  {
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
                  dataService.myCurrentDistractorClicked.linkTo = scenario.movIndex;
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
                  
                  //קריאה לפונקציה שתאפס את כל מצבי הכפתורים
                  dataService.closeAllBtns();

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
