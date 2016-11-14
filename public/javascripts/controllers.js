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
        moodService.getImage(images[1]).then(function(results){
          $scope.vm.mood = Object.keys(results[0].scores).reduce(function(a, b){ return results[0].scores[a] > results[0].scores[b] ? a : b });
        })
        $scope.vm.img = data.data[0];
      })
     })
}])



// require([
//   "esri/Map",
//   "esri/views/MapView",
//   "dojo/domReady!"
// ], function(Map, MapView) {
//   var map = new Map({
//     basemap: "streets"
//   });
//
//   var view = new MapView({
//     container: "viewDiv",  // Reference to the DOM node that will contain the view
//     map: map               // References the map object created in step 3
//   });
// });
