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
                        firstScenario:true,
                        myMovName: "איש נופל",
                        videoId: "XIsXgNFGTJQ",
                        id:1,
                        startTime: 0,
                        endTime: 5,
                        openingMessege: "הגיע הזמן להציל חיים. מוכן להתחיל?",
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתעלםאתעלםעלםאתעל לילך", linkTo: 2, distractorIndex:1 },
                                    { text: "אבדוק לשלומו", linkTo: 4, isRightAnswer: true, distractorIndex: 2 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 2,
                        myMovName: "אתעלם ממנו",
                        videoId: "D6-CDlYWzYY",
                        id: 2,
                        startTime: 0,
                        endTime: 5,
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אעזוב", linkTo: 3, distractorIndex: 3 },
                                    { text: "אחפש עזרה", linkTo: 5, distractorIndex: 4 }
                                ]

                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 3,
                        myMovName: "אעזוב",
                        videoId: "kp4u4yRfJao",
                        id: 3,
                        startTime: 0,
                        endTime: 5,
                       
                        interactions: [
                            {
                                type: "endMessege",
                                text: "לא חבל? האיש מת",
                                distractors: [
                                   { text: "סוף", distractorIndex: 5 }
                                    //,
                                    //{ text: "gg", linkTo: "null" }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 4,
                        myMovName: "אבדוק אם הוא בסדר",
                        videoId: "E7vLCnkTkFg",
                        id: 4,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אחפש עזרה", linkTo: 5, distractorIndex: 6 },
                                    { text: "אתקשר למגן דוד אדום", linkTo: 6, isRightAnswer: true, distractorIndex: 7 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 5,
                        myMovName: "אחפש עזרה",
                        videoId: "y33_JJicV7g",
                        id: 5,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                distractors: [
                                    { text: "s", linkTo: "tryAgain_7", distractorIndex: 8 },
                                    { text: "s", linkTo: 3, distractorIndex: 9 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 6,
                        myMovName: "אתקשר למגן דוד אדום",
                        videoId: "NSTR1oHg7Rw",
                        id: 6,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתחיל החייאה", linkTo: 8, isRightAnswer: true, distractorIndex: 10 },
                                    { text: "אצא מדעתי", linkTo: 7, distractorIndex: 11 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 7,
                        myMovName: "אצא מדעתי",
                        videoId: "XPiI86kx5So",
                        id: 7,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אתחיל החייאה", linkTo: 8, distractorIndex: 12 },
                                    { text: "אעזוב", linkTo: 3, distractorIndex: 13}
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 8,
                        myMovName: "אתחיל החייאה",
                        videoId: "3-EOXfM2h2I",
                        id: 8,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אמשיך החייאה", linkTo: 9, distractorIndex: 14 },
                                    { text: "אשתמש בדפיברילטור", linkTo: 10, isRightAnswer: true, distractorIndex: 15 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 9,
                        myMovName: "אמשיך החייאה",
                        videoId: "OxxUjYZ9adY",
                        id: 9,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "מה תעשה?",
                                distractors: [
                                    { text: "אחפש עזרה", linkTo: 5, distractorIndex: 16 },
                                    { text: "אשתמש בדפיברילטור", linkTo: 10, distractorIndex: 17 }
                                ]
                            }
                        ]
                    }, //finish mov - next scenario
                    {
                        movIndex: 10,
                        myMovName: "אשתמש בדפיבלירטור",
                        videoId: "ThMCY_Dw5Kg",
                        id: 10,
                        startTime: 0,
                        endTime: 5,
                        
                        interactions: [
                            {
                                type: "singleSelection",
                                text: "null",
                                distractors: [
                                    { text: "f", linkTo: "end", distractorIndex: 18 }
                                ]
                            }
                        ]
                    } //finish mov - next scenario
              ]
          }
    ];

    data.linkInitDistrctors = function () {

        //console.log("distractor,scenario = " + distractor.text + "  " +  scenario.id);

        angular.forEach(data.activities[0].scenarios, function(scenario){
            angular.forEach(scenario.interactions[0].distractors, function(distractor){
               
                console.log("checking now... " + "distractor = " + distractor.text);

                if (distractor.text != "null") {


                    data.connectionLength = distractor.linkTo - scenario.id;
                  //  data.lineDirection = 1;
                    console.log("distractor = " + distractor.text + " is linked to = " + distractor.linkTo);
                //    data.clickedDistactor = distractor;
                    
                    //distractor.connectionLength * distractor.lineDirection

                    if (data.connectionLength < 0) {
                        console.log("distractor = " + distractor.text + "  with Id = " + scenario.id + " is greater then the link to " + distractor.linkTo + " ... diff is = " + data.connectionLength);
                        distractor.lineWidth = data.connectionLength * (-125);
                        distractor.lineDirection = -1;
                        distractor.lineArrowDirection = true;
                        distractor.lineWidthForMargin = distractor.lineWidth;
                        console.log(" distractor.lineWidthForMargin; " + distractor.lineWidthForMargin);

                    }

                    else if (data.connectionLength > 0) {
                        distractor.lineWidth = data.connectionLength * 125;

                        console.log("distractor = " + distractor.text + "  with Id = " + scenario.id + " is smaller then the link to " + distractor.linkTo + " ... diff is = " + data.connectionLength);

                        distractor.lineDirection = 1;
                        distractor.lineArrowDirection = false;
                        distractor.lineWidthForMargin = 0;

                    }

                    //data.currentDistractor = distractor;
                    console.log("connectionLength = " + data.connectionLength + "  " + "lineWidth = " + distractor.lineWidth + "  " + "lineDirection = " + data.lineDirection);
                    // console.log("connectionLength = " + dataService.clickedDistactor.connectionLength);
                }

                
                //else if (distractor.text == "null") {
                //    data.connectionLength = 0;
                //    data.lineDirection = 0;
                //}
            
            })
        });

        
    }


    //data.calculateArrow = function (secondMovieNum) {
    //    var myDiviation = data.clickedScenarioMovieNum - secondMovieNum;
    //    if (myDiviation < 0) {
    //        myDiviation = myDiviation *-(1);
    //        data.clickedDistactor.lineWidth = myDiviation * 125;
    //        data.clickedDistactor.lineDirection = 1;
    //        data.clickedDistactor.lineWidthForMargin = 0;
    //        data.clickedDistactor.lineArrowDirection = false;

    //        console.log("left lineWidth: " + data.clickedDistactor.lineWidth);
    //        console.log(" left lineDirection: " + data.clickedDistactor.lineDirection);
    //        console.log(" left lineWidthForMargin: " + data.clickedDistactor.lineWidthForMargin);
    //        console.log("left  lineArrowDirection: " + data.clickedDistactor.lineArrowDirection);

    //    }
    //    else {
    //        data.clickedDistactor.lineWidth = myDiviation * 125;
    //        data.clickedDistactor.lineDirection = -1;
    //        data.clickedDistactor.lineWidthForMargin = data.clickedDistactor.lineWidth;
    //        data.clickedDistactor.lineArrowDirection = true;

    //        console.log("rigt lineArrowDirection: " + data.clickedDistactor.lineArrowDirection);
    //        console.log("rigt lineWidth: " + data.clickedDistactor.lineWidth);
    //        console.log("rigt lineDirection: " + data.clickedDistactor.lineDirection);
    //        console.log("rigt lineWidthForMargin: " + data.clickedDistactor.lineWidthForMargin);

       
    //    }






    // console.log("lineWidth: " + data.clickedDistactor.lineWidth);

    //   data.clickedDistactor.lineDirection = (myDiviation > 0) ? -1 : 1;


    //   console.log("lineDirection: " + data.clickedDistactor.lineDirection);


//}


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
    //data.myCurrentDistractorClicked = "sheker";
    data.myClickedDistractor = 0;
    data.myClickedDistractor_scenario = 0;
    data.myPreviousDistractorClicked = 0;
    data.myPreviousScenarioClicked = 0;
    data.myPreviousDistractorClicked_copy = 0;
    data.myPreviousScenarioClicked_copy = 0;

    //data.clickedGreenDistractorToLink = true;

    data.isSelectRelationship = false;
    data.isBtnState = false;
    data.is_DistractorClicked2Link = false;

    data.myCurrentSceneClicked2Link;
    data.myCurrentmovIndex = 1;

    //מערך גייסון שיכיל את הטבלאות נתונים מהפארס
    data.selectedActivityDataarr = [];
    data.selectedActivity_Scnarios_Dataarr = [];
    data.selectedActivityScenario_Interactions_Dataarr = [];
    data.selectedActivityScenarioInteractions_Distaractors_Dataarr = [];
   


    data.closeAllBtns = function() {

        //פונקציה למצב לחיצה על מסיח לטובת קישור
        //נבדוק 3 מצבים - האם המסיח הנלחץ הוא כבר בחור, האם מסיח אחר כלשהו כבר נלחץ, ומה מצב הכפתורים הגדולים לקישור
        data.isBtnState = false;

        angular.forEach(data.activities[0].scenarios, function (scenario) {
            angular.forEach(scenario.interactions[0].distractors, function (distractor) {
                distractor.clickedGreenDistractorToLink = false;                          
            })                      
        })
    };


    data.myFuncFindingScenarioToPush = function(scenarioIndex){
        for (var i = 0; i < data.activities[0].scenarios.length; i++) {
            var scenario = data.activities[0].scenarios[i];
            if (scenario.movIndex == scenarioIndex) {
                return scenario;
            }
        }
    }

    data.checkifEditorisLoggedin=function(){
    
    var currentUser = Parse.User.current();
        if (currentUser) {
            // do stuff with the user
        } else {
            // show the signup or login page
            $location.path("/StartPage");
        }
    }

    return data;

});
