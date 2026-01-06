// --- 1. REFERENSI ELEMEN ---
const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');
const lootModal = document.getElementById('loot-modal');

// --- 2. MEKANIK START OVERLAY ---
// Menangani klik pertama untuk memulai musik dan masuk ke menu
startOverlay.addEventListener('click', () => {
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        mainScreen.classList.add('show-content');
    }, 500);

    // Menjalankan Audio
    bgm.volume = 0.3;
    bgm.play().catch(err => console.log("Audio play dipending: ", err));
    sfxClick.play();
});

// --- 3. MEKANIK LEVEL UP (TOMBOL UTAMA) ---
function mainEvent() {
    sfxClick.currentTime = 0;
    sfxClick.play();

    // Efek Kembang Api (Confetti)
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);

    // Munculkan Notifikasi Advancement
    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        const adv = document.getElementById('advancement');
        adv.classList.add('show-adv');
        
        // Sembunyikan setelah 7 detik
        setTimeout(() => {
            adv.classList.remove('show-adv');
        }, 7000);
    }, 500);
}

// --- 4. MEKANIK INVENTORY & LOOT SYSTEM ---
function openLoot(title, message) {
    sfxClick.currentTime = 0;
    sfxClick.play();

    // Isi konten modal
    document.getElementById('loot-title').innerText = title;
    document.getElementById('loot-text').innerText = message;

    // Tampilkan Modal
    lootModal.style.display = 'flex';
}

function closeLoot() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    lootModal.style.display = 'none';
}

// --- 5. MEKANIK CHEST ALERT ---
function showGift() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    alert("🎁 [SERVER] A Special Chest has been spawned in the real world!\nCek kado kamu sekarang ya, Naura! ❤️");
}

// --- 6. MEKANIK DYNAMIC SPLASH TEXT ---
const quotes = [
    "Happy Birthday, Naura!",
    "Naura Update v.19.0",
    "13 Januari Special!",
    "You are my Diamond!",
    "I love you, Naura!",
    "Level Up: 19!"
];

setInterval(() => {
    const splash = document.getElementById('splash');
    if (splash) {
        splash.style.transform = "rotate(-20deg) scale(0)";
        setTimeout(() => {
            splash.innerText = quotes[Math.floor(Math.random() * quotes.length)];
            splash.style.transform = "rotate(-20deg) scale(1)";
        }, 200);
    }
}, 3000);