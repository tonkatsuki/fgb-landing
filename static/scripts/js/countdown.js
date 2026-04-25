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
    if (GAME_DAYS.includes(c.day) && c.hour >= GAME_HOUR) return 'live';
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
    const label = document.getElementById('top-label');

    if (target === 'live') {
      label.className = 'gn-badge gn-badge--live';
      label.textContent = "TTT Night Ongoing, Join Now!";
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
    } else {
      label.className = 'gn-badge gn-badge--next';
      label.textContent = 'Next TTT Play Session';
      const s = Math.max(0, Math.floor((target - now) / 1000));
      document.getElementById('cd-days').textContent  = pad(Math.floor(s / 86400));
      document.getElementById('cd-hours').textContent = pad(Math.floor((s % 86400) / 3600));
      document.getElementById('cd-mins').textContent  = pad(Math.floor((s % 3600) / 60));
      document.getElementById('cd-secs').textContent  = pad(s % 60);
    }
  }

  tick();
  setInterval(tick, 1000);
})();
