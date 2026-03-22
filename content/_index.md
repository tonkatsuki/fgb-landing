+++
draft =  false
date = 2026-03-18
type = "simple"
showAuthor = false
showDate = false
showWordcount = false
+++

{{< button href="steam://connect/45.62.160.44:27043" >}}
{{< icon "steam" >}} Connect
{{< /button >}}
</br>
</br>
{{< button href="https://discord.gg/FreMaZDFbB" target="blank" >}}
{{< icon "discord" >}} Discord
{{< /button >}}


<style>
  .gn-wrap { padding: 1.5rem 0; font-family: var(--font-sans); }
  .gn-card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 1.5rem; max-width: 480px; margin: 0 auto; }
  .gn-label { font-size: 13px; color: var(--color-text-secondary); margin: 0 0 6px; }
  .gn-live { font-size: 20px; font-weight: 500; color: var(--color-text-success); margin: 0 0 0; }
  .gn-tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .gn-tile { background: var(--color-background-secondary); border-radius: var(--border-radius-md); padding: 0.75rem 0.5rem; text-align: center; }
  .gn-num { font-size: 28px; font-weight: 500; color: var(--color-text-primary); line-height: 1; }
  .gn-unit { font-size: 11px; color: var(--color-text-tertiary); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
</style>

<div class="gn-wrap">
  <div class="gn-card">
    <p class="gn-label" id="next-label">next session</p>
    <div id="tiles" class="gn-tiles">
      <div class="gn-tile"><div class="gn-num" id="days">--</div><div class="gn-unit">days</div></div>
      <div class="gn-tile"><div class="gn-num" id="hours">--</div><div class="gn-unit">hours</div></div>
      <div class="gn-tile"><div class="gn-num" id="mins">--</div><div class="gn-unit">mins</div></div>
      <div class="gn-tile"><div class="gn-num" id="secs">--</div><div class="gn-unit">secs</div></div>
    </div>
    <p class="gn-live" id="live-msg" style="display:none">We're playing right now, come join us!</p>
  </div>
</div>

<script>
(function () {
  const GAME_DAYS = [2, 6];
  const GAME_HOUR = 18;
  const TZ = 'America/Chicago';

  function getChicagoParts(date) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false
    }).formatToParts(date);
    const p = {};
    parts.forEach(({type, value}) => p[type] = value);
    return {
      day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),
      hour: parseInt(p.hour, 10),
      year: parseInt(p.year, 10),
      month: parseInt(p.month, 10),
      date: parseInt(p.day, 10)
    };
  }

  function chicagoToUTC(year, month, day, hour) {
    const candidate = new Date(Date.UTC(year, month - 1, day, hour, 0, 0));
    const diff = hour - getChicagoParts(candidate).hour;
    return new Date(candidate.getTime() + diff * 3600000);
  }

  function getTarget(now) {
    const c = getChicagoParts(now);
    if (GAME_DAYS.includes(c.day) && c.hour >= GAME_HOUR) return null;
    if (GAME_DAYS.includes(c.day) && c.hour < GAME_HOUR) return chicagoToUTC(c.year, c.month, c.date, GAME_HOUR);
    for (let i = 1; i <= 7; i++) {
      if (GAME_DAYS.includes((c.day + i) % 7)) {
        const fc = getChicagoParts(new Date(now.getTime() + i * 86400000));
        return chicagoToUTC(fc.year, fc.month, fc.date, GAME_HOUR);
      }
    }
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const target = getTarget(now);
    const tiles = document.getElementById('tiles');
    const liveMsg = document.getElementById('live-msg');
    const label = document.getElementById('next-label');

    if (target === null) {
      tiles.style.display = 'none';
      liveMsg.style.display = 'block';
      label.style.display = 'none';
    } else {
      tiles.style.display = 'grid';
      liveMsg.style.display = 'none';
      label.style.display = 'block';
      const s = Math.max(0, Math.floor((target - now) / 1000));
      document.getElementById('days').textContent  = pad(Math.floor(s / 86400));
      document.getElementById('hours').textContent = pad(Math.floor((s % 86400) / 3600));
      document.getElementById('mins').textContent  = pad(Math.floor((s % 3600) / 60));
      document.getElementById('secs').textContent  = pad(s % 60);
    }
  }

  tick();
  setInterval(tick, 1000);
})();
</script>

<link rel="stylesheet" href="css/schemes/servers_styles.css">
<div id="server-data"></div>
<script src="scripts/js/fetch_servers_data.js"></script>