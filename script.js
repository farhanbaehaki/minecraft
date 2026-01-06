// --- 1. INISIALISASI ELEMEN ---
const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');
const advancement = document.getElementById('advancement');
const lootModal = document.getElementById('loot-modal');

// --- 2. LOGIKA START GAME ---
startOverlay.addEventListener('click', () => {
    // Menghilangkan overlay dengan halus
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        mainScreen.classList.add('show-content');
    }, 500);

    // Audio diputar setelah interaksi user (Syarat browser modern)
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("Audio play diblokir browser"));
    
    // SFX Klik pertama
    sfxClick.currentTime = 0;
    sfxClick.play();
});

// --- 3. EVENT UTAMA (UPDATE VERSION) ---
function mainEvent() {
    // Reset audio agar bisa diklik berkali-kali tanpa tunggu selesai
    sfxClick.currentTime = 0; 
    sfxClick.play();

    // Efek Kembang Api
    confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 },
        zIndex: 10001 // Pastikan di atas elemen lain
    });

    // Munculkan Advancement
    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        
        advancement.classList.add('show-adv');
        
        // Sembunyikan otomatis setelah 7 detik
        setTimeout(() => {
            advancement.classList.remove('show-adv');
        }, 7000);
    }, 500);
}

// --- 4. SISTEM LOOT BOX (HOTBAR) ---
function openLoot(title, text) {
    sfxClick.currentTime = 0;
    sfxClick.play();
    
    document.getElementById('loot-title').innerText = title;
    document.getElementById('loot-text').innerText = text;
    lootModal.style.display = 'flex';
}

function closeLoot() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    lootModal.style.display = 'none';
}

// --- 5. BIRTHDAY CHEST ALERT ---
function showGift() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    alert("🎁 [SERVER] A Special Chest has been spawned in the real world!\n\nCek kado kamu sekarang ya, Naura! ❤️");
}

// --- 6. SPLASH TEXT DINAMIS (Tambahan agar lebih hidup) ---
const splashQuotes = [
    "Happy Birthday, Naura!",
    "Naura Update v.19.0",
    "Level Up: 19!",
    "The Best Player!",
    "My Diamond Heart",
    "13 Januari Special!"
];

setInterval(() => {
    const splash = document.getElementById('splash');
    if(splash) {
        splash.innerText = splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
    }
}, 3000);