
// create the map, assign to the mao div, and set it's lat, long, and zoom level (12)
// NYC
var map = L.map('map').setView([40.754306, -73.985861], 12);

// big thanks to
// http://gis.stackexchange.com/questions/64406/getting-wfs-data-from-geoserver-into-leaflet
// for making this script a lot better


// MapBox API key:
// access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA

// MapBox API URLs:
//http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA 


// Add MapBox Tiles
// list of styles:
// https://www.mapbox.com/developers/api/maps/
//L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{
L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);


//geojson url. obtained from logging into geoserver, selecting "Layer Preview" under the Data heading on the left, selecting geojson from the "Select one" drop down under "All formats" on the far right for the tiger roads
//var url = "http://104.236.163.66:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger:tiger_roads&&outputFormat=application/json";
//var url = "http://104.236.163.66:8080/geoserver/nyc_roads/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nyc_roads:nyc_roads&maxFeatures=50&outputFormat=application/json";



// according to
// http://docs.geoserver.org/latest/en/user/services/virtual-services.html
// adding a map name to /geoserver restricts it
// to a virtual service. not putting anything makes it 
// a global servivce (which has to be enabled in geoserver settings).



// but the coordinates don't match.
// coordinates are 
// 984292
// 210126

var owsrootUrl = 'http://104.236.163.66:8080/geoserver/ows';

var defaultParameters = {
    service : 'WFS',
    version : '1.0',
    request : 'GetFeature',
    typeName : 'nyc_roads',
    maxFeatures : '100',
    outputFormat : 'text/javascript',
    format_options : 'callback:getJson',
    SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

//ajax to get map features
$.ajax({
    type: "POST",
    url: URL,
    dataType: 'jsonp',
    jsonpCallback : 'getJson',

    //upon success extraction of data
    success: function (data) {

        // the data.geometry field contains coordinate/location data.
        //
        // now use this page on Leaflet+GeoJSON:
        // http://leafletjs.com/examples/geojson.html

    	//create a new geojson layer
    	var geojson = new L.geoJson(data, {

    		    // apply a style 
                style: {"color":"#ff7800","weight":2},
                //
    		    // and bind a popup showing the street name for each feature extracted.
    		    onEachFeature: function(feature, layer){
    		    	layer.bindPopup("street: " + feature.properties.name);
                    //console.log(feature.properties);
    		    }
    	}).addTo(map);

        var marker = L.marker([40.7543, -73.9858]).addTo(map);
    }
});

