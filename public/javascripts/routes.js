app.config(function($routeProvider, $locationProvider){
  $routeProvider
  // .when('/posts', {
  //   templateUrl: '../partials/posts.html',
  //   controller: 'main'
  // })
  // .when('/', {
  //   templateUrl: '../partials/login.html',
  //   controller: 'auth'
  // })
  $locationProvider.html5Mode(true);
})
