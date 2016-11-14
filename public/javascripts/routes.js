app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/mood', {
    templateUrl: '../partials/mood.html',
    controller: 'MoodController'
  })
  .when('/map', {
    templateUrl: '../partials/map.html',
    controller: 'MoodController'
  })
  // .when('/', {
  //   templateUrl: '../partials/login.html',
  //   controller: 'auth'
  // })
  $locationProvider.html5Mode(true);
})
