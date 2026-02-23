import { getHoursHistory } from "./data.js";

export function renderHoursChart() {
  const ctx = document.getElementById("hoursChart");
  const data = getHoursHistory();

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: "Total Hours",
        data: data.map(d => d.hours),
        borderColor: "#e4002b",
        tension: 0.3
      }]
    }
  });
}
