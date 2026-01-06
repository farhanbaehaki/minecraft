// --- 1. INISIALISASI AUDIO ---
const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');

// Atur volume (0.0 sampai 1.0)
bgm.volume = 0.3;          // Haggstrom yang tenang
sfxClick.volume = 0.7;     // Suara klik yang mantap
sfxChallenge.volume = 1.0; // Challenge Complete harus megah!

// --- 2. SISTEM START (OVERLAY) ---
// Dibutuhkan karena browser melarang autoplay musik tanpa interaksi user
const startOverlay = document.getElementById('start-overlay');

startOverlay.addEventListener('click', () => {
    startOverlay.style.display = 'none'; // Sembunyikan layar start
    bgm.play();                          // Mulai putar Haggstrom
    
    // Putar suara klik pelan sebagai konfirmasi
    sfxClick.currentTime = 0;
    sfxClick.play();
});

// --- 3. EVENT UTAMA: LEVEL UP ---
function mainEvent() {
    // Putar suara klik standar
    sfxClick.currentTime = 0;
    sfxClick.play();

    // Trigger Kembang Api (Confetti)
    // Menembak dari kiri dan kanan bawah
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#00ff00', '#ffff00']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#00ff00', '#ffff00']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // Munculkan Advancement & Suara Challenge Complete
    setTimeout(() => {
        const adv = document.getElementById('advancement');
        adv.classList.add('show-adv');
        
        // Suara kemenangan Minecraft!
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
    }, 200);

    // Sembunyikan pop-up setelah 8 detik
    setTimeout(() => {
        document.getElementById('advancement').classList.remove('show-adv');
    }, 8000);
}

// --- 4. EVENT BUKA HADIAH ---
function showGift() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    
    // Kamu bisa mengganti alert ini dengan modal atau link baru
    alert("🎁 [SERVER] A Special Gift has appeared in your inventory! \nCek di bawah bantal atau meja kamu sekarang! ❤️");
}

// --- 5. DINAMIS SPLASH TEXT ---
const quotes = [
    "Happy Birthday, Sayang!",
    "Level Up: [Nama Pacar] v.24",
    "Haggstrom is playing...",
    "Most Beautiful Player!",
    "You got the Advancement!",
    "I love you to the Nether and back!",
    "Crafted with love by [Nama Kamu]"
];

const splashElement = document.getElementById('splash');

setInterval(() => {
    // Animasi kecil saat teks berubah
    splashElement.style.transform = "rotate(-20deg) scale(0)";
    
    setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        splashElement.innerText = randomQuote;
        splashElement.style.transform = "rotate(-20deg) scale(1)";
    }, 300);
}, 4000); // Ganti teks setiap 4 detik

// --- 6. EASTER EGG (CONSOLE) ---
console.log("%c[Minecraft Birthday Edition]", "color: #55FF55; font-size: 20px; font-weight: bold;");
console.log("%cStatus: In Love with Player 2", "color: #ffffff; background: #ff0000; padding: 2px 5px;");