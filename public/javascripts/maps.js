require([
  "esri/Map",
  "esri/graphic",
  "esri/views/MapView",
  "dojo/domReady!"
], function(Map, MapView) {
  var map = new Map({
    basemap: "dark-gray"
  });

  var view = new MapView({
    container: "viewDiv",  // Reference to the DOM node that will contain the view
    map: map               // References the map object created in step 3
  });
});

// dojo.connect(dojo.byId('pointButton'), function() {
  map.graphics.add(new esri.Graphic(
    // Point coordinates are 0, 0
    new esri.geometry.Point(40, -105, map.spatialReference),
    new esri.symbol.SimpleMarkerSymbol()
  ));
// });
