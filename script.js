let currentHP = 20;
let isPlaying = false;
const bgm = document.getElementById('bgm');

// Sound Function
function playSound(id) {
    const s = document.getElementById(id);
    if(s) { s.currentTime = 0; s.play().catch(()=>{}); }
}

// Password & World Transition
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const trans = document.getElementById('world-transition');
    
    if(input.toLowerCase() === "bubsieee") {
        playSound('sound-levelup');
        trans.style.opacity = '1';
        
        setTimeout(() => {
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            setTimeout(() => {
                trans.style.opacity = '0';
                triggerAchievement();
            }, 600);
        }, 500);
    } else {
        playSound('sound-click');
        document.getElementById('errorMessage').innerText = "Wrong Key!";
    }
}

// Quest Interaction
function interact(type) {
    const hpFill = document.getElementById('hp-fill');
    const text = document.getElementById('mc-text');
    playSound('sound-pop');

    if (type === 'healing') {
        currentHP += 25;
        text.innerText = "> [HEAL]: Kamu memakan Golden Apple. Mood Naura naik pesat!";
    } else if (type === 'talk') {
        currentHP += 15;
        text.innerText = "> [CHAT]: Farhan bilang dia sayang kamu. Hatimu menghangat.";
    } else if (type === 'gift') {
        if (currentHP >= 100) {
            text.innerText = "> [REWARD]: DIAMOND UNLOCKED! Cek tas kamu di dunia nyata (atau traktir makan!)";
            playSound('sound-levelup');
        } else {
            text.innerText = "> [LOCKED]: Mood belum 100%! Lakukan lebih banyak interaksi.";
        }
    }

    if (currentHP > 100) currentHP = 100;
    hpFill.style.width = currentHP + "%";
}

// Utils
function toggleMusic() {
    if (!isPlaying) { bgm.play(); document.getElementById('musicBtn').innerText = "Music: ON"; }
    else { bgm.pause(); document.getElementById('musicBtn').innerText = "Music: OFF"; }
    isPlaying = !isPlaying;
}

function triggerAchievement() {
    const t = document.getElementById('achievement');
    t.classList.remove('hidden-toast');
    setTimeout(() => t.classList.add('hidden-toast'), 5000);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('loading-screen').style.display = 'none', 800);
    }, 2500);
});

let hitCount = 10;

function hitShulker() {
    if (hitCount <= 0) return;

    const box = document.getElementById('shulker-box');
    const counter = document.getElementById('hit-counter');
    const reward = document.getElementById('reward-display');
    const instruction = document.getElementById('instruction');

    // Suara saat dipukul
    playSound('sound-pop');
    
    // Efek guncang
    box.classList.add('shake-hit');
    setTimeout(() => box.classList.remove('shake-hit'), 200);

    hitCount--;
    counter.innerText = hitCount;

    // Saat hitungan habis
    if (hitCount === 0) {
        playSound('sound-levelup');
        box.style.display = 'none';
        counter.style.display = 'none';
        instruction.style.display = 'none';
        reward.classList.remove('hidden');
        triggerAchievement();
    }
}