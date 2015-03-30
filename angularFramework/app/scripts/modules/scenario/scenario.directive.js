angular.module('angularFrameworkApp')
.directive("scenario", function () {
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
                debugger;
            }
        }

    }

})