const sfxClick = document.getElementById("sfx-click");
const sfxChallenge = document.getElementById("sfx-challenge");
const bgm = document.getElementById("bgm");

// 1. Loading & Start Logic
document.getElementById("start-overlay").addEventListener("click", function () {
    // Reset audio agar bisa diputar di HP tanpa delay
    sfxClick.currentTime = 0;
    sfxClick.play().catch(e => console.log("Audio play deferred"));
    
    this.style.display = "none";
    const ls = document.querySelector(".dirt-bg");
    ls.style.display = "flex";

    let w = 0;
    const t = document.getElementById("loading-text");
    const b = document.getElementById("loading-bar");

    const iv = setInterval(() => {
        w += Math.random() * 12; // Sedikit dipercepat agar feel-nya pas
        if (w >= 100) {
            w = 100;
            clearInterval(iv);
            ls.style.display = "none";
            document.querySelector(".minecraft-screen").classList.add("show-content");
            
            // Fade-in suara musik
            bgm.volume = 0;
            bgm.play().catch(e => console.log("BGM blocked by browser"));
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 0.3) {
                    vol += 0.05;
                    bgm.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
            
            triggerInitialChat();
        }
        b.style.width = w + "%";
        if (w > 30 && w < 70) t.innerText = "Loading Resources...";
        if (w > 70) t.innerText = "Spawning Naura...";
    }, 150);
});

// 2. Chat System dengan Auto-Scroll
function sendChat(msg) {
    const box = document.getElementById("chat-box");
    if (!box) return;
    
    const div = document.createElement("div");
    div.className = "chat-msg";
    div.innerHTML = msg;
    box.appendChild(div);
    
    // Memastikan chat terbaru selalu terlihat (scroll ke bawah)
    box.scrollTop = box.scrollHeight;
    
    // Pesan hilang setelah 8 detik
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 1000);
    }, 8000);
}

function triggerInitialChat() {
    setTimeout(() => sendChat('<span style="color:#AAA">[System] Kamu joined the game</span>'), 1500);
    setTimeout(() => sendChat('<span style="color:#AAA">[System] Memberi Naura 1000 Roses</span>'), 3500);
    setTimeout(() => sendChat("<span>&lt;Kamu&gt;</span> Selamat ulang tahun, Sayang! ❤️"), 5500);
}

// 3. Quest & Events
function mainEvent() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, zIndex: 11000 });
    
    const adv = document.getElementById("advancement");
    sfxChallenge.currentTime = 0;
    sfxChallenge.play();
    adv.classList.add("show-adv");
    setTimeout(() => adv.classList.remove("show-adv"), 6000);
}

function eatCake() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.7 },
        colors: ['#FFC0CB', '#FF0000', '#FFFFFF'],
        zIndex: 11000 
    });
    
    setTimeout(() => {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        openLoot(
            "🎂 Level Up!",
            "Fyuuuhhh... Lilin level 18 sudah padam. \n\nSelamat datang di Level 19, Naura! Semoga duniamu selalu penuh dengan Diamond dan kebahagiaan. ❤️"
        );
    }, 500);
}

function showGift() {
    let p = prompt("🔐 Passcode (Tanggal Lahir DDMM):");
    if (p === "1301") {
        sfxChallenge.currentTime = 0;
        sfxChallenge.play();
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 }, zIndex: 11000 });
        openLoot(
            "🎁 Birthday Loot",
            "Quest Selesai! Kamu mendapatkan:\n1. Unlimited Love ❤️\n2. Rare Hug 🫂\n3. Voucher Dinner! 🍽️"
        );
    } else if (p !== null) {
        alert("❌ Passcode Salah!");
    }
}

function openLoot(title, text) {
    document.getElementById("loot-title").innerText = title;
    document.getElementById("loot-text").innerText = text;
    document.getElementById("loot-modal").style.display = "flex";
}

function closeLoot() {
    sfxClick.currentTime = 0;
    sfxClick.play();
    document.getElementById("loot-modal").style.display = "none";
}