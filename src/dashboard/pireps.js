export function bindPIREP() {
  const form = document.getElementById("pirepForm");
  const status = document.getElementById("pirepStatus");

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "✅ PIREP auto‑approved";
    form.reset();
  });
}
