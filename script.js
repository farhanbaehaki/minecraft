function triggerAdvancement() {
    const adv = document.getElementById('advancement');
    
    // Suara Level Up (Opsional)
    // let audio = new Audio('levelup.mp3');
    // audio.play();

    adv.classList.add('show-adv');

    // Hilang setelah 5 detik
    setTimeout(() => {
        adv.classList.remove('show-adv');
    }, 5000);
}

function showGift() {
    alert("Cek di bawah kasur/meja kamu! Ada Real-Life Loot Chest di sana! 🎁");
}

// Efek Splash Text Berubah-ubah
const quotes = [
    "You are my Diamond!",
    "Level Up!",
    "Crafted with Love",
    "Best Player 2",
    "Don't dig straight down!"
];

setInterval(() => {
    const splash = document.getElementById('splash');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    splash.innerText = randomQuote;
}, 3000);