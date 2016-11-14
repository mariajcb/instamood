var app = angular.module('instamood', ['ngRoute', 'ngResource', 'ngCookies']);

app.config([`$resourceProvider`, function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when(`/`, {
            templateUrl: `./partials/login.html`,
            controller: `AuthController`
        })
      })
