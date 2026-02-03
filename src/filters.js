export const filters = {
  callsign: "",
  aircraft: "",
  dep: "",
  arr: "",
  airborne: false
};

export function applyFilters(pilots) {
  return pilots.filter(p => {
    if (filters.callsign && !p.callsign.includes(filters.callsign.toUpperCase())) return false;
    if (filters.aircraft && p.aircraft !== filters.aircraft.toUpperCase()) return false;
    if (filters.dep && p.dep !== filters.dep.toUpperCase()) return false;
    if (filters.arr && p.arr !== filters.arr.toUpperCase()) return false;
    if (filters.airborne && p.gs < 40) return false;
    return true;
  });
}
