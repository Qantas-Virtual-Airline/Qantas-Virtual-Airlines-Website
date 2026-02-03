import "./styles.css";
import { fetchVatsimPilots } from "./vatsim.js";
import { applyFilters } from "./filters.js";
import { initMap, renderMarkers } from "./map.js";
import { initUI } from "./ui.js";

let pilots = [];

initMap();

async function refresh() {
  pilots = await fetchVatsimPilots();
  renderMarkers(applyFilters(pilots));
}

initUI(refresh);
refresh();

// Auto refresh every 60s
setInterval(refresh, 60000);
