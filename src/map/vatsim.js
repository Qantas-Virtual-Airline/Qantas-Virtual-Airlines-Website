const map = L.map("map").setView([-25, 135], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  attribution: "© OpenStreetMap"
}).addTo(map);

const aircraftLayer = L.layerGroup().addTo(map);
const trailLayer = L.layerGroup().addTo(map);

// store last positions
const trails = {};

async function loadFIR() {
  const res = await fetch("../src/map/fir-au.json");
  const fir = await res.json();

  L.geoJSON(fir, {
    style: {
      color: "#00c2ff",
      weight: 2,
      fillOpacity: 0.05
    }
  }).addTo(map);
}

async function loadVatsim() {
  aircraftLayer.clearLayers();

  const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
  const data = await res.json();

  const pilots = data.pilots.filter(p =>
    p.callsign.startsWith("QFA")
  );

  pilots.forEach(p => {
    if (!p.latitude || !p.longitude) return;

    // trails
    if (!trails[p.callsign]) trails[p.callsign] = [];
    trails[p.callsign].push([p.latitude, p.longitude]);
    trails[p.callsign] = trails[p.callsign].slice(-20);

    L.polyline(trails[p.callsign], {
      color: "#ffb000",
      weight: 2,
      opacity: 0.6
    }).addTo(trailLayer);

    // aircraft marker
    const marker = L.circleMarker(
      [p.latitude, p.longitude],
      {
        radius: 6,
        color: "#e4002b",
        fillColor: "#e4002b",
        fillOpacity: 0.9
      }
    );

    marker.bindPopup(`
      <strong>${p.callsign}</strong><br/>
      ${p.departure} → ${p.arrival}<br/>
      FL${p.flight_level}<br/>
      GS ${p.groundspeed}kt
    `);

    marker.addTo(aircraftLayer);
  });
}

loadFIR();
loadVatsim();
setInterval(loadVatsim, 30000);
