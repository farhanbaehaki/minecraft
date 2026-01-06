// 1. ELEMEN & AUDIO
const bgm = document.getElementById("bgm");
const sfxClick = document.getElementById("sfx-click");
const sfxChallenge = document.getElementById("sfx-challenge");
const startOverlay = document.getElementById("start-overlay");
const mainScreen = document.querySelector(".minecraft-screen");
const advancement = document.getElementById("advancement");
const lootModal = document.getElementById("loot-modal");

// 2. START & LOADING
startOverlay.addEventListener("click", () => {
  sfxClick.currentTime = 0;
  sfxClick.play();

  startOverlay.style.display = "none";
  const loadingScreen = document.getElementById("loading-screen");
  const loadingBar = document.getElementById("loading-bar");
  const loadingText = document.getElementById("loading-text");
  loadingScreen.style.display = "flex";

  let width = 0;
  const phrases = [
    "Building Terrain...",
    "Loading Resources...",
    "Preparing Birthday Cake...",
    "Spawning Naura...",
  ];

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      loadingScreen.style.display = "none";
      mainScreen.classList.add("show-content");
      bgm.volume = 0.3;
      bgm.play().catch((e) => console.log("Audio play blocked"));
    } else {
      width += Math.random() * 15;
      if (width > 100) width = 100;
      loadingBar.style.width = width + "%";
      if (width > 25) loadingText.innerText = phrases[1];
      if (width > 60) loadingText.innerText = phrases[2];
      if (width > 85) loadingText.innerText = phrases[3];
    }
  }, 200);
});

// 3. MAIN EVENT (ENTER NEW AGE)
function mainEvent() {
  sfxClick.currentTime = 0;
  sfxClick.play();

  var duration = 4 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      zIndex: 11000,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      zIndex: 11000,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  setTimeout(() => {
    sfxChallenge.currentTime = 0;
    sfxChallenge.play();
    advancement.classList.add("show-adv");
    setTimeout(() => advancement.classList.remove("show-adv"), 7000);
  }, 500);
}

// 4. TIUP LILIN (VIRTUAL CAKE)
function eatCake() {
  sfxClick.currentTime = 0;
  sfxClick.play();

  // Firework Rockets Effect
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ["#ff0000", "#ffffff", "#ffff00"],
      zIndex: 11000,
    });
    confetti({
      particleCount: 10,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ["#ff0000", "#ffffff", "#ffff00"],
      zIndex: 11000,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  setTimeout(() => {
    sfxChallenge.currentTime = 0;
    sfxChallenge.play();
    openLoot(
      "🎂 Level Up: 19!",
      'Fyuuuuhhh... Lilin level 18 sudah padam!\n\n[SECRET MESSAGE]:\n"Terima kasih sudah menjadi rekan petualangan terbaikku. Semoga di level 19 ini, koordinat hidupmu selalu menuju kebahagiaan. I love you to the nether and back! ❤️"'
    );
  }, 600);
}

// 5. BIRTHDAY CHEST (PASSCODE)
function showGift() {
  sfxClick.currentTime = 0;
  sfxClick.play();
  let passcode = prompt(
    "🔐 [QUEST] Masukkan 4 digit Passcode (Tanggal lahir DDMM):"
  );
  if (passcode === "1301") {
    sfxChallenge.currentTime = 0;
    sfxChallenge.play();
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 11000,
    });
    openLoot(
      "🎁 LOOT UNLOCKED!",
      'Selamat Naura! Kamu berhasil menyelesaikan quest.\n\nIsi Chest: \n1. Voucher Makan Malam Berdua 🍽️\n2. Surat Cinta Digital: "Kamu adalah update terbaik dalam hidupku."\n\nCek hadiah fisikmu di tempat biasa ya! ❤️'
    );
  } else if (passcode !== null) {
    alert("❌ Passcode Salah!");
  }
}

// 6. LOOT & SPLASH SYSTEM
function openLoot(title, text) {
  sfxClick.currentTime = 0;
  sfxClick.play();
  document.getElementById("loot-title").innerText = title;
  document.getElementById("loot-text").innerText = text;
  lootModal.style.display = "flex";
}
function closeLoot() {
  lootModal.style.display = "none";
}

const splashQuotes = [
  "Happy Birthday, Naura!",
  "Level 19 Unlocked!",
  "Most Beautiful Player!",
  "New Quest Available!",
];
setInterval(() => {
  const splash = document.getElementById("splash");
  if (splash)
    splash.innerText =
      splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
}, 3000);
