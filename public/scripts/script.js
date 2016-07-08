console.log("script is hur");
//store the event calendar object
// var dp = $scope.week;

var app = angular.module('main', ['daypilot']).controller('DemoCtrl', function($scope, $timeout, $http) {
//set up events
      $scope.events = [];

      $scope.weekConfig = {
          viewType: "Week",

      };
//load events function to request ajax on server side
      function loadEvents() {
  // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
  $timeout(function() {
      var params = {
          start: $scope.week.visibleStart().toString(),
          end: $scope.week.visibleEnd().toString()
      }
      $http.post("backend_events.php", params).success(function(data) {
          $scope.events = data;
      });
  });
}
  });//end DemoCtrl controller
