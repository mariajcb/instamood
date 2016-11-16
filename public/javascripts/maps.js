app.controller('UsersController', ['$location', '$window', '$scope', 'usersService', function($location, $window, $scope, usersService) {
    $scope.vm = {};
    //get users vfrom database
    usersService.getUsers().then(function(response) {
        $scope.vm.users = response;
        var mapArr = [];
        for (var i = 0; i < response.length; i++) {
            var obj = {
                lat: response[i].Long,
                long: response[i].Lat
            };
            mapArr.push(obj);
        }
        require([
            "esri/Color",
            "esri/geometry/Point",
            "esri/geometry/webMercatorUtils",
            "esri/graphic",
            "esri/layers/FeatureLayer",
            "esri/map",
            "esri/renderers/SimpleRenderer",
            "esri/renderers/TemporalRenderer",
            "esri/renderers/TimeClassBreaksAger",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/TimeExtent",
            "dojo/domReady!"
        ], function(Color, Point, webMercatorUtils, Graphic, FeatureLayer, Map, SimpleRenderer, TemporalRenderer,
            TimeClassBreaksAger, SimpleLineSymbol, SimpleMarkerSymbol, TimeExtent) {


            var map, featureLayer;
            var OBJECTID_COUNTER = 1000;
            var TRACKID_COUNTER = 1;
            //onorientationchange doesn't always fire in a timely manner in Android so check for both orientationchange and resize
            var supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

            window.addEventListener(orientationEvent, function() {
                orientationChanged();
            }, false);




            map = new Map("map", {
                basemap: "dark-gray"
            });
            map.on("load", mapLoadedHandler);

            function mapLoadedHandler(maploadEvent) {
                console.log("map loaded", maploadEvent);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
                    watchId = navigator.geolocation.watchPosition(showLocation, locationError);
                } else {
                    alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
                }
                //create a layer definition for the gps points
                var layerDefinition = {
                    "objectIdField": "OBJECTID",
                    "trackIdField": "TrackID",
                    "geometryType": "esriGeometryPoint",
                    "timeInfo": {
                        "startTimeField": "DATETIME",
                        "endTimeField": null,
                        "timeExtent": [1277412330365],
                        "timeInterval": 1,
                        "timeIntervalUnits": "esriTimeUnitsMinutes"
                    },
                    "fields": [{
                        "name": "OBJECTID",
                        "type": "esriFieldTypeOID",
                        "alias": "OBJECTID",
                        "sqlType": "sqlTypeOther"
                    }, {
                        "name": "TrackID",
                        "type": "esriFieldTypeInteger",
                        "alias": "TrackID"
                    }, {
                        "name": "DATETIME",
                        "type": "esriFieldTypeDate",
                        "alias": "DATETIME"
                    }]
                };
                var dbCoords = mapArr;
                // console.log(dbCoords);
                // var dbCoords = [
                //   {lat:-105.291135,long:40.010687},{lat:-105.290878,long:40.012183},{lat:-105.278003,long:40.019463},{lat:-105.289375,long:40.019462}
                // ]
                dbCoords.forEach(coord => {
                    var coords = new Point(coord.lat, coord.long)
                    var symbol = new SimpleMarkerSymbol().setColor(new Color('blue'));
                    var graphic = new Graphic(coords, symbol)
                    map.graphics.add(graphic)
                })

                map.on("load", function() {
                    map.infoWindow.resize(250, 100);
                });

                map.on("click", addPoint);

                function addPoint(evt) {
                    var latitude = evt.mapPoint.getLatitude();
                    var longitude = evt.mapPoint.getLongitude();
                    map.infoWindow.setTitle("Coordinates");
                    map.infoWindow.setContent(
                        "lat/lon : " + latitude.toFixed(2) + ", " + longitude.toFixed(2) +
                        "<br>Username: " + "<br>Mood: "
                    );
                    map.infoWindow.show(evt.mapPoint, map.getInfoWindowAnchor(evt.screenPoint));
                }

                var featureCollection = {
                    layerDefinition: layerDefinition,
                    featureSet: null
                };
                featureLayer = new FeatureLayer(featureCollection);

                //setup a temporal renderer
                var sms = new SimpleMarkerSymbol().setColor(new Color([255, 0, 0])).setSize(8);
                var observationRenderer = new SimpleRenderer(sms);
                var latestObservationRenderer = new SimpleRenderer(new SimpleMarkerSymbol());
                var infos = [{
                    minAge: 0,
                    maxAge: 1,
                    color: new Color([255, 0, 0])
                }, {
                    minAge: 1,
                    maxAge: 5,
                    color: new Color([255, 153, 0])
                }, {
                    minAge: 5,
                    maxAge: 10,
                    color: new Color([255, 204, 0])
                }, {
                    minAge: 10,
                    maxAge: Infinity,
                    color: new Color([0, 0, 0, 0])
                }];
                var ager = new TimeClassBreaksAger(infos, TimeClassBreaksAger.UNIT_MINUTES);
                var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 3);
                var trackRenderer = new SimpleRenderer(sls);
                var renderer = new TemporalRenderer(observationRenderer, latestObservationRenderer,
                    trackRenderer, ager);
                featureLayer.setRenderer(renderer);
                map.addLayer(featureLayer);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
                    navigator.geolocation.watchPosition(showLocation, locationError);
                }
            }

            function locationError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Location not provided");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        alert("Current location not available");
                        break;

                    case error.TIMEOUT:
                        alert("Timeout");
                        break;

                    default:
                        alert("unknown error");
                        break;
                }
            }

            function zoomToLocation(location) {
                // var pt = webMercatorUtils.geographicToWebMercator(new Point(location.coords.longitude,
                //  location.coords.latitude));
                // map.centerAndZoom(pt, 16);
                var pt = new Point(location.coords.longitude, location.coords.latitude);
                addGraphic(pt);
                map.centerAndZoom(pt, 16);
            }

            function addGraphic(pt) {
                var symbol = new SimpleMarkerSymbol(
                    SimpleMarkerSymbol.STYLE_CIRCLE,
                    12,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([210, 105, 30, 0.5]),
                        8
                    ),
                    new Color([210, 105, 30, 0.9])
                );
                graphic = new Graphic(pt, symbol);
                map.graphics.add(graphic);
            }

            function showLocation(location) {
                var pt = new Point(location.coords.longitude, location.coords.latitude);
                if (!graphic) {
                    addGraphic(pt);
                } else { // move the graphic if it already exists
                    graphic.setGeometry(pt);
                }
                map.centerAt(pt);
                // if (location.coords.accuracy <= 500) {
                //  var now = new Date();
                //  var attributes = {};
                //  attributes.OBJECTID = OBJECTID_COUNTER;
                //  attributes.DATETIME = now.getTime();
                //  attributes.TrackID = TRACKID_COUNTER;
                //
                //  OBJECTID_COUNTER++;
                //  TRACKID_COUNTER++;
                //
                //  var pt = webMercatorUtils.geographicToWebMercator(new Point(location.coords.longitude,
                //   location.coords.latitude));
                //  var graphic = new Graphic(new Point(pt, map.spatialReference), null, attributes);
                //
                //  featureLayer.applyEdits([graphic], null, null, function(adds) {
                //   map.setTimeExtent(new TimeExtent(null, new Date()));
                //   map.centerAt(graphic.geometry);
                //  });
                // } else {
                //  console.warn("Point not added due to low accuracy: " + location.coords.accuracy);
                // }
            }

            function orientationChanged() {
                if (map) {
                    map.reposition();
                    map.resize();
                }
            }

        });
    })
}])
