// ======================
// DATA PERMAINAN
// ======================

let score = 0;
let life = 3;
let time = 60;
let timer;

let playerName = "";

// 20 item sampah (kartun / simbol)
const trashItems = [
    {name:"Surat Khabar", type:"paper", img:"images/surat-khabar.png"},
    {name:"Kotak", type:"paper", img:"images/kotak.png"},
    {name:"Majalah", type:"paper", img:"images/majalah.png"},

    {name:"Botol Plastik", type:"plastic", img:"images/botol-plastik.png"},
    {name:"Bekas Plastik", type:"plastic", img:"images/bekas-plastik.png"},
    {name:"Penyedut Minuman", type:"plastic", img:"images/straw.png"},

    {name:"Botol Kaca", type:"glass", img:"images/botol-kaca.png"},
    {name:"Balang Kaca", type:"glass", img:"images/balang-kaca.png"},

    {name:"Tin Minuman", type:"metal", img:"images/tin-minuman.png"},
    {name:"Tin Makanan", type:"metal", img:"images/tin-makanan.png"},

    {name:"Kulit Pisang", type:"general", img:"images/kulit-pisang.png"},
    {name:"Sisa Makanan", type:"general", img:"images/sisa-makanan.png"}
];

// ======================
// START GAME
// ======================

document.getElementById("startBtn").onclick = function(){

    playerName = document.getElementById("playerName").value;

    if(playerName === ""){
        alert("Sila masukkan nama!");
        return;
    }

    document.getElementById("displayName").innerText = playerName;

    showScreen("gameScreen");

    generateTrash();

    startTimer();
};

// ======================
// TUKAR SKRIN
// ======================

function showScreen(id){

    document.querySelectorAll("section").forEach(sec=>{
        sec.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
}

// ======================
// JANA SAMPAH
// ======================

function generateTrash(){

    let container = document.getElementById("trashContainer");
    container.innerHTML = "";

    let shuffled = trashItems.sort(()=>Math.random()-0.5);

    shuffled.forEach(item=>{

        let div = document.createElement("div");
        div.classList.add("trash");
        div.setAttribute("draggable", true);
        div.dataset.type = item.type;

        div.innerHTML = `
            <img src="${item.img}">
            <p>${item.name}</p>
        `;

        // drag event
        div.addEventListener("dragstart", dragStart);

        container.appendChild(div);
    });
}

// ======================
// DRAG START
// ======================

let draggedItem = null;

function dragStart(e){
    draggedItem = e.target.closest(".trash");
}

// ======================
// DROP SYSTEM
// ======================

document.querySelectorAll(".bin").forEach(bin=>{

    bin.addEventListener("dragover", e=>{
        e.preventDefault();
    });

    bin.addEventListener("drop", function(){

        let correctType = this.dataset.type;

        if(!draggedItem) return;

        if(draggedItem.dataset.type === correctType){

            score += 5;
            document.getElementById("score").innerText = score;

            playSound("correct");

            draggedItem.remove();

        } else {

            life--;
            document.getElementById("life").innerText = life;

            playSound("wrong");

            if(life <= 0){
                endGame();
            }
        }

        checkWin();
    });
});

// ======================
// TIMER
// ======================

function startTimer(){

    timer = setInterval(()=>{

        time--;
        document.getElementById("timer").innerText = time;

        if(time <= 0){
            endGame();
        }

    },1000);
}

// ======================
// SOUND
// ======================

function playSound(type){

    let sound;

    if(type === "correct"){
        sound = document.getElementById("correctSound");
    } else {
        sound = document.getElementById("wrongSound");
    }

    sound.currentTime = 0;
    sound.play();
}

// ======================
// CHECK MENANG
// ======================

function checkWin(){

    let remaining = document.querySelectorAll(".trash").length;

    if(remaining === 0){
        endGame();
    }
}

// ======================
// TAMAT PERMAINAN
// ======================

function endGame(){

    clearInterval(timer);

    document.getElementById("finalPlayer").innerText = playerName;
    document.getElementById("finalScore").innerText = score;

    saveLeaderboard(playerName, score);

    showScreen("finishScreen");
}

// ======================
// MAIN SEMULA
// ======================

document.getElementById("playAgainBtn").onclick = function(){
    location.reload();
};

// ======================
// SIJIL
// ======================

document.getElementById("certificateBtn").onclick = function(){

    localStorage.setItem("name", playerName);
    localStorage.setItem("score", score);

    window.open("certificate.html");
};
