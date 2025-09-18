// Initialize Google Map
function initMap() {
  const bikeLocation = { lat: 11.0168, lng: 76.9558 }; // Default coords (Coimbatore)
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: bikeLocation,
    styles: [ { elementType: "geometry", stylers: [{ color: "#1f2937" }] } ]
  });
  const marker = new google.maps.Marker({ position: bikeLocation, map });

  // Simulate location update
  setInterval(() => {
    // Random movement simulation
    bikeLocation.lat += (Math.random() - 0.5) * 0.001;
    bikeLocation.lng += (Math.random() - 0.5) * 0.001;
    marker.setPosition(bikeLocation);
    map.setCenter(bikeLocation);
  }, 5000);
}

// Helmet Detection Simulation
function updateHelmetStatus() {
  const statusEl = document.getElementById("helmet-status");
  const statuses = ["Helmet Worn ✅", "Helmet Not Detected ❌"];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % statuses.length;
    statusEl.textContent = statuses[index];
    statusEl.className =
      index === 0
        ? "text-2xl font-bold text-green-400"
        : "text-2xl font-bold text-red-400";
  }, 4000);
}

// Battery, Speed, Temperature Simulation
function updateStats() {
  setInterval(() => {
    document.getElementById("battery").textContent = `${Math.floor(Math.random() * 21) + 80}%`;
    document.getElementById("speed").textContent = `${Math.floor(Math.random() * 40)} km/h`;
    document.getElementById("temp").textContent = `${Math.floor(Math.random() * 10) + 25}°C`;
  }, 3000);
}

// Initialize all
window.onload = () => {
  initMap();
  updateHelmetStatus();
  updateStats();
};
