document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([56.8796, 24.6032], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    fetch('geomap.json')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                var coordinates = feature.geometry.coordinates;
                var latLng = LKS92WGS84.convertXYToLatLon(coordinates);
                var marker = L.marker([latLng[0], latLng[1]]).addTo(map);
                marker.bindPopup(`<b>${feature.properties.PLACENAME}</b><br>${feature.properties.PLACESUBTY}`);
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});