const sfxClick = document.getElementById("sfx-click");
const sfxChallenge = document.getElementById("sfx-challenge");
const bgm = document.getElementById("bgm");

// 1. Loading & Start Logic
document.getElementById("start-overlay").addEventListener("click", function () {
  sfxClick.play();
  this.style.display = "none";
  const ls = document.querySelector(".dirt-bg");
  ls.style.display = "flex";

  let w = 0;
  const t = document.getElementById("loading-text");
  const b = document.getElementById("loading-bar");

  const iv = setInterval(() => {
    w += Math.random() * 10;
    if (w >= 100) {
      w = 100;
      clearInterval(iv);
      ls.style.display = "none";
      document.querySelector(".minecraft-screen").classList.add("show-content");
      bgm.volume = 0.3;
      bgm.play();
      triggerInitialChat(); // Mulai Chat Otomatis
    }
    b.style.width = w + "%";
    if (w > 30) t.innerText = "Loading Resources...";
    if (w > 70) t.innerText = "Spawning Naura...";
  }, 150);
});

// 2. Chat System
function sendChat(msg) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "chat-msg";
  div.innerHTML = msg;
  box.appendChild(div);
  setTimeout(() => div.remove(), 7000);
}

function triggerInitialChat() {
  setTimeout(
    () =>
      sendChat('<span style="color:#AAA">[System] Kamu joined the game</span>'),
    1000
  );
  setTimeout(
    () =>
      sendChat(
        '<span style="color:#AAA">[System] Memberi Naura 1000 Roses</span>'
      ),
    3000
  );
  setTimeout(
    () => sendChat("<span>&lt;Kamu&gt;</span> Selamat ulang tahun, Sayang! ❤️"),
    5000
  );
}

// 3. Quest & Events
function mainEvent() {
  sfxClick.play();
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  const adv = document.getElementById("advancement");
  sfxChallenge.play();
  adv.classList.add("show-adv");
  setTimeout(() => adv.classList.remove("show-adv"), 6000);
}

function eatCake() {
  sfxClick.play();
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
  setTimeout(() => {
    sfxChallenge.play();
    openLoot(
      "🎂 Level Up!",
      "Fyuuuhhh... Lilin level 18 sudah padam. \n\nSelamat datang di Level 19, Naura! Semoga duniamu selalu penuh dengan Diamond dan kebahagiaan. ❤️"
    );
  }, 500);
}

function showGift() {
  let p = prompt("🔐 Passcode (Tanggal Lahir DDMM):");
  if (p === "1301") {
    sfxChallenge.play();
    openLoot(
      "🎁 Birthday Loot",
      "Quest Selesai! Kamu mendapatkan:\n1. Unlimited Love ❤️\n2. Rare Hug 🫂\n3. Voucher Dinner! 🍽️"
    );
  } else if (p !== null) {
    alert("Wrong Code!");
  }
}

function openLoot(title, text) {
  document.getElementById("loot-title").innerText = title;
  document.getElementById("loot-text").innerText = text;
  document.getElementById("loot-modal").style.display = "flex";
}

function closeLoot() {
  document.getElementById("loot-modal").style.display = "none";
}
