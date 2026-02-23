// MOCK DATA (real DB in Phase 5)

export function getPilotApps() {
  return [
    { id: 1, name: "Sam Fleishman", vid: "1234567" },
    { id: 2, name: "Test Pilot", vid: "7654321" }
  ];
}

export function getPIREPs() {
  return [
    { id: 1, cs: "QFA12", rt: "YSSY-KLAX", hr: 13.5 },
    { id: 2, cs: "QFA93", rt: "YMML-YSSY", hr: 1.4 }
  ];
}

export function approvePilot(id) {
  console.log("Approved pilot", id);
}

export function rejectPilot(id) {
  console.log("Rejected pilot", id);
}

export function approvePIREP(id) {
  console.log("Approved PIREP", id);
}

export function rejectPIREP(id) {
  console.log("Rejected PIREP", id);
}
