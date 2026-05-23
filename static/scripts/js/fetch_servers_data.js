const fetchUrl = "https://api3.friendgroupb.com";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function createPopout() {
  const overlay = document.createElement("div");
  overlay.id = "sv-overlay";
  document.body.appendChild(overlay);

  const popout = document.createElement("div");
  popout.id = "sv-popout";
  popout.innerHTML = `
    <div class="sv-popout-header">
      <span>Players</span>
      <button class="sv-popout-close" aria-label="Close">&#x2715;</button>
    </div>
    <div class="sv-popout-list"></div>
  `;
  document.body.appendChild(popout);

  overlay.addEventListener("click", closePopout);
  popout.querySelector(".sv-popout-close").addEventListener("click", closePopout);
}

function openPopout(playerList) {
  const list = document.querySelector("#sv-popout .sv-popout-list");

  if (!playerList || playerList.length === 0) {
    list.innerHTML = '<p class="sv-popout-empty">No players online.</p>';
  } else {
    list.innerHTML = playerList.map(p => {
      const score = p.score !== undefined ? `${p.score} pts` : "";
      const duration = p.duration !== undefined ? formatDuration(p.duration) : "";
      const meta = [score, duration].filter(Boolean).join(" · ");
      return `
        <div class="sv-popout-player">
          <span class="sv-popout-name">${p.name}</span>
          ${meta ? `<span class="sv-popout-score">${meta}</span>` : ""}
        </div>
      `;
    }).join("");
  }

  document.getElementById("sv-overlay").classList.add("open");
  document.getElementById("sv-popout").classList.add("open");
}

function closePopout() {
  document.getElementById("sv-overlay").classList.remove("open");
  document.getElementById("sv-popout").classList.remove("open");
}

function renderServer(data) {
  const container = document.getElementById("server-data");

  if (!data || !data.servers || !data.servers.Gmod) {
    container.innerHTML = '<p class="sv-error">Server info unavailable.</p>';
    return;
  }

  const gmodServers = data.servers.Gmod;
  const address = Object.keys(gmodServers)[0];
  const server = gmodServers[address];
  const playerList = server.player_list || [];

  container.innerHTML = `
    <div class="sv-row">
      <div class="sv-icon">
        <img src="/icons/gmod.png" alt="Garry's Mod" />
      </div>
      <div class="sv-info">
        <p class="sv-name">${server.server_name}</p>
        <p class="sv-map">@ ${server.map}</p>
      </div>
      <div class="sv-players" role="button" tabindex="0">
        ${server.players} / ${server.max_players}
      </div>
    </div>
  `;

  const badge = container.querySelector(".sv-players");
  badge.addEventListener("click", () => openPopout(playerList));
  badge.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") openPopout(playerList);
  });
}

async function init() {
  createPopout();
  const container = document.getElementById("server-data");
  container.innerHTML = '<p class="sv-loading">Loading...</p>';
  const data = await fetchData(fetchUrl);
  renderServer(data);
}

init();
