const ENDPOINT_AQI = "https://api.airelib.re/api/v1/aqi";
const DEFAULT_CENTER = [-25.25, -57.536];
const DEFAULT_ZOOM = 11;

// Store markers layer globally so we can clear it when changing time
let markersLayer = null;

// Simple in-memory cache for storing API responses
const dataCache = {};

// Mapping air quality categories to labels and CSS classes for styling
const CAT_LABEL_STYLE = {
  Good: { label: "Libre", class: "reading-info--is-good" },
  Moderate: { label: "Maso", class: "reading-info--is-moderate" },
  "Unhealthy for Sensitive Groups": {
    label: "No tan bien",
    class: "reading-info--is-sensitive",
  },
  Unhealthy: { label: "Insalubre", class: "reading-info--is-unhealthy" },
  "Very Unhealthy": {
    label: "Muy insalubre",
    class: "reading-info--is-very-unhealthy",
  },
  Hazardous: { label: "Peligroso", class: "reading-info--is-dangerous" },
};

function requestGeoData(hoursAgo = 0) {
  // Calculate time based on slider value (0 = current hour, 1-MAX_HOURS_LOOKBACK = hours ago)
  const currentDate = new Date();
  let startTime, endTime;

  // Round current time to the nearest hour
  const roundedCurrentDate = new Date(currentDate);
  roundedCurrentDate.setMinutes(0, 0, 0);

  if (hoursAgo === 0) {
    // For current hour (last 60 minutes)
    startTime = new Date(currentDate.getTime() - 60 * 60000);
    endTime = currentDate;
  } else {
    // For historical data - use rounded hours
    endTime = new Date(
      roundedCurrentDate.getTime() - (hoursAgo - 1) * 60 * 60000
    );
    startTime = new Date(endTime.getTime() - 60 * 60000);
  }

  const startUtcDate = startTime.toISOString();
  const endUtcDate = endTime.toISOString();
  const map = this.map;

  // Check if we have cached data for this time period
  const cacheKey = hoursAgo.toString();

  // Update loading status
  const timeDisplay = document.getElementById("time-display");
  if (timeDisplay) {
    timeDisplay.innerHTML +=
      ' <span class="loading-indicator">(cargando...)</span>';
  }

  // If we have cached data, use it
  if (dataCache[cacheKey]) {
    console.log(`Using cached data for ${formatHourOnly(endTime)}`);

    // Remove loading indicator
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }

    // Display the cached data
    displayData(map, dataCache[cacheKey]);
    return;
  }

  // If no cache hit, make the API request
  console.log(`Requesting data for ${formatHourOnly(endTime)}`);

  const searchUrl =
    ENDPOINT_AQI + "?start=" + startUtcDate + "&end=" + endUtcDate;
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Received data for ${formatHourOnly(endTime)}`);

      // Remove loading indicator
      const loadingIndicator = document.querySelector(".loading-indicator");
      if (loadingIndicator) {
        loadingIndicator.remove();
      }

      // Cache the data
      dataCache[cacheKey] = data;

      // Display the data
      displayData(map, data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);

      // Remove loading indicator
      const loadingIndicator = document.querySelector(".loading-indicator");
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
    });
} // requestGeoData ....

// Function to display data on the map
// Format time to display only the hour in 24-hour format with :00 minutes
function formatHourOnly(date) {
  return date
    .toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    .replace(/:\d\d$/, ":00");
}

function displayData(map, data) {
  // Clear existing markers if they exist
  if (markersLayer) {
    map.removeLayer(markersLayer);
  }

  // Create new markers layer
  markersLayer = L.geoJSON(
    {
      type: "FeatureCollection",
      features: data
        .filter((e) => e.quality !== null)
        .map((e) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.longitude, e.latitude],
          },
          properties: e,
        })),
    },
    {
      onEachFeature: (feature, layer) => {
        const { class: className, label } =
          CAT_LABEL_STYLE[feature.properties.quality.category];
        // Bind a tooltip to each marker with a description and label
        layer.bindTooltip(
          `<h1>${feature.properties.description}</h1>${label}`,
          {
            noHide: true,
            className,
          }
        );
      },
      pointToLayer: (feature, latlng) => {
        const { class: className } =
          CAT_LABEL_STYLE[feature.properties.quality.category];
        return new L.Marker(latlng, {
          icon: new L.divIcon({
            className: "custom-div-icon",
            html: `<div class='${className} marker-pin'></div><i class='material-icons'>${feature.properties.quality.index}</i>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
          }),
        });
      },
    }
  ).addTo(map);
}
