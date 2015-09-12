angular.module('angularFrameworkApp')
  .controller('publishedNotificationModalCtrl', function ($scope, dataService, $modalInstance) {
      $scope.dearEditor = "עורך יקר,";
      //לעבוד על התנאים
      if (dataService.isRecommendedScenario == false && dataService.isActivityComplete == false) {
          
          $scope.editorPublishNotification = "אינך יכול לפרסם את הפעילות מכיוון שישנה לפחות אפשרות בחירת אחרת שאיננה מקושרת + לא הגדרת תרחיש מומלץ (משוב למשתמש).";

      }
      else if (dataService.isRecommendedScenario == false && dataService.isActivityComplete == true) {
          $scope.editorPublishNotification = "אינך יכול לפרסם את הפעילות מכיוון שלא הגדרת תרחיש מומלץ (משוב למשתמש).";


      }
      else if (dataService.isActivityComplete == false && dataService.isRecommendedScenario == true) {
          $scope.editorPublishNotification = "אינך יכול לפרסם את הפעילות מכיוון שישנה לפחות אפשרות בחירת אחת שאיננה מקושרת.";

      }
      $scope.closeModal = function()
      {
          $modalInstance.close();

      }
  });