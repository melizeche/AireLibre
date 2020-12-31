const ENDPOINT_AQI = "https://rald-dev.greenbeep.com/api/v1/aqi";
const DEFAULT_CENTER = [-25.250, -57.536]
const DEFAULT_ZOOM = 11

const CAT_LABEL_STYLE = {
  'Good': {label: 'Libre', class: 'reading-info--is-good'},
  'Moderate': {label: 'Maso', class: 'reading-info--is-moderate'},
  'Unhealthy for Sensitive Groups': {label: 'No tan bien', class: 'reading-info--is-sensitive'},
  'Unhealthy': {label: 'Insalubre', class: 'reading-info--is-unhealthy'},
  'Very Unhealthy': {label: 'Muy insalubre', class: 'reading-info--is-very-unhealthy'},
  'Hazardous': {label: 'Peligroso', class: 'reading-info--is-dangerous'}
}

function requestGeoData() {
    var map = this.map;
    var searchUrl = ENDPOINT_AQI;


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
            var cat = CAT_LABEL_STYLE[feature.properties.quality.category];
            var popup =
                '<h1>' + feature.properties.description +
                '</h1><span class="has-text-weight-bold">AQI: ' +
                feature.properties.quality.index + '</span>' +
                '<br>' + cat.label
            layer.bindPopup(popup, {autoClose: false, className: cat.class});
            console.log(cat)
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

