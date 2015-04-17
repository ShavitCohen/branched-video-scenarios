angular.module('angularFrameworkApp')
.factory('dataService', function () {
    //פונקציה גלובלית שתעבוד אל מול דפים שונים
    var data = {};

    data.activities = [
          {
              activitycodeName:"עזרה ראשונה",
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
                        movieLink: "https://www.youtube.com/watch?v=",
                        questions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אתעלם", scenario: 2 },
                                    { text: "אבדוק לשלומו", scenario: 4, isRightAnswer: true }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אעזוב", scenario: 3 },
                                    { text: "אחפש עזרה", scenario: 5 }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אחפש עזרה", scenario: 5 },
                                    { text: "אתקשר למגן דוד אדום", scenario: 6, isRightAnswer: true }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אתחיל החייאה", scenario: 8, isRightAnswer: true },
                                    { text: "אצא מדעתי", scenario: 7 }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אתחיל החייאה", scenario: 8 },
                                    { text: "אעזוב", scenario: 3 }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אמשיך החייאה", scenario: 9 },
                                    { text: "אשתמש בדפיברילטור", scenario: 10, isRightAnswer: true }
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
                                text: "מה תעשה?",
                                answers: [
                                    { text: "אחפש עזרה", scenario: 5 },
                                    { text: "אשתמש בדפיברילטור", scenario: 10 }
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
                                    { text: "null", scenario: "null" },
                                { text: "null", scenario: "null" }
                                ]
                            }
                        ]
                    } //finish mov - next scenario 
              ]
          }
    ];


    data.isSelectRelationship = false;
    data.isBtnState = false;


    return data;

});
