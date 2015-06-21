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


              scope.answerClickToLink = function (scenario, distractor, $event) {

                  //בדיקה האם המסיח הנלחץ הוא כבר נלחץ פעמיים
                  //console.log("checking distractor before change : " + distractor.clickedGreenDistractorToLink);


                  //בלחיצה נהפוך את מצב המסיח הנלחץ
                  distractor.clickedGreenDistractorToLink = !distractor.clickedGreenDistractorToLink;

                  console.log("dataService.myClickedDistractor = " + dataService.myClickedDistractor + "  &  distractor.distractorIndex = " + distractor.distractorIndex);

                  if (dataService.myClickedDistractor == distractor.distractorIndex)
                  {
                      //לחצנו על אותו המסיח
                      console.log("same distractor");
                      dataService.isBtnState = !dataService.isBtnState;
                      dataService.myClickedDistractor = 0;
                      dataService.myClickedDistractor_scenario = 0;
                  }
                  else if (dataService.myClickedDistractor != 0) {
                     //לחצנו על מסיח אחר

                      //כאן אנחנו לא מצליחות לאפס את המסיח הקודם שנלחץ - חזרה אל המצב הרגיל ללא מצב הקישור

                      dataService.myClickedDistractor = distractor.distractorIndex;
                      dataService.myClickedDistractor_scenario = scenario.movIndex;
                      //dataService.myClickedDistractor = 0;
                      //dataService.myClickedDistractor_scenario = 0;
                     
                  }
                  else if (dataService.myClickedDistractor == 0) {
                      //לחצנו על מסיח פעם ראשונה
                      dataService.isBtnState = !dataService.isBtnState;
                      console.log("first time we click on a  distractor....dataService.myClickedDistractor ==== 0");
                      dataService.myClickedDistractor = distractor.distractorIndex;
                      dataService.myClickedDistractor_scenario = scenario.movIndex;
                  }
                
                  console.log("dataService.myClickedDistractor = " + dataService.myClickedDistractor);


                  //בדיקה האם המסיח הנלחץ הוא כבר נלחץ פעמיים
                  console.log("checking distractor after change : " + distractor.clickedGreenDistractorToLink);
                  //הכרחי עבור קישור בין סצינות - חיצים
                  dataService.myCurrentDistractorClicked = distractor;

              };
          }
      }
  });