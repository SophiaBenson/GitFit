console.log("script is hur");
//store the event calendar object
// var dp = $scope.week;

var app = angular.module('main', ['ngMaterial','daypilot']).controller('CalendarCtrl', function($scope, $mdDialog, $mdMedia) {
//set up events
      $scope.events = [
        {
              start: new DayPilot.Date("2016-07-08T10:00:00"),
              end: new DayPilot.Date("2016-07-08T14:00:00"),
              id: DayPilot.guid(),
              text: "First Event"
        }
      ];

      $scope.config = {
          viewType: "Week",
//startDate: "today" ///figure out how to make that the same day
      };
      $scope.add = function() {
          $scope.events.push(
                  {
                      start: new DayPilot.Date("2016-07-08T10:00:00"),
                      end: new DayPilot.Date("2016-07-08T12:00:00"),
                      id: DayPilot.guid(),
                      text: "Simple Event"
                  }
          );
      };
      $scope.showTabDialog = function(ev) {
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
      $scope.move = function() {
          var event = $scope.events[0];
          event.start = event.start.addDays(1);
          event.end = event.end.addDays(1);
      };

      $scope.rename = function() {
          $scope.events[0].text = "New name";
      };

      $scope.message = function() {
          $scope.dp.message("Hi");
      };


});//end DemoCtrl controller

// var app = angular.module('main', ['ngMaterial', 'daypilot']).controller('AppCtrl',['$scope', '$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia) {
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
