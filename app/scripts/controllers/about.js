'use strict';

/**
 * @ngdoc function
 * @name angularFrameworkApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularFrameworkApp
 */
angular.module('angularFrameworkApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
