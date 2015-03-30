'use strict';

/**
 * @ngdoc function
 * @name angularFrameworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFrameworkApp
 */
angular.module('angularFrameworkApp')
  .controller('MainCtrl', function ($scope) {
      
      $scope.myCasesActivities = [
          {
              activitycode: 100,
              type: "iFrame",
              quality: "default",
              volume: "unmute",
              height: 580,
              width: 1020,
              currentTime: null,
              controls: true,
              "z-index": 0,
              scenarios: [
                    {
                        myMovieNum: 1,
                        myMovName: "opening start",
                        id: "XIsXgNFGTJQ",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "�����", scenario: 2 },
                                    { text: "����� ������", scenario: 4 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 2,
                        myMovName: "ignor him",
                        id: "D6-CDlYWzYY",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "�����", scenario: 3 },
                                    { text: "���� ����", scenario: 5 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 3,
                        myMovName: "Leave",
                        id: "kp4u4yRfJao",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                answers: [
                                    { text: "null", scenario: "tryAgain_5" },
                                    { text: "null", scenario: "null" }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 4,
                        myMovName: "see if he is ok",
                        id: "E7vLCnkTkFg",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "���� ����", scenario: 5 },
                                    { text: "����� ���� ��� ����", scenario: 6 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 5,
                        myMovName: "search for help",
                        id: "y33_JJicV7g",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                answers: [
                                    { text: "null", scenario: "tryAgain_7" },
                                    { text: "null", scenario: 3 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 6,
                        myMovName: "call 911",
                        id: "NSTR1oHg7Rw",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "����� ������", scenario: 8 },
                                    { text: "��� �����", scenario: 7 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 7,
                        myMovName: "freakout",
                        id: "XPiI86kx5So",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "����� ������", scenario: 8 },
                                    { text: "�����", scenario: 3 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 8,
                        myMovName: "start cpr",
                        id: "3-EOXfM2h2I",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "����� ������", scenario: 9 },
                                    { text: "����� �����������", scenario: 10 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 9,
                        myMovName: "continue cpr",
                        id: "OxxUjYZ9adY",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "�� ����?",
                                answers: [
                                    { text: "���� ����", scenario: 5 },
                                    { text: "����� �����������", scenario: 10 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario 
                    {
                        myMovieNum: 10,
                        myMovName: "use aed",
                        id: "ThMCY_Dw5Kg",
                        StartTime: 0,
                        endTime: 5,
                        movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                answers: [
                                    { text: "null", scenario: "tryAgain_3" },
                                    { text: "null", scenario: "null" }
                                ]
                            }
                        ]
                    } //finish mov - next scenario 
              ]
          }
      ];

      $scope.checkActivitycode = function () {
         // if ($scope.myCaseCode == $scope.myCasesActivities.activitycode) {
              $scope.checkCodeResult = "������";
              $scope.myInput = "������";
         // }
          };
      

    //$scope.shavit = "this is shavit";

    //$scope.duplicate = function (a, b) {
    //    return a * b;
    //}

    //$scope.clearInputs = function () {
    //    $scope.myInput = "";
    //    $scope.myInput = "";
    //}
    



      $scope.clicktoOpen = function () {
          ngDialog.open({template:'openDiagId'});
      };



  });

//angular.module('angularFrameworkApp')
//  .controller('aaaCtrl', function ($scope) {
//      $scope.shavit = "shavitaaaaaa";


//  });

