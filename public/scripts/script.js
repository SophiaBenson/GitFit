console.log("script is hur");
//store the event calendar object
// var dp = $scope.week;

var app = angular.module('main', ['daypilot']);
app.controller('CalendarCtrl', function($scope) {
//set up events
      $scope.events = [
        {
              // start: new DayPilot.Date("2016-07-08T10:00:00"),
              start: new DayPilot.Date.today("T14:00:00"),
              // end: new DayPilot.Date("2016-07-08T14:00:00"),
              end: new DayPilot.Date.today("T16:00:00"),
              id: DayPilot.guid(),
              text: "First Event"
        }
      ];
var startInput = $scope.start;
var endInput = $scope.start;

// var startDate = startInput.toString();
// var endDate = endInput.toString();
      $scope.config = {
          viewType: "Week",
//startDate: "today" ///figure out how to make that the same day
      };
      this.add = function() {
        console.log(this.start, this.end);
          $scope.events.push(
                  {
                      // start: new DayPilot.Date("2016-07-11T10:00:00"),
                      start: new DayPilot.Date(this.start + "T10:00:00"),
                      // start: new DayPilot.Date.today("T12:00:00"),
                      // end: new DayPilot.Date("2016-07-11T12:00:00"),
                      end: new DayPilot.Date(this.end + "T12:00:00"),
                      // end: new DayPilot.Date.today("T14:00:00"),//find way to include time in today
                      id: DayPilot.guid(),
                      text: this.selectData
                  }
          );
      };
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

      this.rename = function() {
          $scope.events[0].text = "New name";
      };

      this.message = function() {
          $scope.dp.message("Hi");
      };

      // var modal = new DayPilot.Modal();
      // modal.showHtml("<h1>Hello</h1>");
      // editEvent();

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
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
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
