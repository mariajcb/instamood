app.controller('LoginController', ['$location', '$window', '$scope', 'loginService', function($location, $window, $scope, loginService){
  $scope.vm = {};
  if($location.url().substr(14) !== ''){
    $scope.token = $location.url().substr(14);
    $window.localStorage['accessToken'] = $scope.token;
    $location.path('/mood');
  }
  $scope.login = function(){
    console.log(loginService.getCode());
  }
}])
app.controller('MoodController', ['$location', '$window', '$scope', 'imgService', function($location, $window, $scope, imgService){
  $scope.vm = {};
  imgService.getImage($window.localStorage['accessToken']).getInstaData().$promise.then(function(data) {
      $scope.vm.src = data.data.profile_picture;
      //put people in database HERE
      var userID = data.data.id;
      imgService.getMedia($window.localStorage['accessToken'],userID).getInstaData().$promise.then(function(data){
        $scope.vm.imgs = data.data;
      })
     })
}])



require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(Map, MapView) {
  var map = new Map({
    basemap: "streets"
  });

  var view = new MapView({
    container: "viewDiv",  // Reference to the DOM node that will contain the view
    map: map               // References the map object created in step 3
  });
});
