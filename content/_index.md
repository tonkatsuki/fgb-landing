+++
draft =  false
date = 2026-03-18
type = "simple"
showAuthor = false
showDate = false
showWordcount = false
+++

<link rel="stylesheet" href="css/schemes/buttons.css">
<div id="game-buttons">
  <a href="steam://connect/87.99.142.46" class="gb-btn gb-btn--green">
    {{< icon "steam" >}} Connect
  </a>
  <a href="https://discord.gg/FreMaZDFbB" class="gb-btn gb-btn--blue">
    {{< icon "discord" >}} Discord
  </a>
</div>


<link rel="stylesheet" href="css/schemes/servers.css">
<div id="server-widget">
  <div class="sv-card">
    <div  id="server-data"></div>
  </div>
</div>
<script src="/scripts/js/fetch_servers_data.js"></script>

<link rel="stylesheet" href="css/schemes/countdown.css">
<div id="countdown-widget">
  <div class="gn-card">
    <p class="gn-badge" id="top-label">next session</p>
    <div class="gn-tiles">
      <div class="gn-tile"><div class="gn-num" id="cd-days">--</div><div class="gn-unit">days</div></div>
      <div class="gn-tile"><div class="gn-num" id="cd-hours">--</div><div class="gn-unit">hours</div></div>
      <div class="gn-tile"><div class="gn-num" id="cd-mins">--</div><div class="gn-unit">mins</div></div>
      <div class="gn-tile"><div class="gn-num" id="cd-secs">--</div><div class="gn-unit">secs</div></div>
    </div>
  </div>
</div>
<script src="scripts/js/countdown.js"></script>
