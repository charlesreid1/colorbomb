// prefix defined in common.js

function getColor5(d) {
    return colors5[Math.round(d*colors5.length)];
}
function getColor7(d) {
    return colors7[Math.round(d*colors7.length)];
}
function getColor9(d) {
    return colors9[Math.round(d*colors9.length)];
}

// all this copying-and-pasting and hard-coding of particular values
// is a bit obscene, but I'm better with a text editor than I am with javascript.
//
function enhanceLayer5(f,l){
    var out = [];
    if (f.properties){
        l.bindPopup(f.properties['name']);
        // http://leafletjs.com/reference.html#path-options
        l.setStyle({    
            fillColor: getColor5(Math.random()),
            fillOpacity: 0.65,
            stroke: false
        });
    }
}
function enhanceLayer7(f,l){
    var out = [];
    if (f.properties){
        l.bindPopup(f.properties['name']);
        // http://leafletjs.com/reference.html#path-options
        l.setStyle({    
            fillColor: getColor7(Math.random()),
            fillOpacity: 0.65,
            stroke: false
        });
    }
}
function enhanceLayer9(f,l){
    var out = [];
    if (f.properties){
        l.bindPopup(f.properties['name']);
        // http://leafletjs.com/reference.html#path-options
        l.setStyle({    
            fillColor: getColor9(Math.random()),
            fillOpacity: 0.65,
            stroke: false
        });
    }
}


// photo size defined in main.css
imgw = 350;

// Define shorthand utility method for adding new tags
// http://stackoverflow.com/questions/11173589/best-way-to-create-nested-html-elements-with-jquery
$.extend({
    el: function(el, props) {
        var $el = $(document.createElement(el));
        $el.attr(props);
        return $el;
    }
});

$(function(){

    ////////////////////////////////////////
    // Loop over the 5, 7, 9 scales
    // and create a section with a map for each
    
    var scales = [colors5,colors7,colors9];

    // For each color scale, add a map
    var N = scales.length;
    for (var c=0; c < N; c++) {
    
        var cp1 = c+1;
        var colorscale = scales[c];
        var Nscale = colorscale.length;
    
        // Start with map header
        $("div.mapcontainer").append(
            $.el('h2',{'class':'mapcontainerheader','id':cp1}).text(Nscale+"-Scale Colormap")
        );

        colormap_string = "var color"+Nscale+" = [";
        for (var m=0; m < Nscale; m++) {
            if(m>0) {
                colormap_string = colormap_string + ",";
            }
            colormap_string += "'"+colorscale[m]+"'";
        }
        colormap_string += "];";

        // Add map div,
        // and JS code for this colormap
        $(".mapcontainerheader#"+cp1).after(
            $.el('div',{'class':'row'}).append(
                $.el('div',{'class':'col-sm-12'}).append(
                    $.el('div',{'id':'map'+cp1}).text(' ').after(
                        $.el('p',{'class':'empty'}).text(' ')
                    )
                )
            )
        ).after(
            $.el('p',{'class':'nuthin'}).append(
                $.el('code',{'class':'colormapcode'}).text(colormap_string)
            )
        );
    }

    var N = scales.length;
    for (var c=0; c < N; c++) {

        var cp1=c+1;
        var colorscale = scales[c];
        var Nscale = colorscale.length;
        console.log(Nscale);

        $("div#map"+cp1).css("width","100%").css("height",400);

        // create the map, assign to the map div, and set it's lat, long, and zoom level (12)
        mapname = "map"+cp1;
        var m = L.map(mapname).setView([37.78, -122.45], 12);

        var params = {};
        if(Nscale==5) {
            params = {onEachFeature:enhanceLayer5};
        } else if(Nscale==7) {
            params = {onEachFeature:enhanceLayer7};
        } else if(Nscale==9) {
            params = {onEachFeature:enhanceLayer9};
        }
        var geoj = new L.geoJson.ajax(prefix+"sfcensus.geo.json",params);

        // Add MapBox Tiles
        // https://www.mapbox.com/developers/api/maps/
        L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImpreUJGM3MifQ.w5rSM7MjHv-SnOnt3gcqHA',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(m);

        geoj.addTo(m);


    }


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



    /*
     *

    ///////////////////////////////////
    // D3 color scale


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

    */

});

