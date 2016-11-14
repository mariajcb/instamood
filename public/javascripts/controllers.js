app.controller('MoodController', ['$scope', 'imgService', function($scope, imgService) {
 $scope.vm = {};
 imgService.getImage().getInstaData().$promise.then(function(data) {
  $scope.vm.src = data.data.profile_picture;
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
