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
    data.setArrows = function(){
             angular.forEach(data.currentActivity.scenarios, function(scenario){
                  angular.forEach(scenario.interactions[0].distractors, function(distractor){
                      if(distractor.linkTo){
                            data.linkInitDistrctors(distractor,scenario);
                      }
                    })
                })
          };
    data.linkInitDistrctors = function (distractor, scenario) {



        if (distractor.text != "") {


            data.connectionLength = distractor.linkTo - scenario.index;
            //  data.lineDirection = 1;
            //    data.clickedDistactor = distractor;

            //distractor.connectionLength * distractor.lineDirection

            if (data.connectionLength < 0) {
                distractor.lineWidth = data.connectionLength * (-125);
                distractor.lineDirection = -1;
                distractor.lineArrowDirection = 0;
                distractor.lineWidthForMargin = distractor.lineWidth;

            }

            else if (data.connectionLength > 0) {
                distractor.lineWidth = data.connectionLength * 100;


                distractor.lineDirection = 1;
                distractor.lineArrowDirection = 1;
                distractor.lineWidthForMargin = 0;

            }
            else if (data.connectionLength == 0) {
                distractor.lineArrowDirection = 2;
            }

        }



    }





    /**
     * This function go over all the activity array and set the global distractor index
     * This what help to order the distractors one after the other
     */
    data.setDistractorsIndex = function(currentActivity){
      var globalDistractorIndex = 0;
      for (var i = 0; i < currentActivity.scenarios.length; i++) {
        var myScenario = currentActivity.scenarios[i];
        if (myScenario.interactions[0]) {
          myScenario.index = i;
          if (myScenario.interactions[0].distractors[0] && myScenario.interactions[0].distractors.length > 0) {
            for (var j = 0; j < myScenario.interactions[0].distractors.length; j++) {
              var myDistractor = myScenario.interactions[0].distractors[j];
              myDistractor.index = globalDistractorIndex;
              globalDistractorIndex++;
            }
          }
        }
      }
      data.allDistractorsCount = globalDistractorIndex;
    };

    data.userClickedScenariosSummary = [];
    data.scenarioLengthforSummary = [];
    data.editorUserDifferences = false;
    data.myRedBack = false;
    data.allDistractorsCount = 0;

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

    //הפעילות עלינו אנחנו עובדים
    data.currentActivity;


    data.currentScenarioId;
    //מערך גייסון שיכיל את הטבלאות נתונים מהפארס
    data.selectedActivityDataarr = [];
    data.selectedActivity_Scnarios_Dataarr = [];
    data.selectedActivityScenario_Interactions_Dataarr = [];
    data.selectedActivityScenarioInteractions_Distaractors_Dataarr = [];



    data.closeAllBtns = function() {

      //פונקציה למצב לחיצה על מסיח לטובת קישור
      //נבדוק 3 מצבים - האם המסיח הנלחץ הוא כבר בחור, האם מסיח אחר כלשהו כבר נלחץ, ומה מצב הכפתורים הגדולים לקישור
      data.isBtnState = false;

      angular.forEach(data.currentActivity.scenarios, function (scenario) {
        angular.forEach(scenario.interactions[0].distractors, function (distractor) {
          distractor.clickedGreenDistractorToLink = false;
        })
      })
    };


    data.setCurrentActivity = function(activity){
      data.currentActivity = activity;
      var scenarios = activity.attributes.scenarios;
      if (scenarios != undefined && scenarios.length > 0) {
        //$scope.scenarios = scenarios;
        var arr = [];
        angular.forEach(scenarios, function (scenario) {
          var myScenario = data.getScenariosinJsonFormat(scenario);
          arr.push(myScenario);
          /*dataService.currentActivity = activity;*/
        });
        data.currentActivity.scenarios = arr;
      }
      data.setDistractorsIndex(data.currentActivity);
    };


    data.myFuncFindingScenarioToPush = function(distractorLinkTo){
        for (var i = 0; i < data.currentActivity.scenarios.length; i++) {
            var scenario = data.currentActivity.scenarios[i];

            if (i == distractorLinkTo) {
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









    data.getScenariosinJsonFormat=function(scenario) {

      if (scenario) {
        var obj1 = {};
        obj1.name = scenario.attributes.name;
        obj1.videoId = scenario.attributes.videoId;
        obj1.startTime = scenario.attributes.startTime;
        obj1.endTime = scenario.attributes.endTime;
        obj1.parent = scenario.attributes.parent;
        obj1.original = scenario;
        obj1.objectId = scenario.id;


        var arr = [];
        angular.forEach(scenario.attributes.interactions, function (interaction) {
          var myInteraction = data.getInteractionsinJsonFormat(interaction);
          arr.push(myInteraction);
        });


        obj1.interactions = arr;

      }
      return obj1;
    }
    data.getInteractionsinJsonFormat=function(interaction) {


      if (interaction) {
        var obj = {};
        obj.text = interaction.attributes.text;
        obj.type = interaction.attributes.type;
        obj.openingMessege = interaction.attributes.openingMessege;
        obj.endMessegeText = interaction.attributes.endMessegeText;
        obj.original = interaction;
        obj.objectId = interaction.id;
        obj.parent = interaction.attributes.parent;

        var arr = [];
        angular.forEach(interaction.attributes.distractors, function (distractor) {
          var myDistractor = data.getDistractorsinJsonFormat(distractor);
          arr.push(myDistractor);
        })

        obj.distractors = arr;
      }

      return obj;
    }
    data.getDistractorsinJsonFormat=function(distracor) {


      if (distracor) {
        var obj = {};
        obj.text = distracor.attributes.text;
        obj.type = distracor.attributes.type;
        obj.linkTo = distracor.attributes.linkTo;

        obj.original = distracor;
        obj.objectId = distracor.id;
        obj.parent = distracor.attributes.parent;

      }

      return obj;
    }







    return data;

  });
