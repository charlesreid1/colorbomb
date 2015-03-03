// prefix defined in common.js

// create the map, assign to the map div, and set it's lat, long, and zoom level (12)
var m = L.map('map').setView([38, -118], 6);

// Add MapBox Tiles
// https://www.mapbox.com/developers/api/maps/
L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(m);



function getColor(d) {

/////////////////////////////
//// this is what we're here to do

    var colors = ['#511f1b','#447489','#f72e40','#a02a20','#8d555c','#c41506','#fcab27','#fcd2c2','#f80e05'];
    return colors[Math.round(d*colors.length)];

/////////////////////////////


}



// f = feature, l = layer
function enhanceLayer(f,l){

    // add popup
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));

        // http://leafletjs.com/reference.html#path-options
        l.setStyle({    
            fillColor: getColor(f.properties['derived_quantity']/10.0),
            fillOpacity: 0.65,
            stroke: false
        });
        //console.log(f.properties['derived_quantity']/10.0);
    }
}


var geoj = new L.geoJson.ajax(prefix+"ca.geo.json",{onEachFeature:enhanceLayer}).addTo(m);
