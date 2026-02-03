export async function fetchVatsimPilots() {
  const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
  const data = await res.json();

  return data.pilots.map(p => ({
    callsign: p.callsign,
    lat: p.latitude,
    lon: p.longitude,
    altitude: p.altitude,
    gs: p.groundspeed,
    aircraft: p.flight_plan?.aircraft_short ?? "",
    dep: p.flight_plan?.departure ?? "",
    arr: p.flight_plan?.arrival ?? ""
  }));
}
