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



          scope.promoteDistractorCount = function (distractor)
          {
              distractor.globalIndex = scope.globalDistractorCount.count++;
          }



            //  scope.btnarr = 0;
            //  scope.btnURL = ["EditBTN.png","addBTN.png","whatToDoBTN.png","linkToBTN.png"]
            //  scope.changeBTN = function () {
            //      switch (scope.btnarr) {
            //         case 0:
            //    scope.btnarr=1;
            //   break;
            //case 1:
            //    scope.btnarr = 2;
            //   break;
            //      case 2:
            //     scope.btnarr=3
            //   break;
            //case 3:
            //     scope.btnarr=0;
            //   break;
            //      }
            //  }


              scope.isShowDistractors = false;

          scope.toggle = function () {
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




          scope.answerClickToLink = function () {

              dataService.isBtnState = !dataService.isBtnState;

            //  dataService.isSelectRelationship = true;


          };
          scope.scenarioClickToLink = function () {
              alert("הוקלקתי");
          };

        scope.openEditDialog = function (scenario) {

            var modalInstance = $modal.open({
                windowClass: 'editModalClass',
                //template:,
                templateUrl: 'views/editMovModal.html',
                controller:"scenarioPropertiesCtrl",
                resolve: {
                    scenario: function () {
                        return scope.scenario;
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
                    }
                }
            });
        }


      }

    }

  });
