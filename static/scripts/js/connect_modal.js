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
        <a href="${STEAM_URL}" class="cm-btn cm-btn--steam" id="cm-steam-btn">Open in Steam</a>
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
  hint.innerHTML = `Paste <code>${CONSOLE_CMD}</code> into your GMod console`;
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
