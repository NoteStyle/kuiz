// ambil data dari game
let name = localStorage.getItem("name");
let score = localStorage.getItem("score");

// paparkan pada sijil
document.getElementById("name").innerText = name;
document.getElementById("score").innerText = score;

// tarikh hari ini
let today = new Date();
document.getElementById("date").innerText =
"Tarikh: " + today.toLocaleDateString();
