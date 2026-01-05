let typingTimer;
let isPlaying = false;
const bgm = document.getElementById('bgm');

// 1. Shaders: Background bergerak mengikuti mouse (PC) & Touch (Mobile)
const moveBackground = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX / window.innerWidth) * 5;
    const y = (clientY / window.innerHeight) * 5;
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
};

document.addEventListener('mousemove', moveBackground);
document.addEventListener('touchmove', moveBackground);

// 2. Sound Handler
function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Catch mencegah error browser jika user belum interaksi
    }
}

// 3. Music Toggle
function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    bgm.volume = 0.3;
    if (!isPlaying) {
        bgm.play().catch(e => console.log("Musik butuh interaksi user"));
        musicBtn.innerText = "Music: ON";
    } else {
        bgm.pause();
        musicBtn.innerText = "Music: OFF";
    }
    isPlaying = !isPlaying;
    playSound('sound-click');
}

// 4. Password Logic & Achievement Trigger
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    
    if (input.toLowerCase() === "bubsieee") {
        playSound('sound-levelup');
        
        // Efek transisi login
        document.getElementById('login-page').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            
            // Munculkan Achievement setelah masuk ke inventory
            triggerAchievement();
        }, 500);
    } else {
        playSound('sound-click');
        document.body.classList.add('shake');
        errorMsg.innerText = "Wrong Password!";
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 400);
    }
}

// 5. Achievement Notification Logic
function triggerAchievement() {
    const toast = document.getElementById('achievement');
    toast.classList.remove('hidden-toast');
    
    // Hilangkan otomatis setelah 5 detik
    setTimeout(() => {
        toast.classList.add('hidden-toast');
    }, 5000);
}

// 6. Inventory Interaction (Typewriter Effect)
function showMC(item) {
    clearTimeout(typingTimer);
    playSound('sound-pop');
    const dialog = document.getElementById('mc-dialog');
    const text = document.getElementById('mc-text');
    
    dialog.classList.remove('hidden');
    text.innerHTML = "";

    const messages = {
        fakta: "> [SYSTEM]: Analisis selesai. Kamu adalah player terpenting di server hatiku. No lag, just pure connection.",
        signal: "> [SIGNAL]: Redstone aktif! Kalau aku AFK di dunia nyata, koordinatku tetap tertuju padamu di dunia digital.",
        mood: "> [HEAL]: Menggunakan Golden Apple HD... Inget, kamu berharga dan jangan biarkan 'creeper' masalah merusak harimu.",
        gift: "> [ACHIEVEMENT]: DIAMOND DITEMUKAN! Hadiah: Voucher Makan Bareng. Screenshot layar ini untuk klaim!"
    };

    let i = 0;
    const msg = messages[item];
    function type() {
        if (i < msg.length) {
            text.innerHTML += msg.charAt(i);
            i++;
            typingTimer = setTimeout(type, 50);
        }
    }
    type();
}

function closeMC() {
    clearTimeout(typingTimer);
    playSound('sound-click');
    document.getElementById('mc-dialog').classList.add('hidden');
}

// 7. Initial Loading Screen Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2500);
});

// 8. Global Click Sound
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BODY' || e.target.id === 'login-page') {
        playSound('sound-click');
    }
});