export function getPilotStats() {
  return { flights: 42, hours: 186.4, rank: "First Officer" };
}

export function getRecentFlights() {
  return [
    { cs: "QFA12", rt: "YSSY‑KLAX", hr: 13.5, dt: "2026‑02‑10" },
    { cs: "QFA93", rt: "YMML‑YSSY", hr: 1.4, dt: "2026‑02‑09" }
  ];
}

export function getHoursHistory() {
  return [
    { date: "Jan", hours: 120 },
    { date: "Feb", hours: 150 },
    { date: "Mar", hours: 186 }
  ];
}
