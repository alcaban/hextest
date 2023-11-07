// Initialize the map
var map = L.map('map').setView([0, 0], 3);

// Add a basemap layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Create a hexbin layer
var hexLayer = L.hexbinLayer({
    radius: 12, // Adjust the hexbin size
    opacity: 0.7, // Adjust the opacity
    colorScaleExtent: [1, 100], // Adjust color scale extent
}).addTo(map);

// Load GeoJSON data
fetch('quakes_christchurch_20100901-20101001_mag-gt3.geojson')
    .then((response) => response.json())
    .then((data) => {
        hexLayer.data(data.features); // Pass the GeoJSON features to the hexbin layer
        map.fitBounds(hexLayer.dataBounds); // Fit the map to the data bounds
    })
    .catch((error) => console.error('Error loading GeoJSON:', error));
