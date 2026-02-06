import { renderSidebar } from "./ui/sidebar.js";
import { state } from "./state/store.js";

/* ===== MAP SETUP ===== */
const map = L.map("map", { zoomControl: false }).setView([20, 0], 2);
L.control.zoom({ position: "topright" }).addTo(map);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { attribution: "&copy; OpenStreetMap & CartoDB", maxZoom: 19 }
).addTo(map);

/* ===== STATE ===== */
let pilots = [];
let markers = [];
let selectedMarker = null;
const markerByCallsign = new Map();

/* ===== LOADING ===== */
const loadingEl = document.getElementById("loading");

/* ===== FETCH ===== */
async function fetchVatsimPilots() {
  const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
  const data = await res.json();
  return data.pilots || [];
}

/* ===== FILTERS ===== */
function applyFilters(list) {
  return list.filter(p => {
    if (state.filters.airborneOnly && p.groundspeed < 30) return false;
    if (state.filters.callsign && !p.callsign.includes(state.filters.callsign.toUpperCase())) return false;
    if (state.filters.aircraft && !p.flight_plan?.aircraft?.includes(state.filters.aircraft.toUpperCase())) return false;
    if (state.filters.dep && p.flight_plan?.departure !== state.filters.dep.toUpperCase()) return false;
    if (state.filters.arr && p.flight_plan?.arrival !== state.filters.arr.toUpperCase()) return false;
    return true;
  });
}

/* ===== MARKERS ===== */
function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  markerByCallsign.clear();
  selectedMarker = null;
}

function renderMarkers(list) {
  const nextMarkers = [];

  list.forEach(p => {
    const key = p.callsign;
    const heading = p.heading ?? 0;

    let marker = markerByCallsign.get(key);

    if (!marker) {
      const icon = L.divIcon({
        className: "",
        html: `<div class="aircraft-icon" style="transform: rotate(${heading}deg)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      marker = L.marker([p.latitude, p.longitude], { icon }).addTo(map);

      marker.on("click", () => {
        if (selectedMarker) {
          selectedMarker.getElement()
            ?.querySelector(".aircraft-icon")
            ?.classList.remove("aircraft-selected");
          selectedMarker.setZIndexOffset(0);
        }

        selectedMarker = marker;
        marker.getElement()
          ?.querySelector(".aircraft-icon")
          ?.classList.add("aircraft-selected");

        marker.setZIndexOffset(1000);
        showPilotInfo(p);
      });

      markerByCallsign.set(key, marker);
    } else {
      marker.setLatLng([p.latitude, p.longitude]);
      const el = marker.getElement()?.querySelector(".aircraft-icon");
      if (el) el.style.transform = `rotate(${heading}deg)`;
    }

    nextMarkers.push(marker);
  });

  markers.forEach(m => {
    if (!nextMarkers.includes(m)) map.removeLayer(m);
  });

  markers = nextMarkers;
}

/* ===== PILOT INFO ===== */
function showPilotInfo(p) {
  document.getElementById("pilot-panel").innerHTML = `
    <h3>${p.callsign}</h3>
    <p><b>Aircraft:</b> ${p.flight_plan?.aircraft || "N/A"}</p>
    <p><b>Route:</b> ${p.flight_plan?.departure || "—"} → ${p.flight_plan?.arrival || "—"}</p>
    <p><b>Altitude:</b> ${p.altitude} ft</p>
    <p><b>Speed:</b> ${p.groundspeed} kts</p>
    <p><b>Heading:</b> ${p.heading ?? "—"}°</p>
  `;
}

/* ===== REFRESH ===== */
async function refresh() {
  loadingEl.classList.remove("hidden");
  try {
    pilots = await fetchVatsimPilots();
    renderMarkers(applyFilters(pilots));
  } finally {
    loadingEl.classList.add("hidden");
  }
}

/* ===== INIT ===== */
renderSidebar(() => renderMarkers(applyFilters(pilots)));
refresh();
setInterval(refresh, 30000);
