
/////****משתנים גלובליים****/////
//משתנה לעקוב אחר מספר הסרטון
var myMovieNum = 1;
//משתנה לחשב מתי לעצור את הניגון של הסרטון הנוכחי
var video_duration;
//מערך לטקסט בחלונות הקופצים - פתיח וסיום
var openOrcloseTextArr = ['בכל יום, אלפי אנשים סובלים מדום לב פתאומי. האם תדע כיצד לסייע להם?', 'התחל', 'לא צריך כאן טקסט', 'התחל שוב'];
//משתנה לעקוב אחר הטקסט הייעודי לחלון הקופץ
var myArrCounter = 0;
//משתנים ליצירת הנגן והאייפרם
var tag;
var firstScriptTag;
//משתנה לעקוב האם נטען את הסרטון הראשון בסדרה או לא
var newVideoLoad = true;


//var animateLi = false;


//מערך סרטונים עם נתונים מעניינים על הסרטים שאולי נרצה להשתמש בהם בהמשך
var obj_dbArrays = '{"movies":[' +
    '{"myMovieNum": "1","myMovName": "opening start","id": "XIsXgNFGTJQ","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אתעלם","ans2": "אבדוק לשלומו","ans1_NextMov": "2","ans2_NextMov": "4"},' +
    '{"myMovieNum": "2","myMovName": "ignor him","id": "D6-CDlYWzYY","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אעזוב","ans2": "אחפש עזרה","ans1_NextMov": "3","ans2_NextMov": "5"},' +
    '{"myMovieNum": "3","myMovName": "Leave","id": "kp4u4yRfJao","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "null","ans1": "null","ans2": "null","ans1_NextMov": "null","ans2_NextMov": "null"},' +
    '{"myMovieNum": "4","myMovName": "see if he is ok","id": "E7vLCnkTkFg","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אחפש עזרה","ans2": "אתקשר למגן דוד אדום","ans1_NextMov": "5","ans2_NextMov": "6"},' +
    '{"myMovieNum": "5","myMovName": "search for help","id": "y33_JJicV7g","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "null","ans1": "null","ans2": "null","ans1_NextMov": "2","ans2_NextMov": "3"},' +
    '{"myMovieNum": "6","myMovName": "call 911","id": "NSTR1oHg7Rw","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אתחיל החייאה","ans2": "אצא מדעתי","ans1_NextMov": "8","ans2_NextMov": "7"},' +
    '{"myMovieNum": "7","myMovName": "freakout","id": "XPiI86kx5So","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אתחיל החייאה","ans2": "אעזוב","ans1_NextMov": "8","ans2_NextMov": "3"},' +
    '{"myMovieNum": "8","myMovName": "start CPR","id": "3-EOXfM2h2I","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אמשיך החייאה","ans2": "אשתמש בדפיברילטור","ans1_NextMov": "9","ans2_NextMov": "10"},' +
    '{"myMovieNum": "9","myMovName": "continue CPR","id": "OxxUjYZ9adY","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "מה תעשה?","ans1": "אחפש עזרה","ans2": "אשתמש בדפיברילטור","ans1_NextMov": "5","ans2_NextMov": "10"},' +
    '{"myMovieNum": "10","myMovName": "use AED","id": "ThMCY_Dw5Kg","type": "iFrame","quality": "default","volume":"unmute","StartTime": 0,"endTime":5,"height": 580,"width": 1020  ,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "null","ans1": "null","ans2": "null","ans1_NextMov": "null","ans2_NextMov": "null"}]}';
//'{"myMovNumber": "","myMovName": "","id": "","type": "iFrame","quality": "default","volume":"unmute","StartTime": 2,"endTime":5,"height": 390,"width": 640,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "","ans1": "","ans2": ""},' +
//'{"myMovNumber": "","myMovName": "","id": "","type": "iFrame","quality": "default","volume":"unmute","StartTime": 2,"endTime":5,"height": 390,"width": 640,"currentTime":null,"controls": true,"z-index": 0,"movieLink": "https://www.youtube.com/iframe_api?wmode=opaque","questionText": "","ans1": "","ans2": ""}]}';
//'{},' +



$(document).ready(function () {
    //alert("document ready");

    $("#openingDialog").dialog({
      autoOpen: false
    })

    //תרגום והמרת הנתונים לשפת גייסון
    obj = JSON.parse(obj_dbArrays);


    //קריאה לפונקציה לטעינת הנגן והאייפרם
    updateMovLink();

});




function updateMovLink() {
    
    // 2. This code loads the IFrame Player API code asynchronously.
    tag = document.createElement('script');
    tag.src = obj.movies[myMovieNum - 1].movieLink;

    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //after the API code downloads.
    var player;

    //בדיקה
    //document.getElementById("lilach").innerHTML = 'entered updateMovLink fucn';
};



function onYouTubeIframeAPIReady() {
   
    player = new YT.Player('player', {
    height: obj.movies[myMovieNum-1].height,
    width: obj.movies[myMovieNum-1].width,
    videoId: obj.movies[myMovieNum-1].id,
    playerVars: {'controls':0, 'rel':0},    
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            
        }   

    })

    //בדיקה
    //document.getElementById("lilach").innerHTML += '<br/>' + 'entered onYouTubeIframeAPIReady fucn';
    //document.getElementById("lilach").innerHTML += '<br/>' + 'newVideoLoad = ' + newVideoLoad;

    if (newVideoLoad == true) {
        //ניצור חלון קופץ עם הודעת פתיחה וכפתור התחלת הניגון
        openingOrFinishMessage_Func();
        newVideoLoad = false;
    } 
}




// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //בדיקה
    //document.getElementById("lilach").innerHTML += '<br/>' + 'entered onPlayerReady fucn';
    

    //player.seekTo(obj.movies[myMovieNum-1].StartTime);
    //player.end(obj.movies[myMovieNum-1].endTime);
    //player.autoplay(0);
    player.unMute();
    getDurationFunc();
    //player.seekTo(0, false);
    //event.target.playVideo();
}



//פונקציה לחישוב אורך הסרטון שננגן
function getDurationFunc() {
    //בדיקה 
    //document.getElementById("lilach").innerHTML += '<br/>' + 'entered getDurationFunc';
    video_duration = player.getDuration()
    video_duration = (video_duration - 0.0001) * 1000;

    //בדיקה
    //document.getElementById("lilach").innerHTML += '<br/>' + 'updated duration...' + ' video_duration = ' + video_duration;
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;


function onPlayerStateChange(event) {
   // if (event.data == YT.PlayerState.PLAYING) {
   //     //בדיקה
   //     //document.getElementById("lilach").innerHTML += '<br/>' + 'if (event.data == YT.PlayerState.PLAYING)';
   //     //document.getElementById("lilach").innerHTML += '<br/>' + player.getCurrentTime() + 'video_duration = ' + video_duration;
   //    //currentDuration = player.getCurrentTime();
      

    //}
    
    

    if (event.data == YT.PlayerState.PLAYING && !done) {
        //בדיקה
        //document.getElementById("lilach").innerHTML += '<br/>' + 'entered if (event.data == YT.PlayerState.PLAYING && !done)';

        getDurationFunc();
        //setTimeout(pauseVideo, video_duration);
        
       // done = true;
    }

    if (event.data == YT.PlayerState.ENDED) {
        //בדיקה
        //document.getElementById("lilach").innerHTML += '<br/>' + 'entered if (event.data == YT.PlayerState.PLAYING && !done)';

        //getDurationFunc();
        //setTimeout(pauseVideo, video_duration);
        pauseVideo();
        // done = true;
    }
}


//פונקציה לעצירת הסרטון המתנגן
function  pauseVideo() {
    //player.pauseVideo();

    //בדיקה
    //document.getElementById("lilach").innerHTML += '<br/>' + "Paused video";

    //בדיקה האם זה סיום הסתעפות הסרטונים או האם להציג שאלה ולהמשיך בהסתעפות
    if (obj.movies[myMovieNum - 1].ans1 != "null") {
        //בדיקה
        //document.getElementById("lilach").innerHTML += '<br/>' + "continue to create questions...";
        //$("#myQuestionDiv_ID").show();
        
        //$("#myQuestionDiv_ID").fadeIn(3000);

        createQuestion_Func();
    }
    else if (obj.movies[myMovieNum - 1].ans1 == "null") {
        //בדיקה
        //document.getElementById("lilach").innerHTML += '<br/>' + "last movie creating final popup...";
        $("#myQuestionDiv_ID").hide();
        openingOrFinishMessage_Func();
    }
}


//פונקציה של חלון קופץ - גם להתחלה וגם לסיום והתחלה מחדש
function openingOrFinishMessage_Func() {
    //בדיקה
    //document.getElementById("lilach").innerHTML += '<br/>' + 'entered openingOrFinishMessage_Func';
    //document.getElementById("lilach").innerHTML += '<br/>' + 'myArrCounter = ' + myArrCounter + '   and  openOrcloseTextArr[myArrCounter] = ' + openOrcloseTextArr[myArrCounter];

    $("#question_BackgroundDiv").show();

    var myOpeningDivBox = document.createElement('Div');
    myOpeningDivBox.id = "myOpeningDivBox_ID";

    var openingText = document.createElement('p');    
    //openingText.id = "myQuestionText_ID";
    openingText.id = "myOpeningP_ID";
    openingText.style.textAlign = "center";

    var startBtn = document.createElement('button');
    startBtn.id = "mystartBtn_ID";
   

    myOpeningDivBox.appendChild(openingText);
    myOpeningDivBox.appendChild(startBtn);

    var myElement = document.getElementById("question_BackgroundDiv");
    myElement.appendChild(myOpeningDivBox);


    $("#myOpeningDivBox_ID").hide().show("slide", { direction: "right" }, 1000);

    //$("#myOpeningDivBox_ID").effect(slide, 500, callback).fadeIn(1000);

    //function callback() {
    //    setTimeout(function () {
    //        $("#myOpeningDivBox_ID").hide().fadeIn();
    //    }, 1000);
    //};

    //עדכון הטקסט של האלמנטים רק לאחר סיום יצירתם
    document.getElementById("myOpeningP_ID").innerText = (openOrcloseTextArr[myArrCounter]).toString();
    document.getElementById("mystartBtn_ID").innerText = (openOrcloseTextArr[myArrCounter+1]).toString();


 



    //פונקציית הלחיצה על הכפתור
    $(startBtn).click(function () {
        //בדיקה
        //document.getElementById("lilach").innerHTML = "Start Btn Clicked";

        if (document.getElementById("mystartBtn_ID").innerText == "התחל") {
            //עדכון לינק לניגון הסרטון הראשון שברקע נטען
            myArrCounter += 2;
            player.playVideo();
            updateMovLink()
        }


        else if (document.getElementById("mystartBtn_ID").innerText == "התחל שוב") {
            //עדכון לינק לסרטון הראשון מהתחלה
            myMovieNum = 1;
            //myArrCounter = 0;
            newVideoLoad = true;
            player.loadVideoById({ 'videoId': obj.movies[myMovieNum - 1].id, 'startSeconds': obj.movies[myMovieNum - 1].StartTime })
        }


        //הסתרת חלון והאלמנטים שלו

        $("#myOpeningDivBox_ID").hide("slide", { direction: "left" }, 1000, callback);

        function callback() {
            $("#mystartBtn_ID").remove();
            openingText.style.textAlign = "right";
            $("#myOpeningP_ID").remove();
            $("#myOpeningDivBox_ID").remove();
            $("#question_BackgroundDiv").hide();
        };

       

    });
}


//פונקציית יצירת שאלות
function createQuestion_Func() {
    
 

    $("#question_BackgroundDiv").show();
    

    $("#myQuestionDiv_ID").width(340);
    $("#myQuestionDiv_ID").height(580);


    //--deleted from here--//


    //alert("finished to animate LIs class");

    var questionText = document.createElement('p');
    questionText.innerText = "מה תעשה?";
    questionText.id = "myQuestionText_ID";

    var qAnsList = document.createElement('ul');
    qAnsList.id = "myQuestionAnsList_ID";

    var qAnsLi1 = document.createElement('li');
    qAnsLi1.className = "myQuestionAnsLI_class";
    qAnsLi1.id = "myLIRightID";
    qAnsLi1.innerText = obj.movies[myMovieNum - 1].ans1;
   


    $(qAnsLi1).click(function () {
        //בדיקה
        //document.getElementById("lilach").innerHTML = myMovieNum + " 1111";
        myMovieNum = obj.movies[myMovieNum - 1].ans1_NextMov;

        //הסתרת השאלות
        removeQuestionFunc();
        $("#question_BackgroundDiv").hide();

        //עדכון לינק לסרטון הבא
        player.loadVideoById({ 'videoId': obj.movies[myMovieNum - 1].id, 'startSeconds': obj.movies[myMovieNum - 1].StartTime})
        updateMovLink()        
    });

    var qAnsLi2 = document.createElement('li');
    qAnsLi2.className = "myQuestionAnsLI_class";
    qAnsLi2.id = "myLIWrongID";
    qAnsLi2.innerText = obj.movies[myMovieNum-1].ans2;
   

    $(qAnsLi2).click(function () {
        //בדיקה
        //document.getElementById("lilach").innerHTML = myMovieNum + " 2222";
       
        myMovieNum = obj.movies[myMovieNum - 1].ans2_NextMov;

        //הסתרת השאלות
        removeQuestionFunc();
        $("#question_BackgroundDiv").hide();


        //עדכון לינק לסרטון הבא
        player.loadVideoById({ 'videoId': obj.movies[myMovieNum - 1].id, 'startSeconds': obj.movies[myMovieNum - 1].StartTime})
        updateMovLink()
    });


    //חיבור פריטי הרשימה לאלמנט הרשימה הכללי
    qAnsList.appendChild(qAnsLi1);
    qAnsList.appendChild(qAnsLi2);
    //alert("finished appending LI questions to list");

    //qAnsLi1.hide();
    //qAnsLi2.hide();
    

    //חיבור של כלל האלמנטים לדיב
    var myElement = document.getElementById("myQuestionDiv_ID");
    myElement.appendChild(questionText);
    myElement.appendChild(qAnsList);

    //alert("finished appending all childs");

   // $("#myLIWrongID").css("visibility", "hidden");
    //$("#myLIRightID").css("visibility", "hidden");
    $(".myQuestionAnsLI_class").css("display", "none");
    //alert("LI questions are now hidden");



    // alert("going to fade in the questiondiv");
    $("#myQuestionDiv_ID").fadeIn("slow", function () {
        //   animateLi = true;
        //   alert("animateLi is now true, finished fade in of question div");
        //$(".myQuestionAnsLI_class").fadeIn(2000);
        $("#myLIRightID").fadeIn("slow", function () {
            $("#myLIWrongID").fadeIn(1000)
        })

        // animation_func()
        //   alert("finished calling animation func");
    });


   // $(".myQuestionAnsLI_class").animate({ marginLeft: "-=300px" });
}







//פונקציית הסרת האלמנטים של השאלות
function removeQuestionFunc() {

    $("#myQuestionText_ID").remove();
   
    $("#myQuestionAnsList_ID").remove();
    $(".myQuestionAnsLI_class").remove();
};





//חלון אודות
function openingDialog_func() {

   // alert("openingDialog_Func func");

    $("#openingDialog").dialog("open");
        
   // alert("opened already the Dialog_Func func");
}
