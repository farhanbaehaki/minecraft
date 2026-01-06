// 1. INISIALISASI VARIABEL (Hanya satu kali)
const bgm = document.getElementById("bgm");
const sfxClick = document.getElementById("sfx-click");
const sfxChallenge = document.getElementById("sfx-challenge");
const startOverlay = document.getElementById("start-overlay");
const advancement = document.getElementById("advancement");
const lootModal = document.getElementById("loot-modal");
const mainScreen = document.querySelector(".minecraft-screen");

// 2. FUNGSI HELPER (Suara + Vibrasi HP)
function playSfx(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
  // Vibrasi hanya jalan di Android jika didukung
  if (navigator.vibrate) {
    navigator.vibrate(40);
  }
}

// 3. LOGIKA START GAME
startOverlay.addEventListener("click", () => {
  startOverlay.style.opacity = "0";
  setTimeout(() => {
    startOverlay.style.display = "none";
    mainScreen.classList.add("show-content");
  }, 500);

  bgm.volume = 0.3;
  bgm.play().catch((e) => console.log("Playback blocked"));
  playSfx(sfxClick);
});

// 4. SISTEM LOOT & HOTBAR (Dengan Efek Zoom-Blur)
function openLoot(title, text, element) {
  playSfx(sfxClick);

  // Efek Zoom pada background (Fitur Upgrade)
  mainScreen.classList.add("world-blur");

  // Update visual slot aktif (Garis putih)
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
  mainScreen.classList.remove("world-blur"); // Kembalikan background
  lootModal.style.display = "none";
}

// 5. EVENT UTAMA (Enter New Age)
function mainEvent() {
  playSfx(sfxClick);
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

  setTimeout(() => {
    playSfx(sfxChallenge);
    advancement.classList.add("show-adv");
    setTimeout(() => advancement.classList.remove("show-adv"), 7000);
  }, 500);
}

// 6. QUEST: TIUP LILIN
function eatCake(element) {
  playSfx(sfxClick);
  document
    .querySelectorAll(".hotbar-slot")
    .forEach((s) => s.classList.remove("active-slot"));
  element.classList.add("active-slot");

  confetti({ particleCount: 100, spread: 100, origin: { y: 0.7 } });

  setTimeout(() => {
    playSfx(sfxChallenge);
    openLoot(
      "🎂 Wish Made!",
      "Fyuuuuhhh... Lilin level 18 padam!\n\nSemoga di level 19 ini semua mimpimu di-crafting jadi nyata ya! ❤️",
      element
    );
  }, 300);
}

// 7. QUEST: BIRTHDAY CHEST (PASSWORD)
function showGift() {
  playSfx(sfxClick);
  let passcode = prompt("🔐 [QUEST] Masukkan 4 digit Passcode (DDMM):");

  if (passcode === "1301") {
    playSfx(sfxChallenge);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    openLoot(
      "🎁 LOOT UNLOCKED!",
      'Selamat Naura! Quest Selesai.\n\n"Kamu adalah update terbaik dalam hidupku."\n\nCek hadiah aslimu sekarang! ❤️'
    );
  } else if (passcode !== null) {
    alert("❌ Passcode Salah! (Hint: Tanggal & Bulan lahir)");
  }
}

// 8. SPLASH TEXT DINAMIS (Ganti otomatis tiap 5 detik)
const splashQuotes = [
  "Level 19!",
  "HBD Naura!",
  "Legendary Player",
  "Diamond Girl",
  "OP Player!",
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

// 9. EASTER EGG & CINEMATIC
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

function finalCinematic() {
  playSfx(sfxClick);
  mainScreen.innerHTML = `
        <div class="ending-credits" style="text-align: center; color: white; padding-top: 50vh;">
            <p class="poem-text">I see the player you mean.</p>
            <p class="poem-text">Naura...</p>
            <p class="poem-text">Yes. Take care. It has reached a higher level now.</p>
            <p class="poem-text">Level 19 is not the end. It is a new world.</p>
            <p class="poem-text">And the universe said: I Love You.</p>
            <button class="mc-button" style="margin-top: 20px;" onclick="location.reload()">RESTART WORLD</button>
        </div>
    `;
}
