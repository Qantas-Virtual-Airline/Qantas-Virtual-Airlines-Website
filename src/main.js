/* ================= MAP SETUP ================= */
const map = L.map("map", { zoomControl: false }).setView([20, 0], 2);
L.control.zoom({ position: "topright" }).addTo(map);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { maxZoom: 19 }
).addTo(map);

/* ================= LAYERS ================= */
let firLayer = null;
let atcLayer = null;

/* ================= FIR (ADSBexchange DIRECT) ================= */
async function toggleFIR(show) {
  if (show && !firLayer) {
    const res = await fetch("https://data.adsbexchange.com/firs.geojson");
    const geo = await res.json();

    firLayer = L.geoJSON(geo, {
      style: {
        color: "#00ffff",
        weight: 1,
        opacity: 0.6,
        fillOpacity: 0
      },
      onEachFeature: (feature, layer) => {
        const name =
          feature.properties?.name ||
          feature.properties?.icao ||
          "FIR";
        layer.bindTooltip(name, {
          sticky: true,
          className: "fir-tooltip"
        });
      }
    }).addTo(map);
  }

  if (!show && firLayer) {
    map.removeLayer(firLayer);
    firLayer = null;
  }
}

/* ================= ATC (VATSIM LIVE) ================= */
async function toggleATC(show) {
  if (show && !atcLayer) {
    const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
    const data = await res.json();

    atcLayer = L.layerGroup();

    data.controllers.forEach(c => {
      if (!c.latitude || !c.longitude) return;

      const icon = L.divIcon({
        className: "atc-icon",
        html: "🎧",
        iconSize: [20, 20]
      });

      const m = L.marker([c.latitude, c.longitude], { icon })
        .bindPopup(
          `<b>${c.callsign}</b><br>
           ${c.frequency}<br>
           ${c.facility}`
        );

      atcLayer.addLayer(m);
    });

    atcLayer.addTo(map);
  }

  if (!show && atcLayer) {
    map.removeLayer(atcLayer);
    atcLayer = null;
  }
}

/* ================= UI HOOKS ================= */
document.getElementById("firToggle")
  ?.addEventListener("change", e => toggleFIR(e.target.checked));

document.getElementById("atcToggle")
  ?.addEventListener("change", e => toggleATC(e.target.checked));
