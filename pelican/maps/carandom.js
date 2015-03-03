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
    // d should be between 0 and 1
    // 
    // 6 scale blues
    var blue = ['rgb(239,243,255)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)'];
    return blue[Math.round(d*6)];
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
            fillOpacity: 0.75,
            stroke: false
        });
        console.log(f.properties['derived_quantity']/10.0);
    }
}


var geoj = new L.geoJson.ajax(prefix+"carandom.geojson",{onEachFeature:enhanceLayer}).addTo(m);

