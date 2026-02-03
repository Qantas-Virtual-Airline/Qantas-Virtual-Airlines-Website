import { filters } from "./filters.js";

export function initUI(onChange) {
  ["callsign", "aircraft", "dep", "arr"].forEach(id => {
    document.getElementById(id).addEventListener("input", e => {
      filters[id] = e.target.value;
      onChange();
    });
  });

  document.getElementById("airborne").addEventListener("change", e => {
    filters.airborne = e.target.checked;
    onChange();
  });

  document.getElementById("refresh").addEventListener("click", onChange);
}
