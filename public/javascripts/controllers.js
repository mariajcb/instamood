app.controller(`AuthController`, [`$scope`, `AuthService`, `$location`, `$cookies`, function($scope, AuthService, $location, $cookies) {

    $scope.submitLogIn = function(returningUser) {
      AuthService.login.save(returningUser, function(returnedObject) {
          $cookies.putObject(`loggedIn`, returnedObject)
          $location.url(`/`)
      })
    }

}])
