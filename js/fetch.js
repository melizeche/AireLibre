const ENDPOINT_AQI = "https://rald-dev.greenbeep.com/api/v1/aqi";
const DEFAULT_CENTER = [-25.250, -57.536]
const DEFAULT_ZOOM = 11

const CAT_LABEL_STYLE = {
    'Good': { label: 'Libre', class: 'reading-info--is-good' },
    'Moderate': { label: 'Maso', class: 'reading-info--is-moderate' },
    'Unhealthy for Sensitive Groups': { label: 'No tan bien', class: 'reading-info--is-sensitive' },
    'Unhealthy': { label: 'Insalubre', class: 'reading-info--is-unhealthy' },
    'Very Unhealthy': { label: 'Muy insalubre', class: 'reading-info--is-very-unhealthy' },
    'Hazardous': { label: 'Peligroso', class: 'reading-info--is-dangerous' }
}

function requestGeoData() {
    const minutesToSubtract = 60;
    const currentDate = new Date();
    const time = new Date(currentDate.getTime() - minutesToSubtract * 60000);
    const utcDate = time.toISOString();
    const map = this.map;
    const searchUrl = ENDPOINT_AQI + '?start=' + utcDate;
    
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            loadMarkers(map, {
                type: "FeatureCollection",
                features: data.map(e => ({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [e.longitude, e.latitude]
                    },
                    "properties": e,
                })), // features ...
            }); // loadMarkers ...
        }); // then ...
} // requestGeoData ....

const loadMarkers = (map, data) => L.geoJSON(data, {
    onEachFeature: (feature, layer) => {
        const { class: className, label } = CAT_LABEL_STYLE[feature.properties.quality.category];
        layer
            .bindTooltip(`<h1>${feature.properties.description}</h1>${label}`, {
                noHide: true,
                // permanent: true, 
                className,
            });

    }, // onEachFeature ...
    pointToLayer: (feature, latlng) => {
        const { class: className } = CAT_LABEL_STYLE[feature.properties.quality.category];
        return new L.Marker(latlng, {
            icon: new L.divIcon({
                className: 'custom-div-icon',
                html: `<div class='${className} marker-pin'></div><i class='material-icons'>${feature.properties.quality.index}</i>`,
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            }) // new L.divIcon ...
        }) // new L.Marker ...
    }, // pointToLayer ...
}).addTo(map);
