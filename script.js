let map, marker;

// Replace these URLs with your ESP32 and backend endpoints
const GPS_API = "http://YOUR_ESP32_IP/coords";
const HELMET_API = "http://YOUR_BACKEND/helmet";

async function fetchCoords() {
  try {
    const response = await fetch(GPS_API);
    return await response.json(); // {lat: xx.xxxxx, lng: yy.yyyyy}
  } catch (e) {
    console.error("Error fetching GPS:", e);
    return { lat: 0, lng: 0 };
  }
}

async function fetchHelmetStatus() {
  try {
    const response = await fetch(HELMET_API);
    const data = await response.json(); // {helmet: "Worn"} or {helmet: "Not Worn"}
    document.getElementById("helmet-status").textContent = `Helmet: ${data.helmet}`;
  } catch (e) {
    console.error("Error fetching helmet status:", e);
    document.getElementById("helmet-status").textContent = "Helmet status unavailable";
  }
}

async function initMap() {
  const coords = await fetchCoords();
  map = new google.maps.Map(document.getElementById("map"), {
    center: coords,
    zoom: 15,
  });
  marker = new google.maps.Marker({ position: coords, map: map });

  // Update every 5 seconds
  setInterval(async () => {
    const newCoords = await fetchCoords();
    marker.setPosition(newCoords);
    map.setCenter(newCoords);
    fetchHelmetStatus();
  }, 5000);
}
