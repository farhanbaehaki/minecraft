const bgm = document.getElementById('bgm');
const sfxClick = document.getElementById('sfx-click');
const sfxChallenge = document.getElementById('sfx-challenge');
const startOverlay = document.getElementById('start-overlay');
const mainScreen = document.querySelector('.minecraft-screen');

startOverlay.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    mainScreen.classList.add('show-content');
    bgm.volume = 0.3;
    bgm.play();
    sfxClick.play();
});

function mainEvent() {
    sfxClick.play();
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
        sfxChallenge.play();
        document.getElementById('advancement').classList.add('show-adv');
        setTimeout(() => document.getElementById('advancement').classList.remove('show-adv'), 7000);
    }, 500);
}

function openLoot(title, text) {
    sfxClick.play();
    document.getElementById('loot-title').innerText = title;
    document.getElementById('loot-text').innerText = text;
    document.getElementById('loot-modal').style.display = 'flex';
}

function closeLoot() {
    sfxClick.play();
    document.getElementById('loot-modal').style.display = 'none';
}

function showGift() {
    sfxClick.play();
    alert("🎁 Cek kado kamu sekarang di dunia nyata ya, Naura! ❤️");
}