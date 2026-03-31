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

function renderServer(data) {
  const container = document.getElementById("server-data");

  if (!data || !data.servers || !data.servers.Gmod) {
    container.innerHTML = '<p class="sv-error">Server info unavailable.</p>';
    return;
  }

  const gmodServers = data.servers.Gmod;
  const address = Object.keys(gmodServers)[0];
  const server = gmodServers[address];

  container.innerHTML = `
    <div class="sv-row">
      <div class="sv-icon">
        <img src="/icons/gmod.png" alt="Garry's Mod" />
      </div>
      <div class="sv-info">
        <p class="sv-name">${server.server_name}</p>
        <p class="sv-map">@ ${server.map}</p>
      </div>
      <div class="sv-players">
        ${server.players} / ${server.max_players}
      </div>
    </div>
  `;
}

async function init() {
  const container = document.getElementById("server-data");
  container.innerHTML = '<p class="sv-loading">Loading...</p>';
  const data = await fetchData(fetchUrl);
  renderServer(data);
}

init();
