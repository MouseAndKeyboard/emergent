/* ---- CONFIG ---- */
const API_BASE = "/api/waitlist";         // adapt to your actual backend route
const DISCORD_INVITE = "https://discord.gg/yourInvite";  // replace

/* ---- WAITLIST COUNTER ---- */
async function updateCounter() {
  try {
    const res = await fetch(`${API_BASE}/size`);
    const { size } = await res.json();
    document.getElementById("counter-value").textContent = size.toLocaleString();
  } catch {
    document.getElementById("counter-value").textContent = "—";
  }
}
updateCounter();
setInterval(updateCounter, 20_000);   // refresh every 20 s

/* ---- FORM HANDLER ---- */
const form = document.getElementById("waitlist-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const tag = document.getElementById("discord-tag").value.trim();
  if (!/^.+?#\d{4}$/.test(tag)) {
    alert("Please enter a valid Discord tag (e.g. Steve#1234)");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discordTag: tag })
    });
    if (res.ok) {
      form.classList.add("hidden");
      document.getElementById("success-msg").classList.remove("hidden");
      window.open(DISCORD_INVITE, "_blank");
      updateCounter();
    } else {
      const { error } = await res.json();
      alert(error || "Something went wrong, try again.");
    }
  } catch {
    alert("Network error. Please try again.");
  }
});

/* ---- OPTIONAL: subtle floating rose pixels ---- */
/* Tiny decorative touch; safe to remove */
(function particles() {
  const c = document.getElementById("rose-bg");
  if (!c.getContext) return;
  const ctx = c.getContext("2d");
  const w = c.width = window.innerWidth;
  const h = c.height = 300;
  const petals = Array.from({ length: 40 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    s: 4 + Math.random() * 6,
    v: .4 + Math.random() * .6
  }));
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of petals) {
      ctx.fillStyle = Math.random() > .5 ? "#be1c1c" : "#741212";
      ctx.fillRect(p.x, p.y, p.s, p.s);
      p.y -= p.v;
      if (p.y < -10) p.y = h + 10;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
