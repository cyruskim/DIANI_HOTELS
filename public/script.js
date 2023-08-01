const map = L.map('map').setView([-4.284478, 39.59037], 13); // Set the initial map view to Diani

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Function to fetch data from the server and add markers to the map
function fetchDataAndDisplayMarkers() {
  fetch('/get_points_of_interest')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((point) => {
        const { name, latitude, longitude } = point;
        L.marker([latitude, longitude]).addTo(map).bindPopup(name);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Call the function to fetch data and display markers on the map
fetchDataAndDisplayMarkers();
