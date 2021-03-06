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
    'ngTouch',
    'ui.bootstrap',
    'ui.grid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/UserStartPage.html',
        controller: "userStartPage"
      })

      .when('/StartPage', {
          templateUrl: 'views/StartPage.html',
          controller:"startCtrl"
      })


       .when('/aboutUsModal', {
           templateUrl: 'views/aboutUsModal.html',
           controller: "aboutUsModalCtrl"
       })
      .when('/about', {
        templateUrl: 'views/about.html'
      })

      .when('/MainPage/:id', {
          templateUrl: 'views/main.html',
          controller: "MainCtrl"
      })

      .when('/MainPage/:id?isEmbedding', {
        templateUrl: 'views/main.html',
        controller: "MainCtrl"
      })

      .when('/SummaryPage', {
         templateUrl: 'views/SummaryPage.html'
      })

         .when('/EditorPage/:id', {
             templateUrl: 'views/editor.html',
             controller:"editorCtrl"
         })
    .when('/editorActivities', {
        templateUrl: 'views/editorActivities.html',
        controller: "editorActivitiesCtrl"
    })
         .when('/userSummary', {
             templateUrl: 'views/userSummary.html',
             controller: "userSummaryCtrl"
         })

      .otherwise({
        redirectTo: '/'
      });
  });

Parse.initialize("B4xyoepaRsqirclmu38bwypiwc9kHnYrx3XjbVTA", "ArqzIVB0flaCMJRibbUaCASAU7xkRcwThybOaPZ5");

