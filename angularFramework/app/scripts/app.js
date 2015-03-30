'use strict';

/**
 * @ngdoc overview
 * @name angularFrameworkApp
 * @description
 * # angularFrameworkApp
 *
 * Main module of the application.
 */
angular
  .module('angularFrameworkApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
    //'ui.bootstrap.modal',
    //'ui.bootstrap.transition'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'views/StartPage.html',
          controller:"startCtrl"
      })

      .when('/about', {
        templateUrl: 'views/about.html'
      })

      .when('/MainPage', {
          templateUrl: 'views/main.html',
          controller: "MainCtrl"          
      })

      .when('/SummaryPage', {
         templateUrl: 'views/SummaryPage.html'  
      })

         .when('/EditorPage', {
             templateUrl: 'views/editor.html',
             controller:"editorCtrl"
         })

      .otherwise({
        redirectTo: '/'
      });
  });
