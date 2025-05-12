
// لعبة ثعبان بسيطة مع عناصر طبية - نسخة تمهيدية بلغة JavaScript (HTML + Canvas)
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = randomPosition();
let score = 0;

const box = 20;

const infoMessages = [
  "🧤 لبس القفازات لا يغني عن غسل اليدين قبل وبعد رعاية المريض.",
  "🧼 غسل اليدين من أهم خطوات منع العدوى.",
  "🩺 افحص العلامات الحيوية بانتظام ودوّنها بدقة.",
  "💉 تأكد من نوع الدواء والجرعة قبل كل حقن.",
  "📋 تحقّق من اسم المريض وتاريخه الطبي قبل تقديم أي خدمة."
];

const quizQuestions = [
  {
    question: "ما هي المدة القصوى لتركيب القسطرة البولية دون تغيير؟",
    options: ["3 أيام", "7 أيام", "14 يومًا"],
    answer: "7 أيام"
  },
  {
    question: "هل يجب فحص هوية المريض قبل إعطاء الدواء؟",
    options: ["نعم", "لا"],
    answer: "نعم"
  },
  {
    question: "عند التعامل مع مريض مصاب بعدوى، ما هو أول إجراء؟",
    options: ["إعطاؤه الأدوية", "غسل اليدين ولبس الواقيات", "توثيق حالته"],
    answer: "غسل اليدين ولبس الواقيات"
  }
];

const errorMessages = [
  "⚠️ أعطيت دواءً بدون التأكد من الاسم – أعد المحاولة!",
  "⚠️ غفلت عن غسل يديك – العدوى ممكنة!",
  "⚠️ أهملت توثيق العلامات الحيوية – المعلومات ناقصة!",
  "⚠️ جرعة خاطئة! تأكد من الوصفة جيدًا."
];

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function randomPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((s, index) => {
    ctx.fillStyle = index === 0 ? "green" : "lightgreen";
    ctx.fillRect(s.x, s.y, box, box);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some((s, i) => i !== 0 && s.x === head.x && s.y === head.y)
  ) {
    alert(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
    document.location.reload();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomPosition();

    if (score % 3 === 0) {
      const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
      const userAnswer = prompt(`${q.question}\n${q.options.join(" | ")}`);
      if (userAnswer !== q.answer) {
        alert("إجابة خاطئة! أعد المحاولة.");
        document.location.reload();
      }
    } else {
      alert(infoMessages[Math.floor(Math.random() * infoMessages.length)]);
    }
  } else {
    snake.pop();
  }

  ctx.fillStyle = "black";
  ctx.fillText("النقاط: " + score, 10, 390);
}

setInterval(draw, 200);
