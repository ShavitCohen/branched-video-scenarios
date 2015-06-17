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

              scope.answerClickToLink = function (distractor, $event) {

                  dataService.is_DistractorClicked2Link = true;
                  dataService.myCurrentSceneClicked2Link.removeClass('sceneHover');
                  dataService.myCurrentSceneClicked2Link.parent().removeClass('sceneHover');

                  $('.distractorDot').removeClass('addingLinkGlyphicon');
                  $('.distractorDot').removeClass('distractorClickToLinkNewStyle');

                  $(event.currentTarget).parent().parent().parent().addClass('sceneHover');
                  $(event.target).addClass('distractorClickToLinkNewStyle');
                  $('.bigLinkBtn').addClass('bigLinkBtn_hover');


                  if (dataService.isBtnState == false) {
                      dataService.isBtnState = !dataService.isBtnState;
                      console.log("btn is false...");
                  }

                  if (distractor == dataService.myDistractorCurrentLinkTo) {
                      dataService.isBtnState = !dataService.isBtnState;
                  }

                  scope.myClickedDistractor2Link_Name = event.target;
                  dataService.myDistractorCurrentLinkTo = distractor;
                  dataService.myCurrentSceneClicked2Link = $(event.currentTarget).parent().parent().parent();

              };
          }
      }
  });