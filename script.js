/* ===== 設定 ===== */
const answers = ["すたーと", "あすれちっくこーす", "きざいかくにん", "かぶしまい", "河岸県", "三原沙織"];
const images = [
  "q1.png",
  "q2.png",
  "q3.png",
  "q4.png",
  "q5.png",
  "q6.png"
];

const TOTAL_TIME = 20 * 60;

/* ===== 状態 ===== */
let current = 0;
let timeLeft = TOTAL_TIME;

/* ===== DOM ===== */
const timeBar = document.getElementById("timeBar");
const timeText = document.getElementById("timeText");
const log = document.getElementById("log");
const message = document.getElementById("message");
const img = document.getElementById("questionImage");
const errorScreen = document.getElementById("errorScreen");
const input = document.getElementById("answer");
const btn = document.getElementById("executeBtn");

/* ===== 初期表示 ===== */
showQuestion();
updateTimer();

/* ===== タイマー ===== */
setInterval(() => {
  timeLeft--;
  updateTimer();

  if (timeLeft > 0 && timeLeft % 60 === 0 && navigator.vibrate) {
    navigator.vibrate([100, 50, 200]);
  }
}, 1000);

function updateTimer() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  timeText.textContent = `${min}:${sec}`;
  timeBar.style.width = `${(timeLeft / TOTAL_TIME) * 100}%`;

  if (timeLeft <= 0) {
    triggerError();
  }
}

/* ===== 問題表示 ===== */
function showQuestion() {
  img.src = images[current];
  log.textContent = `問題：画像の問題を解け。`;
  message.textContent = "";
  message.className = "message";
}

/* ===== 回答 ===== */
btn.addEventListener("click", submitAnswer);

function submitAnswer() {
  const val = input.value.trim();
  input.value = "";

  if (!val) return;

  if (val === answers[current]) {
    message.textContent = "✔ 正解";
    message.className = "message correct";
    current++;

    if (current >= answers.length) {
      log.textContent = "全問正解。スタッフであると認証されました。［LINEに【とっぱ】と送信してください。］";
      img.style.display = "none";
      return;
    }

    showQuestion();
  } else {
    timeLeft -= 60;
    message.textContent = "✖ 不正解（制限時間 -1分）";
    message.className = "message wrong";
    updateTimer();
  }
}

/* ===== エラー ===== */
function triggerError() {
  errorScreen.style.display = "block";
}