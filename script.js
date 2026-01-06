const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');

// Sistem Start
startOverlay.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    mainScreen.classList.add('show-content');
    
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("Audio play blocked"));
    
    sfxClick.currentTime = 0;
    sfxClick.play();
});

// Event Level Up
function mainEvent() {
    sfxClick.currentTime = 0;
    sfxClick.play();

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#ffff00', '#ff69b4']
    });

    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        document.getElementById('advancement').classList.add('show-adv');
    }, 300);

    setTimeout(() => {
        document.getElementById('advancement').classList.remove('show-adv');
    }, 8000);
}

function showGift() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    alert("🎁 [SERVER] A Special Gift has appeared! \nCek di bawah meja atau tempat favoritmu sekarang! ❤️");
}

// Splash Text
const quotes = ["Level Up!", "You are my Diamond!", "Happy Birthday!", "Nether and Back!"];
setInterval(() => {
    const splash = document.getElementById('splash');
    splash.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}, 3000);