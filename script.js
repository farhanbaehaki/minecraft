const bgm = document.getElementById("bgm");
const sfxClick = document.getElementById("sfx-click");
const sfxChallenge = document.getElementById("sfx-challenge");
const startOverlay = document.getElementById("start-overlay");
const advancement = document.getElementById("advancement");
const lootModal = document.getElementById("loot-modal");

// Fungsi helper suara
function playSfx(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// 1. LOGIKA START
startOverlay.addEventListener("click", () => {
  startOverlay.style.opacity = "0";
  setTimeout(() => {
    startOverlay.style.display = "none";
    document.querySelector(".minecraft-screen").classList.add("show-content");
  }, 500);

  bgm.volume = 0.3;
  bgm.play().catch((e) => console.log("Playback blocked"));
  playSfx(sfxClick);
});

// 2. SISTEM LOOT & HOTBAR
function openLoot(title, text, element) {
  playSfx(sfxClick);

  // Update visual slot aktif
  document.querySelectorAll(".hotbar-slot").forEach((slot) => {
    slot.classList.remove("active-slot");
  });
  if (element) element.classList.add("active-slot");

  document.getElementById("loot-title").innerText = title;
  document.getElementById("loot-text").innerText = text;
  lootModal.style.display = "flex";
}

function closeLoot() {
  playSfx(sfxClick);
  lootModal.style.display = "none";
}

// 3. EVENT UTAMA (NEW AGE)
function mainEvent() {
  playSfx(sfxClick);
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

  setTimeout(() => {
    playSfx(sfxChallenge);
    advancement.classList.add("show-adv");
    setTimeout(() => advancement.classList.remove("show-adv"), 7000);
  }, 500);
}

// 4. QUEST: TIUP LILIN
function eatCake(element) {
  playSfx(sfxClick);
  document
    .querySelectorAll(".hotbar-slot")
    .forEach((s) => s.classList.remove("active-slot"));
  element.classList.add("active-slot");

  confetti({ particleCount: 100, spread: 360, origin: { y: 0.7 } });

  setTimeout(() => {
    playSfx(sfxChallenge);
    openLoot(
      "🎂 Make a Wish!",
      "Fyuuuuhhh... Lilin level 18 padam!\n\nSemoga di level 19 ini semua mimpimu di-crafting jadi nyata ya! ❤️",
      element
    );
  }, 300);
}

// 5. QUEST: BIRTHDAY CHEST (PASSWORD)
function showGift() {
  playSfx(sfxClick);
  let passcode = prompt("🔐 [QUEST] Masukkan 4 digit Passcode (DDMM):");

  if (passcode === "1301") {
    playSfx(sfxChallenge);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    openLoot(
      "🎁 LOOT UNLOCKED!",
      'Selamat Naura! Quest Selesai.\n\n"Kamu adalah update terbaik dalam hidupku."\n\nCek hadiah aslimu di meja ya! ❤️'
    );
  } else if (passcode !== null) {
    alert("❌ Passcode Salah! (Hint: Tanggal & Bulan lahir)");
  }
}

// 6. SPLASH TEXT DINAMIS
const splashQuotes = [
  "Happy Birthday, Naura!",
  "Level 19 Unlocked!",
  "OP Player!",
  "The Best Update!",
  "Diamond Girl!",
];
setInterval(() => {
  const splash = document.getElementById("splash");
  if (splash) {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.innerText =
        splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
      splash.style.opacity = 1;
    }, 500);
  }
}, 5000);

// 7. EASTER EGG
let clicks = 0;
function easterEgg() {
  clicks++;
  if (clicks === 5) {
    alert(
      "✨ SECRET UNLOCKED: You are the most beautiful person in this server!"
    );
    clicks = 0;
  }
}
