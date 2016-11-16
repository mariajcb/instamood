app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '../partials/login.html',
    controller: 'LoginController'
  })
  .when('/mood', {
    templateUrl: '../partials/mood.html',
    controller: 'MoodController'
  })
  .when('/map', {
    templateUrl: '../partials/map.html',
    controller: 'UsersController'
  })
  .when('/personality', {
    templateUrl: '../partials/person.html',
    controller: 'PersonController'
  })
  .when('/:id', {
    templateUrl: '../partials/login.html',
    controller: 'LoginController'
  })
  $locationProvider.html5Mode(true);
})
