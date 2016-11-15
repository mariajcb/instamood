app.controller('LoginController', ['$location', '$window', '$scope', 'loginService', function($location, $window, $scope, loginService){
  $scope.vm = {};
  if($location.url().substr(14) !== ''){
    $scope.token = $location.url().substr(14);
    $window.localStorage['accessToken'] = $scope.token;
    $location.path('/mood');
  }
  $scope.login = function(){
    loginService.getCode();
  }
}])
app.controller('MoodController', ['$location', '$window', '$scope', 'imgService', 'moodService', function($location, $window, $scope, imgService, moodService){
  $scope.vm = {};
  imgService.getImage($window.localStorage['accessToken']).getInstaData().$promise.then(function(data) {
      $scope.vm.username = data.data.username;
      $scope.vm.src = data.data.profile_picture;
      //put people in database HERE
      var userID = data.data.id;
      imgService.getMedia($window.localStorage['accessToken'],userID).getInstaData().$promise.then(function(data){
        var images = data.data;
        var returnArr = [];
        for(var i = 0; i < images.length; i++){
          var image = images[i];
          moodService.getImage(image).then(function(data){
            if(data){
              returnArr = data;
              $scope.vm.mood = Object.keys(returnArr[0].scores).reduce(function(a, b){ return returnArr[0].scores[a] > returnArr[0].scores[b] ? a : b });
              $scope.vm.img = returnArr[1];
            }
          })
          if(returnArr.length!==0){
            break;
          }
        }
      })
     })
}])
