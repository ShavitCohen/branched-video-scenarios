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




              scope.answerClickToLink = function (distractor) {
                  scope.btnarr = 2;
                  dataService.clickedDistactor = distractor;
                  dataService.clickedScenarioMovieNum = scope.scenario.movIndex;


              dataService.isBtnState = !dataService.isBtnState;

            //  dataService.isSelectRelationship = true;


          };
          scope.scenarioClickToLink = function () {

dataService.calculateArrow(scope.scenario.movIndex);
    

          };

        scope.openEditDialog = function (scenario) {
            scope.tempAnswerArry = scenario.interactions[0].distractors;

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
                        return scope.tempAnswerArry;

                    }
                }
            });
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
                        return scope.scenario;
                    },
                    state: function () {
                        return "edit";
                    }
                }
            });
        }




        scope.linkInitDistrctors = function (distractor, scenario) {
            //distractor.globalIndex = scope.globalDistractorCount.count++;
            //console.log("videoId " + match[7]);
            if (distractor.text != "null") {
                //scope.isShowDistractors = false;
                //dataService.isSelectRelationship = false;
                var myLinkArrowLength = distractor.linkTo - scenario.id;
                console.log("distractor = " + distractor.text + " is linked to = " + distractor.linkTo);
                dataService.clickedDistactor = distractor;


                if (scenario.id > distractor.linkTo) {
                    console.log("distractor = " + distractor.text + "  with Id = " + scenario.id + " is greater then the link to " + distractor.linkTo + " ... diff is = " + myLinkArrowLength);
                }
                else {
                    console.log("distractor = " + distractor.text + "  with Id = " + scenario.id + " is smaller then the link to " + distractor.linkTo + " ... diff is = " + myLinkArrowLength);
                }

                dataService.clickedDistactor.lineWidth = myLinkArrowLength * 125;
                console.log("lineWidth = " + dataService.clickedDistactor.lineWidth);
            }
        }

      }

    }

  });
