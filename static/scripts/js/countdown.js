(function () {
  const API_URL = "https://api4.friendgroupb.com";

  // Maps event_location to connect modal config
  const EVENT_CONFIGS = {
    "ttt.friendgroupb.com": {
      steamUrl: "steam://connect/ttt.friendgroupb.com",
      consoleCmd: "connect ttt.friendgroupb.com",
    },
  };

  // Maps game name to a short display label
  const GAME_LABELS = {
    "Garry's Mod TTT": "TTT Night",
  };

  let state = null;

  async function fetchEvent() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) return null;
      const data = await res.json();
      return data.next_event || null;
    } catch {
      return null;
    }
  }

  function processEvent(event) {
    state = {
      isLive: event.event_status === "active",
      target: new Date(event.event_time),
      label: GAME_LABELS[event.game] || event.event_name || "Event",
      connectConfig: EVENT_CONFIGS[event.event_location] || null,
    };
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const badge = document.getElementById('top-label');
    if (!state) return;

    if (state.isLive) {
      badge.className = 'gn-badge gn-badge--live';
      badge.textContent = `${state.label} Ongoing, Join Now!`;
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
    } else {
      badge.className = 'gn-badge gn-badge--next';
      badge.textContent = `Next ${state.label}`;
      const s = Math.max(0, Math.floor((state.target - new Date()) / 1000));
      document.getElementById('cd-days').textContent  = pad(Math.floor(s / 86400));
      document.getElementById('cd-hours').textContent = pad(Math.floor((s % 86400) / 3600));
      document.getElementById('cd-mins').textContent  = pad(Math.floor((s % 3600) / 60));
      document.getElementById('cd-secs').textContent  = pad(s % 60);
    }
  }

  async function refresh() {
    const event = await fetchEvent();
    if (event) processEvent(event);
  }

  document.getElementById('top-label').addEventListener('click', () => {
    if (state && state.isLive && state.connectConfig && typeof openConnectModal === 'function') {
      openConnectModal(state.connectConfig);
    }
  });

  // Initial fetch, then tick every second and re-fetch every 60s
  refresh().then(() => {
    tick();
    setInterval(tick, 1000);
  });
  setInterval(refresh, 60000);
})();
