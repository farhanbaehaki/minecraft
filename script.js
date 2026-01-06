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
    // Transisi overlay menghilang
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        mainScreen.classList.add('show-content');
    }, 500);

    // Play BGM (Volume pelan agar estetik)
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("Audio play diblokir browser, menunggu interaksi lanjut."));
    
    // SFX Klik pertama
    sfxClick.currentTime = 0;
    sfxClick.play();
});

// --- 3. EVENT UTAMA (ENTER NEW AGE) ---
function mainEvent() {
    sfxClick.currentTime = 0; 
    sfxClick.play();

    // Efek Kembang Api Meriah
    confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 },
        zIndex: 11000 
    });

    // Munculkan Notifikasi Advancement Made
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

// --- 4. SISTEM LOOT BOX & MODAL ---
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

// --- 5. QUEST: TIUP LILIN (EAT CAKE) ---
function eatCake() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    
    // Ledakan kembang api melingkar
    confetti({
        particleCount: 100,
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

    if (passcode === "1301") { // Tanggal lahir Naura
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        
        confetti({ 
            particleCount: 250, 
            spread: 100, 
            origin: { y: 0.5 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
            zIndex: 11000
        });
        
        openLoot('🎁 LOOT UNLOCKED!', 
            'Selamat Naura! Kamu berhasil menyelesaikan quest.\n\n' +
            'Isi Chest: \n' +
            '1. Voucher Makan Malam Berdua 🍽️\n' +
            '2. Surat Cinta Digital: "Kamu adalah update terbaik dalam hidupku."\n\n' +
            'Cek hadiah fisikmu di [Sebutkan Lokasi] ya! ❤️'
        );
    } else if (passcode !== null) {
        alert("❌ Passcode Salah! Peti tetap terkunci. Coba lagi!");
    }
}

// --- 7. SPLASH TEXT DINAMIS ---
const splashQuotes = [
    "Happy Birthday, Naura!",
    "Level 19 Unlocked!",
    "Most Beautiful Player!",
    "The Best Update Ever!",
    "13 Januari Special!",
    "New Quest Available!"
];

setInterval(() => {
    const splash = document.getElementById('splash');
    if(splash) {
        splash.innerText = splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
    }
}, 3000);