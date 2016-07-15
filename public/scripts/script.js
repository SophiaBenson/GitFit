console.log("script is hur");
//store the event calendar object
// var dp = $scope.week;
$(document).ready(function(){
    $(".btn-primary").click(function(){
        $(".collapse").collapse('toggle');
    });

});
var app = angular.module('main', ['daypilot']);
app.controller('CalendarCtrl', function($scope, $http) {
//set up events

  $scope.events = [
        // {
        //       // start: new DayPilot.Date("2016-07-08T10:00:00"),
        //       "start": new DayPilot.Date("2016-07-11T08:00:00"),
        //       // "start":"2016-07-11T08:00:00",
        //       // end: new DayPilot.Date("2016-07-08T14:00:00"),
        //       "end": new DayPilot.Date("2016-07-11T12:00:00"),
        //       // "end": "2016-07-11T15:00:00"
        //       "id": DayPilot.guid(),
        //       "text": "Work"
        // },
        // {
        //
        //       "start": new DayPilot.Date("2016-07-11T13:00:00"),
        //       "end": new DayPilot.Date("2016-07-11T17:00:00"),
        //       "id": DayPilot.guid(),
        //       "text": "Work"
        // }
      ];


      $scope.config = {
          viewType: "Week",

      };
      this.previous = function () {
        DayPilot.startDate = DayPilot.startDate.addDays(-7); DayPilot.update();
DayPilot.init();
      };
      // var dp = new DayPilot.Calendar("dp");
      // dp.viewType = "Week";
      // this.previous = function (){
      //   dp.startDate = dp.startDate.addDays(-7); dp.update();
      // };
      // this.next = function() {
      // dp.startDate = dp.startDate.addDays(7); dp.update();
      // };
      // // ...
      // dp.init();

      this.add = function() {
        console.log(this.start, this.end);
event.preventDefault();
          $scope.events.push(
                  {
                      // start: new DayPilot.Date("2016-07-11T10:00:00"),
                      "start": new DayPilot.Date(this.start + "T" + this.timeStartHour + ":" + this.timeStartMin + ":00"),
                      // "start": "2016-07-14T12:00:00",
                      // end: new DayPilot.Date("2016-07-11T12:00:00"),
                      "end": new DayPilot.Date(this.end + "T" + this.timeEndHour + ":" + this.timeEndMin + ":00"),
                      // end: new DayPilot.Date.today("T14:00:00"),//find way to include time in today
                      // "end": "2016-07-14T14:00:00"
                      "id": DayPilot.guid(),
                      "text": this.selectData + "<br> Notes: " + this.notes + "<br>" + this.selectData2 + "<br> Notes: " + this.notes2 + "<br>" + this.selectData3 + "<br> Notes: " + this.notes3
                  }
          );
          this.start="";
          this.timeStartHour="";
          this.timeStartMin="";
          this.end="";
          this.timeEndHour="";
          this.timeEndMin="";

          console.log("add function fired off" , events);
          var events = $scope.events;
          console.log(events);
                $http({
                  method: 'POST',
                  url:'/testPost',
                  data: events
                });

          };//end addEvents


      this.showTabDialog = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
              .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
              }, function() {
                $scope.status = 'You cancelled the dialog.';
              });
        };
      this.move = function() {
          var event = $scope.events[0];
          event.start = event.start.addDays(1);
          event.end = event.end.addDays(1);
      };




      // this.rename = function() {
      //     $scope.events[0].text = "New name";
      // };

      // this.message = function() {
      //     $scope.dp.message("Hi");
      // };



// this.add = function () {
//   var EventToSend={
//     start: new DayPilot.Date(this.start + "T" + this.timeStartHour + ":" + this.timeStartMin + ":00"),
//
//     end: new DayPilot.Date(this.end + "T" + this.timeEndHour + ":" + this.timeEndMin + ":00"),
//
//     id: DayPilot.guid(),
//     text: this.selectData + "<br> Notes: " + this.notes + "<br>" + this.selectData2 + "<br> Notes: " + this.notes2 + "<br>" + this.selectData3 + "<br> Notes: " + this.notes3
// };
// console.log("add function fired off" , events);
// var events = $scope.events;
// console.log(events);
//       $http({
//         method: 'POST',
//         url:'/testPost',
//         data: events
//       });
//
// };//end addEvents
$scope.getEvents = function () {


$http({
    method:'GET',
    url:'/getEvents'
  }).then(function(response){
    $scope.events = response.data;
    console.log($scope.events);
 });
};//end getAnimals

});//end DemoCtrl controller
// var app = angular.module('Modal', []);

app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        this.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.modalShown2 = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
  $scope.toggleModal2 = function() {
    $scope.modalShown2 = !$scope.modalShown2;
  };
}]);

// var app = angular.module('main', ['ngMaterial']).controller('AppCtrl',['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia) {
//   $scope.status = '  ';
//     $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
//   $scope.showTabDialog = function(ev) {
//       $mdDialog.show({
//         controller: DialogController,
//         templateUrl: 'tabDialog.tmpl.html',
//         parent: angular.element(document.body),
//         targetEvent: ev,
//         clickOutsideToClose:true
//       })
//           .then(function(answer) {
//             $scope.status = 'You said the information was "' + answer + '".';
//           }, function() {
//             $scope.status = 'You cancelled the dialog.';
//           });
//     };
//
// }]);//end of AppCtrl controller

//load events function to request ajax on server side
      // function loadEvents() {
  // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
//   $timeout(function() {
//       var params = {
//           start: $scope.week.visibleStart().toString(),
//           end: $scope.week.visibleEnd().toString()
//       }
//       $http.post("backend_events.php", params).success(function(data) {
//           $scope.events = data;
//       });
//   });
// }
