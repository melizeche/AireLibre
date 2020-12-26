var GEO_URL = "https://rald-dev.greenbeep.com/api/v1/aqi";

function requestGeoData() {
    //this.loadingIndicator.show();
    var map = this.map;
    var searchUrl = GEO_URL;


    fetch(searchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)
            geoData = parseToGeoJSON(data)
            layers = loadMarkers(map, geoData);
            layers.eachLayer(l=>{
                console.log(l)
                l.openPopup()
            })

        });
}

function loadMarkers(map, data) {
    var layerGroup = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            var popup =
                '<h1>' + feature.properties.description +
                '</h1><span class="has-text-weight-bold">AQI: ' +
                feature.properties.quality.index + '</span>' +
                '<br>' + feature.properties.quality.category
            layer.bindPopup(popup, {autoClose: false});
        },
    }).addTo(map);

    return layerGroup;
}

function parseToGeoJSON(data) {
    parsed_data = {
        "type": "FeatureCollection",
        "features": []
    }
    data.forEach(element => {
        point = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [element.longitude, element.latitude]
            },
            "properties": element
        }
        parsed_data.features.push(point)
    });
    //console.log(parsed_data)
    return parsed_data
}

