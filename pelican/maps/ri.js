
rooturl = "http://api.censusreporter.org/1.0/geo/show/tiger2013?geo_ids=050|04000US44";

$.ajax({
    type: "GET",
    url: rooturl,
    success: function (data) {
    	var geojson = new L.geoJson(data, {
    		onEachFeature: enhanceLayer
        }).addTo(map);
    }
});


function enhanceLayer(f,l){
    var out = [];
    if (f.properties){
        //if(f.properties['name']==='Beaufort County, NC') {
        //    console.log(f);
        //}
        l.bindPopup("County: "+f.properties['name']+"<br />GeoID: "+f.properties['geoid']);
        l.setStyle({  
            fillColor: '#CCF',
            fillOpacity: 0.20,
            stroke: true,
            color: '#222',
            weight: 1
        });
    }
}
