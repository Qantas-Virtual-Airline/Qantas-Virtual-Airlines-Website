import { isAdmin } from "../auth/auth.js";
import {
  getPilotApps,
  getPIREPs,
  approvePilot,
  rejectPilot,
  approvePIREP,
  rejectPIREP
} from "./api.js";

if (!isAdmin()) {
  window.location.href = "/pages/index.html";
}

// PILOTS
const pilotTable = document.getElementById("pilotTable");

getPilotApps().forEach(p => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${p.name}</td>
    <td>${p.vid}</td>
    <td>
      <button onclick="approvePilot(${p.id})">✅</button>
      <button onclick="rejectPilot(${p.id})">❌</button>
    </td>
  `;
  pilotTable.appendChild(row);
});

// PIREPS
const pirepTable = document.getElementById("pirepTable");

getPIREPs().forEach(p => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${p.cs}</td>
    <td>${p.rt}</td>
    <td>${p.hr}</td>
    <td>
      <button onclick="approvePIREP(${p.id})">✅</button>
      <button onclick="rejectPIREP(${p.id})">❌</button>
    </td>
  `;
  pirepTable.appendChild(row);
});
