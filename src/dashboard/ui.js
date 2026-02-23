import { isLoggedIn } from "../auth/auth.js";
import { getPilotStats, getRecentFlights } from "./data.js";
import { renderHoursChart } from "./graphs.js";
import { bindPIREP } from "./pireps.js";

if (!isLoggedIn()) location.href = "/pages/index.html";

const stats = getPilotStats();
totalFlights.textContent = stats.flights;
totalHours.textContent = stats.hours.toFixed(1);
rank.textContent = stats.rank;

getRecentFlights().forEach(f => {
  flightsTable.innerHTML += `
    <tr>
      <td>${f.cs}</td>
      <td>${f.rt}</td>
      <td>${f.hr}</td>
      <td>${f.dt}</td>
    </tr>`;
});

renderHoursChart();
bindPIREP();
