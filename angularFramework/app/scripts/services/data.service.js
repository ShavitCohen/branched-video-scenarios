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
              movieLink: "https://www.youtube.com/iframe_api?wmode=opaque",
              scenarios: [
                    {
                        movIndex: 1,
                        
                        myMovName: "opening start",
                        videoId: "XIsXgNFGTJQ",
                        id:1,
                        startTime: 0,
                        endTime: 5,
                       
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתעלם", linkTo: 2 },
                                    { text: "אבדוק לשלומו", linkTo: 4, isRightAnswer: true }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 2,
                        
                        myMovName: "ignor him",
                        videoId: "D6-CDlYWzYY",
                        id: 2,
                        startTime: 0,
                        endTime: 5,
                       
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אעזוב", linkTo: 3 },
                                    { text: "אחפש עזרה", linkTo: 5 }
                                ]

                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 3,
                        myMovName: "Leave",
                        videoId: "kp4u4yRfJao",
                        id: 3,
                        startTime: 0,
                        endTime: 5,
                       
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                distractors: [
                                    { text: "null", linkTo: "tryAgain_5" },
                                    { text: "null", linkTo: "null" }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 4,
                        myMovName: "see if he is ok",
                        videoId: "E7vLCnkTkFg",
                        id: 4,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אחפש עזרה", linkTo: 5 },
                                    { text: "אתקשר למגן דוד אדום", linkTo: 6, isRightAnswer: true }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 5,
                        myMovName: "search for help",
                        videoId: "y33_JJicV7g",
                        id: 5,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                distractors: [
                                    { text: "null", linkTo: "tryAgain_7" },
                                    { text: "null", linkTo: 3 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 6,
                        myMovName: "call 911",
                        videoId: "NSTR1oHg7Rw",
                        id: 6,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתחיל החייאה", linkTo: 8, isRightAnswer: true },
                                    { text: "אצא מדעתי", linkTo: 7 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 7,
                        myMovName: "freakout",
                        videoId: "XPiI86kx5So",
                        id: 7,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתחיל החייאה", linkTo: 8 },
                                    { text: "אעזוב", linkTo: 3 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 8,
                        myMovName: "start cpr",
                        videoId: "3-EOXfM2h2I",
                        id: 8,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אמשיך החייאה", linkTo: 9 },
                                    { text: "אשתמש בדפיברילטור", linkTo: 10, isRightAnswer: true }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 9,
                        myMovName: "continue cpr",
                        videoId: "OxxUjYZ9adY",
                        id: 9,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אחפש עזרה", linkTo: 5 },
                                    { text: "אשתמש בדפיברילטור", linkTo: 10 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 10,
                        myMovName: "use aed",
                        videoId: "ThMCY_Dw5Kg",
                        id: 10,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                distractors: [
                                    { text: "null", linkTo: "tryAgain_3" },
                                    { text: "null", linkTo: "null" },
                                    { text: "null", linkTo: "null" }
                                ]
                            }
                        ]
                    } //finish mov - next scenario
              ]
          }
    ];

    data.calculateArrow = function (secondMovieNum) {
        var myDiviation = data.clickedScenarioMovieNum - secondMovieNum;
        if (myDiviation < 0) {
            myDiviation = myDiviation *-(1);
            data.clickedDistactor.lineWidth = myDiviation * 125;
            data.clickedDistactor.lineDirection = 1;
            data.clickedDistactor.lineWidthForMargin = 0;
            data.clickedDistactor.lineArrowDirection = false;

            console.log("left lineWidth: " + data.clickedDistactor.lineWidth);
            console.log(" left lineDirection: " + data.clickedDistactor.lineDirection);
            console.log(" left lineWidthForMargin: " + data.clickedDistactor.lineWidthForMargin);
            console.log("left  lineArrowDirection: " + data.clickedDistactor.lineArrowDirection);

        }
        else {
            data.clickedDistactor.lineWidth = myDiviation * 125;
            data.clickedDistactor.lineDirection = -1;
            data.clickedDistactor.lineWidthForMargin = data.clickedDistactor.lineWidth;
            data.clickedDistactor.lineArrowDirection = true;

            console.log("rigt lineArrowDirection: " + data.clickedDistactor.lineArrowDirection);
            console.log("rigt lineWidth: " + data.clickedDistactor.lineWidth);
            console.log("rigt lineDirection: " + data.clickedDistactor.lineDirection);
            console.log("rigt lineWidthForMargin: " + data.clickedDistactor.lineWidthForMargin);

       
        }
       // console.log("lineWidth: " + data.clickedDistactor.lineWidth);

     //   data.clickedDistactor.lineDirection = (myDiviation > 0) ? -1 : 1;


     //   console.log("lineDirection: " + data.clickedDistactor.lineDirection);


    }


        //data.clickedDistactor.lineWidth = myDiviation * 125;
        //console.log(data.clickedDistactor.lineWidth);

        //data.clickedDistactor.lineDirection = (myDiviation > 0) ? -1 : 1;
        //console.log(data.clickedDistactor.lineDirection);
    //    data.clickedDistactor.lineDirection = (myDiviation < 0) ? 1 : 1;

    //}


    /**
     * This function go over all the activity array and set the global distractor index
     * This what help to order the distractors one after the other
     */
    data.setDistractorsIndex = function(){
      var globalDistractorIndex = 0;
      for (var i=0;i<data.activities[0].scenarios.length;i++){
        var myScenario = data.activities[0].scenarios[i];
        myScenario.index = i;
        for (var j = 0; j < myScenario.interactions[0].distractors.length; j++) {
            var myDistractor = myScenario.interactions[0].distractors[j];
          myDistractor.index = globalDistractorIndex;
          globalDistractorIndex++;
        }
      }

    };

    data.isSelectRelationship = false;
    data.isBtnState = false;

    return data;

});
