const STEAM_URL = "steam://connect/87.99.142.46";
const CONSOLE_CMD = "connect ttt.friendgroupb.com";

function createConnectModal() {
  const overlay = document.createElement("div");
  overlay.className = "cm-overlay";
  overlay.id = "connect-overlay";
  overlay.innerHTML = `
    <div class="cm-modal" role="dialog" aria-modal="true">
      <button class="cm-close" id="cm-close" aria-label="Close">&#x2715;</button>
      <p class="cm-heading">Join the server</p>
      <div class="cm-actions">
        <a href="${STEAM_URL}" class="cm-btn cm-btn--steam" id="cm-steam-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style="flex-shrink:0"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/></svg> Open in Steam</a>
        <button class="cm-btn cm-btn--copy" id="cm-copy-btn">Copy connect command</button>
      </div>
      <p class="cm-hint" id="cm-hint"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", e => { if (e.target === overlay) closeConnectModal(); });
  document.getElementById("cm-close").addEventListener("click", closeConnectModal);
  document.getElementById("cm-steam-btn").addEventListener("click", closeConnectModal);
  document.getElementById("cm-copy-btn").addEventListener("click", copyConsoleCmd);
}

function openConnectModal() {
  document.getElementById("connect-overlay").classList.add("open");
}

function closeConnectModal() {
  document.getElementById("connect-overlay").classList.remove("open");
  document.getElementById("cm-hint").textContent = "";
  document.getElementById("cm-copy-btn").textContent = "Copy connect command";
}

async function copyConsoleCmd() {
  const btn = document.getElementById("cm-copy-btn");
  const hint = document.getElementById("cm-hint");
  try {
    await navigator.clipboard.writeText(CONSOLE_CMD);
    btn.textContent = "Copied!";
  } catch {
    // fallback: just show the command if clipboard API unavailable
  }
  hint.innerHTML = `Paste <code>${CONSOLE_CMD}</code> into your Garry's Mod console`;
}

function initConnectModal() {
  createConnectModal();
  const connectBtn = document.getElementById("steam-connect-btn");
  if (!connectBtn) return;
  connectBtn.addEventListener("click", e => {
    e.preventDefault();
    openConnectModal();
  });
}

initConnectModal();
