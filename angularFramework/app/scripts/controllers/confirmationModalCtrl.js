/**
 * Created by shavit on 8/9/15.
 */
'use strict';


angular.module('angularFrameworkApp')
  .controller('confirmationModalCtrl', function ($scope, $modalInstance, header, bodyText) {
    $scope.header = header;
    $scope.bodyText = bodyText;

    $scope.closeModal = function(val){
      $modalInstance.close(val);
    }
  });
