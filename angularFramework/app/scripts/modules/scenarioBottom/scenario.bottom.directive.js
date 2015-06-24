angular.module('angularFrameworkApp')
  .directive("scenarioBottom", function ($modal, dataService) {
      return {
          restrict: 'E',
          templateUrl: "scripts/modules/scenarioBottom/scenario.bottom.view.html",
          scope: {
              scenario: "="
          },
          link: function (scope, element, attrs) {
              //scope.shavit = "hey";
              scope.shavit = JSON.stringify(scope.data);

              scope.dataService = dataService;

              scope.changeArrowBackgroundStyleGrey = function ($event, scenario, $index) {
                  if (scenario.hoverYellowSceneElements == true) {
                      $('.arrow').addClass('backgroundArrowsGrey');
                      $('.currArrowClass_' + scenario.movIndex).addClass('hoverYellowSceneElements_GreenDistractors');
                     // console.log("currArrowClass_' + scenario.movIndex) :"+'currArrowClass_ '+ scenario.movIndex);
                  }
                  else {
                      $('.arrow').removeClass('backgroundArrowsGrey');
                      $('.currArrowClass_' + scenario.movIndex).removeClass('hoverYellowSceneElements_GreenDistractors');
                  }
                  
              };


             

              scope.answerClickToLink = function (scenario, distractor, isSelected) {

                 
                  if (dataService.isBtnState == true) {
                      //יש כבר כפתור פתוח לקישור
                      //קריאה לפונקציה שמאפסת את כל הכפתורים
                      
                      if (distractor.clickedGreenDistractorToLink == true) {
                          isSelected = false;
                      }
                      dataService.closeAllBtns();
                  }
                  distractor.clickedGreenDistractorToLink = isSelected;
                  dataService.isBtnState = isSelected;
                  
                  //הכרחי עבור קישור בין סצינות - חיצים
                  dataService.myCurrentDistractorClicked = distractor;
              };

              

              
          }
      }
  });