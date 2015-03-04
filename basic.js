// prefix defined in common.js
//
// photo size defined in main.css
imgw = 350;
// use this to figure out how wide 
// each color on the palette needs to be

// Add 7-color palette divs to the front page.
// http://jsfiddle.net/9nk3cyuy/
//
// to keep it simple, we always generate a 7-color palette,
// and we always put it on the front page and on the colormap page.

$(function(){

    /*
    $("img.displayphoto").after("<div id='inner'></div>");
            
    $("div#inner").css('overflow','hidden')
                  .css('width',2000);
    
    */
    var N = colors5.length;
    var dim = imgw/N;
    /*
    for (var c=0; c < N; c++) {
        $("div#inner").append("<div class='colorp' id='colorp"+c+"'>&nbsp;</div>");
        $("#colorp"+c).css('background-color',colors5[c])
                      .css('float','left')
                      .css('width', dim)
                      .css('height',dim);
    }        
    */
            

    ///////////////////////////////////
    // Color scale


    $("div.displayphoto").css("width",350);
    $("img.displayphoto").css("width","100%");

    //$("div#map").before("<div id='d3scale'>&nbsp;</div>");
    $("img.displayphoto").after("<br />")
                         .after("<div id='d3scale'>&nbsp;</div>");

    var d3ColorScale = d3.scale.quantize()
            .domain([0,1])
            .range(colors5);

    var svg = d3.select("div#d3scale").append("svg")
            .attr("width",imgw)
            .attr("height",dim);

    var dom0 = d3ColorScale.domain()[0];
    var dom1 = d3ColorScale.domain()[1];
    var step = (dom1 - dom0)/d3ColorScale.range().length;
    var d3ColorScaleDomain = d3.range(dom0,dom1+step,step);

    // A position encoding for the key only.
    var xkey = d3.scale.linear()
            .domain([0,1])
            .range([0,240]);
    
    var xAxis = d3.svg.axis()
        .scale(xkey)
        .orient("bottom")
        .tickSize(15)
        .tickValues(d3ColorScaleDomain);

    var lincolor_xpos = 10,
        lincolor_ypos = 30;

    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate("+lincolor_xpos+","+lincolor_ypos+")");

    g.selectAll("rect")
        .data(d3ColorScale.range().map(function(d, i) {
            return {
                  x0: i ? xkey(d3ColorScaleDomain[i]) : xkey.range()[0],
                  x1: i < d3ColorScaleDomain.length ? xkey(d3ColorScaleDomain[i+1]) : xkey.range()[1],
                  z: d
            };
    
        }))
        .enter().append("rect")
        .attr("height", 20)
        .attr("x", function(d) { return d.x0; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .style("fill", function(d) { return d.z; });
    
    var lincolor_text_ypos = -4;
    //g.call(xAxis);
    g.append("text").text("Arbitrary Quantity")
        .attr("class", "caption")
        .attr("y", lincolor_text_ypos);
    /*
    var lincolor_text_ypos = -6;
    g.call(xAxis).append("text")
        .attr("class", "caption")
        .attr("y", lincolor_text_ypos);
        */
      /*
        .text("Mean Education Level");
        */

});




// create the map, assign to the map div, and set it's lat, long, and zoom level (12)
var m = L.map('map').setView([37.78, -122.45], 12);

// Add MapBox Tiles
// https://www.mapbox.com/developers/api/maps/
L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(m);

function getColor(d) {
    return colors5[Math.round(d*colors5.length)];
}

// f = feature, l = layer
function enhanceLayer(f,l){

    // add popup
    var out = [];
    if (f.properties){
        l.bindPopup(f.properties['name']);

        // http://leafletjs.com/reference.html#path-options
        l.setStyle({    
            fillColor: getColor(Math.random()),
            fillOpacity: 0.65,
            stroke: false
        });
        //console.log(f.properties['derived_quantity']/10.0);
    }
}


var geoj = new L.geoJson.ajax(prefix+"sfcensus.geo.json",{onEachFeature:enhanceLayer}).addTo(m);
