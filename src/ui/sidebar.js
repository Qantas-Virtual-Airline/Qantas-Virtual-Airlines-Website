import { state } from "../state/store.js";

export function renderSidebar(onChange) {
  const el = document.getElementById("sidebar");

  el.innerHTML = `
    <h2>QVA Live Map</h2>

    <div class="section">
      <h3>Pilot Filters</h3>
      <label>Callsign</label>
      <input id="callsign" placeholder="DAL123" />

      <label>Aircraft</label>
      <input id="aircraft" placeholder="A320" />
    </div>

    <div class="section">
      <h3>Route</h3>
      <label>Departure</label>
      <input id="dep" placeholder="KJFK" />

      <label>Arrival</label>
      <input id="arr" placeholder="KLAX" />
    </div>

    <div class="section">
      <h3>Region</h3>
      <label>FIR</label>
      <input id="fir" placeholder="KZNY" />
    </div>

    <div class="section">
      <label class="checkbox">
        <input type="checkbox" id="airborne" />
        Airborne only
      </label>
    </div>
  `;

  ["callsign","aircraft","dep","arr","fir"].forEach(id => {
    el.querySelector(`#${id}`).oninput = e => {
      state.filters[id] = e.target.value;
      onChange();
    };
  });

  el.querySelector("#airborne").onchange = e => {
    state.filters.airborneOnly = e.target.checked;
    onChange();
  };
}
