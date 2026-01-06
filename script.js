const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');

// Klik awal untuk masuk
startOverlay.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    mainScreen.classList.add('show-content');
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("Audio blocked"));
    sfxClick.play();
});

// Efek Tombol Update (Level Up)
function mainEvent() {
    sfxClick.play();
    confetti({
        particleCount: 150, spread: 70, origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#ffff00', '#ff69b4']
    });

    setTimeout(() => {
        sfxChallenge.play();
        document.getElementById('advancement').classList.add('show-adv');
    }, 300);

    setTimeout(() => {
        document.getElementById('advancement').classList.remove('show-adv');
    }, 7000);
}

function showGift() {
    sfxClick.play();
    alert("🎁 [SERVER] A gift for Naura has been spawned! \nCek di dunia nyata sekarang ya! ❤️");
}

// Splash Text Naura
const quotes = [
    "Happy Birthday, Naura!",
    "Naura Update v.19.0",
    "13 Januari Special!",
    "Naura is the best player!",
    "I love you, Naura!",
    "Crafted for Naura"
];

setInterval(() => {
    const splash = document.getElementById('splash');
    splash.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}, 3000);

function openLoot(title, message) {
    sfxClick.play();
    document.getElementById('loot-title').innerText = title;
    document.getElementById('loot-text').innerText = message;
    document.getElementById('loot-modal').style.display = 'flex';
}

function closeLoot() {
    sfxClick.play();
    document.getElementById('loot-modal').style.display = 'none';
    
    // Advancement khusus saat dia baca semua pesan!
    showAdvancement("Loot Found!", "Advancement Made: Falling in Love!");
}

function showAdvancement(title, desc) {
    const adv = document.getElementById('advancement');
    document.querySelector('.adv-title').innerText = title;
    document.getElementById('adv-desc-text').innerText = desc;
    
    sfxChallenge.play();
    adv.classList.add('show-adv');
    setTimeout(() => adv.classList.remove('show-adv'), 7000);
}