﻿angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML
     

  });