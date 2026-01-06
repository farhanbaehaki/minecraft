// 7. CHAT SYSTEM (SERVER NOTIFICATIONS)
function sendChat(msg) {
  const box = document.getElementById("chat-box");
  if (!box) return;

  const div = document.createElement("div");
  div.className = "chat-msg";
  div.innerHTML = msg;
  box.appendChild(div);

  // Scroll otomatis ke bawah jika chat penuh
  box.scrollTop = box.scrollHeight;

  // Pesan menghilang otomatis setelah 8 detik agar layar bersih
  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transition = "1s";
    setTimeout(() => div.remove(), 1000);
  }, 8000);
}

function triggerInitialChat() {
  setTimeout(() => sendChat('<span style="color:#AAA">[System] Naura joined the game</span>'), 1500);
  setTimeout(() => sendChat('<span style="color:#AAA">[System] Level 18 has ended. Loading Level 19...</span>'), 3500);
  setTimeout(() => sendChat("<span>&lt;Admin&gt;</span> Selamat ulang tahun, Naura! ❤️"), 5500);
}