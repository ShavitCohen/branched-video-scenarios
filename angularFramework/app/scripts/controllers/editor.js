angular.module('angularFrameworkApp')
  .controller('editorCtrl', function ($scope, dataService,$modal) {
      $scope.dataService = dataService; //הזרקת המידע של הדטה סלתוך הסקופ שיעבוד עם HTML


      $scope.addHoverYellow = function (event)
      {

          // $(myElementHover).addClass("sceneHover");
          // angular(this).addClass("sceneHover");
          $('.myscene').hover(function ()
          {
              console.log("checking if distractor is clicked: " + dataService.is_DistractorClicked2Link);
              if ($scope.dataService.is_DistractorClicked2Link == false)
              { $(this).addClass('sceneHover') }
              $('.arrow').addClass('backgroundArrowsGrey');
              $(this).$('.arrow').removeClass('backgroundArrowsGrey');
              //angular.forEach($('.myscene'), function(){
              //    if($('.myscene') != $(event.target)){
              //        $('.myscene').addClass('backgroundArrowsGrey');
              //    }
              //})

          });
          
          //angular.forEach($('.myscene'), function(){
          //    if($('.myscene') != $(event.target)){
          //        $('.myscene').addClass('backgroundArrowsGrey');
          //    }
          //})
       
      }

      //angular.element('.myscene').hover(function(){ angular.element('.myscene').addClass("sceneHover")},console.log("hover over..."));
      //angular.element(element).hover(function () 
     // { angular.element(element).addClass("myClass") }, function () 
      //{ angular.element(element).removeClass("myClass") });

      $scope.removeHoverYellow = function ()
      {
         // $('.arrow').removeClass('backgroundArrowsGrey');
         // $('.arrow').addClass('regularOpacityArrows');
         // $(this).removeClass('backgroundArrowsGrey');
      //   // $(myElementHover).removeClass("sceneHover");
      //   // angular(this).removeClass("sceneHover");
         
      //    $(this).removeClass('sceneHover') ;
      //    console.log("hover over2222...");
      //    console.log("NOT NOoo hover over...");
      }

    $scope.dataService.setDistractorsIndex();

      $scope.openAddMovieDialog = function (scenario) {

          var modalInstance = $modal.open({
              windowClass: 'editModalClass',
              //template:,
              templateUrl: 'views/AddMovie.html',
              controller: "scenarioAddMovieCtrl",
              resolve: {
                  scenario: function () {
                      return $scope.scenario;
                  }
                ,
                  state: function () {
                      return "new";
                  }

              }

          });
      }
      
      //קריאה לפונקציה שיוצרת את הקווים המחברים בין מסיחים
      dataService.linkInitDistrctors();
  }



  );

