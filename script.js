// --- 1. INISIALISASI ELEMEN ---
const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');
const advancement = document.getElementById('advancement');
const lootModal = document.getElementById('loot-modal');

// --- 2. LOGIKA START GAME (DENGAN LOADING SCREEN) ---
startOverlay.addEventListener('click', () => {
    sfxClick.currentTime = 0;
    sfxClick.play();

    // Sembunyikan Overlay, Tampilkan Loading
    startOverlay.style.display = 'none';
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    loadingScreen.style.display = 'flex';

    let width = 0;
    const phrases = ["Building Terrain...", "Loading Resources...", "Preparing Birthday Cake...", "Spawning Naura..."];

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Masuk ke Menu Utama
            loadingScreen.style.display = 'none';
            mainScreen.classList.add('show-content');
            bgm.volume = 0.3;
            bgm.play().catch(e => console.log("Audio play diblokir browser"));
        } else {
            width += Math.random() * 15; // Kecepatan loading acak
            if (width > 100) width = 100;
            loadingBar.style.width = width + '%';

            // Ganti teks loading secara dinamis
            if (width > 25) loadingText.innerText = phrases[1];
            if (width > 60) loadingText.innerText = phrases[2];
            if (width > 85) loadingText.innerText = phrases[3];
        }
    }, 200);
});

// --- 3. EVENT UTAMA (ENTER NEW AGE / LEVEL UP) ---
function mainEvent() {
    sfxClick.currentTime = 0;
    sfxClick.play();

    // Efek Kembang Api Beruntun (Level Up Style)
    var duration = 4 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            zIndex: 11000
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            zIndex: 11000
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Munculkan Advancement
    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        advancement.classList.add('show-adv');
        setTimeout(() => advancement.classList.remove('show-adv'), 7000);
    }, 500);
}

// --- 4. SISTEM LOOT BOX (KOTAK PESAN) ---
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

// --- 5. QUEST: TIUP LILIN (CAKE) ---
function eatCake() {
    sfxClick.currentTime = 0;
    sfxClick.play();

    confetti({
        particleCount: 150,
        startVelocity: 30,
        spread: 360,
        origin: { x: 0.5, y: 0.7 },
        zIndex: 11000
    });

    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        openLoot('🎂 Make a Wish!', 'Fyuuuuhhh... Lilin level 18 sudah padam!\n\nSekarang kamu resmi masuk ke Level 19. Semoga semua keinginanmu di-crafting jadi nyata ya! ❤️');
    }, 300);
}

// --- 6. QUEST: BIRTHDAY CHEST (PASSCODE) ---
function showGift() {
    sfxClick.currentTime = 0;
    sfxClick.play();

    let passcode = prompt("🔐 [QUEST] Masukkan 4 digit Passcode untuk membuka Birthday Chest:\n(Hint: Tanggal lahirmu DDMM)");

    if (passcode === "1301") {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        confetti({
            particleCount: 250,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            zIndex: 11000
        });

        openLoot('🎁 LOOT UNLOCKED!',
            'Selamat Naura! Kamu berhasil menyelesaikan quest.\n\n' +
            'Isi Chest: \n' +
            '1. Voucher Makan Malam Berdua 🍽️\n' +
            '2. Surat Cinta Digital: "Kamu adalah update terbaik dalam hidupku."\n\n' +
            'Cek hadiah fisikmu di tempat biasa ya! ❤️'
        );
    } else if (passcode !== null) {
        alert("❌ Passcode Salah! Peti tetap terkunci.");
    }
}

// --- 7. SPLASH TEXT DINAMIS ---
const splashQuotes = ["Happy Birthday, Naura!", "Level 19 Unlocked!", "Most Beautiful Player!", "New Quest Available!"];
setInterval(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.innerText = splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
}, 3000);