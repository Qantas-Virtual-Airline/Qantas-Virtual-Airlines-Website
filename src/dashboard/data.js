// TEMP mock data (real DB in Phase 5)

export function getPilotStats() {
  return {
    flights: 42,
    hours: 186.4,
    rank: "First Officer"
  };
}

export function getRecentFlights() {
  return [
    { callsign: "QFA12", route: "YSSY → KLAX", hours: 13.5, date: "2026‑02‑10" },
    { callsign: "QFA93", route: "YMML → YSSY", hours: 1.4, date: "2026‑02‑09" },
    { callsign: "QFA9",  route: "YSSY → EGLL", hours: 22.1, date: "2026‑02‑07" }
  ];
}
