/* --- MINECRAFT HD - CORE SCRIPT --- */

let typingTimer;
let isPlaying = false;
const bgm = document.getElementById('bgm');

// 1. SHADERS: Background Bergerak (Parallax)
const moveBackground = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Sensitivitas pergerakan (5%)
    const x = (clientX / window.innerWidth) * 5;
    const y = (clientY / window.innerHeight) * 5;
    
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
};

document.addEventListener('mousemove', moveBackground);
document.addEventListener('touchmove', moveBackground);

// 2. SOUND HANDLER
function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0; // Reset suara ke awal jika diklik cepat
        sound.play().catch(() => {
            /* Mencegah error autplay browser */
        });
    }
}

// 3. MUSIC TOGGLE
function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!bgm) return;

    bgm.volume = 0.3;
    if (!isPlaying) {
        bgm.play().catch(() => console.log("Musik butuh interaksi user pertama kali"));
        musicBtn.innerText = "Music: ON";
        musicBtn.style.backgroundColor = "#55FF55"; // Beri warna hijau jika ON
    } else {
        bgm.pause();
        musicBtn.innerText = "Music: OFF";
        musicBtn.style.backgroundColor = "#aaaaaa";
    }
    isPlaying = !isPlaying;
    playSound('sound-click');
}

// 4. PASSWORD LOGIC
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const loginPage = document.getElementById('login-page');
    const mainContent = document.getElementById('main-content');
    const transition = document.getElementById('world-transition');
    const errorMsg = document.getElementById('errorMessage');

    if (input.toLowerCase() === "bubsieee") {
        playSound('sound-levelup');
        
        // Mulai Efek Loading World
        transition.style.opacity = '1';
        
        setTimeout(() => {
            loginPage.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Simulasi "Generating World" sebentar
            setTimeout(() => {
                transition.style.opacity = '0';
                triggerAchievement();
                
                // Tambahkan efek guncangan sedikit saat masuk
                mainContent.classList.add('fadeIn');
            }, 600);
        }, 500);

    } else {
        // Efek Gagal yang lebih keras
        playSound('sound-click');
        document.querySelector('.hd-card').classList.add('shake');
        errorMsg.innerText = "ACCESS DENIED!";
        errorMsg.style.color = "#FF5555";
        
        setTimeout(() => {
            document.querySelector('.hd-card').classList.remove('shake');
        }, 400);
    }
}

// Tambahan: Fitur tekan Enter untuk Login
document.getElementById('passwordInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

// 5. ACHIEVEMENT NOTIFICATION
function triggerAchievement() {
    const toast = document.getElementById('achievement');
    if (!toast) return;

    toast.classList.remove('hidden-toast');
    
    setTimeout(() => {
        toast.classList.add('hidden-toast');
    }, 5000);
}

// 6. INVENTORY INTERACTION (Typewriter Effect)
function showMC(item) {
    clearTimeout(typingTimer);
    playSound('sound-pop');
    
    const dialog = document.getElementById('mc-dialog');
    const text = document.getElementById('mc-text');
    
    if (!dialog || !text) return;

    dialog.classList.remove('hidden');
    text.innerHTML = "";

    const messages = {
        fakta: "> [SYSTEM]: Analisis selesai. Kamu adalah player terpenting di server hatiku. No lag, just pure connection.",
        signal: "> [SIGNAL]: Redstone aktif! Kalau aku AFK di dunia nyata, koordinatku tetap tertuju padamu di dunia digital.",
        mood: "> [HEAL]: Menggunakan Golden Apple HD... Inget, kamu berharga dan jangan biarkan 'creeper' masalah merusak harimu.",
        gift: "> [ACHIEVEMENT]: DIAMOND DITEMUKAN! Hadiah: Voucher Makan Bareng. Screenshot layar ini untuk klaim!"
    };

    const msg = messages[item] || "";
    let i = 0;

    function type() {
        if (i < msg.length) {
            text.innerHTML += msg.charAt(i);
            i++;
            typingTimer = setTimeout(type, 30); // Dipercepat sedikit agar lebih smooth (30ms)
        }
    }
    type();
}

function closeMC() {
    clearTimeout(typingTimer);
    playSound('sound-click');
    const dialog = document.getElementById('mc-dialog');
    if (dialog) dialog.classList.add('hidden');
}

// 7. INITIAL LOADING SCREEN
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2500); // Durasi loading screen
});

// 8. GLOBAL CLICK SOUND
document.addEventListener('click', (e) => {
    // Memainkan suara klik jika klik di area kosong
    if (e.target.tagName === 'BODY' || e.target.id === 'login-page') {
        playSound('sound-click');
    }
});