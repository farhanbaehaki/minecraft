/* --- CONFIGURATION --- */
let hitCount = 10;
let isPlaying = false;
const bgm = document.getElementById('bgm');

/* --- 1. LOGIN & TRANSITION --- */
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    const trans = document.getElementById('world-transition');
    
    // Gunakan password "bubsieee"
    if (input.toLowerCase() === "bubsieee") {
        playSound('sound-levelup');
        trans.style.opacity = '1'; // Fade ke hitam
        
        setTimeout(() => {
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            
            setTimeout(() => {
                trans.style.opacity = '0'; // Kembali dari hitam
            }, 600);
        }, 500);
    } else {
        playSound('sound-click');
        errorMsg.innerText = "ACCESS DENIED!";
        // Efek shake pada card login
        document.querySelector('.mc-card').classList.add('shake-hit');
        setTimeout(() => document.querySelector('.mc-card').classList.remove('shake-hit'), 200);
    }
}

/* --- 2. SHULKER MECHANIC --- */
function hitShulker() {
    if (hitCount <= 0) return;

    const box = document.getElementById('shulker-box');
    const counter = document.getElementById('hit-counter');
    const reward = document.getElementById('reward-display');
    const instruction = document.getElementById('instruction');

    playSound('sound-pop');
    
    // Animasi Guncang
    box.classList.add('shake-hit');
    setTimeout(() => box.classList.remove('shake-hit'), 200);

    hitCount--;
    counter.innerText = hitCount;

    if (hitCount === 0) {
        playSound('sound-levelup');
        // Sembunyikan elemen Shulker
        document.getElementById('shulker-container').style.display = 'none';
        instruction.style.display = 'none';
        
        // Tampilkan Hadiah
        reward.classList.remove('hidden');
        triggerAchievement();
    }
}

/* --- 3. UTILITIES --- */
function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (!isPlaying) {
        bgm.volume = 0.4;
        bgm.play();
        btn.innerText = "Music: ON";
    } else {
        bgm.pause();
        btn.innerText = "Music: OFF";
    }
    isPlaying = !isPlaying;
    playSound('sound-click');
}

function triggerAchievement() {
    const toast = document.getElementById('achievement');
    toast.classList.remove('hidden-toast');
    setTimeout(() => {
        toast.classList.add('hidden-toast');
    }, 5000);
}

/* --- 4. INITIAL LOAD --- */
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2500);
});

// Shortcut Enter Key untuk Login
document.getElementById('passwordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});