angular.module('angularFrameworkApp')
  .directive("scenario", function ($modal) {
    return {
      restrict: 'E',
      templateUrl: "scripts/modules/scenario/scenario.view.html",
      scope: {
        scenario: "="
      },
      link: function (scope, element, attrs) {
        //scope.shavit = "hey";
        scope.shavit = JSON.stringify(scope.data);
        scope.openMovDialog = function (scenario) {

          var modalInstance = $modal.open({
            template: '<div>This is just an example</div>',
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
