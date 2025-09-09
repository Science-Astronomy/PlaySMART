const words = [
  "triangle",
  "circle",
  "parallel",
  "tangent",
  "polygon",
  "symmetry",
];

// Geometry questions
const questions = [
  {
    q: "Question: What is the sum of angles in a triangle?",
    choices: ["90°", "180°", "270°", "360°"],
    answer: "180°",
  },
  {
    q: "Question: A polygon with 8 sides is called?",
    choices: ["Hexagon", "Octagon", "Nonagon", "Decagon"],
    answer: "Octagon",
  },
  {
    q: "A line that touches a circle at exactly one point is called?",
    choices: ["Secant", "Chord", "Tangent", "Diameter"],
    answer: "Tangent",
  },
  {
    q: "What is the name of a triangle with all sides equal?",
    choices: ["Scalene", "Isosceles", "Equilateral", "Right"],
    answer: "Equilateral",
  },
  {
    q: "The longest side of a right triangle is called?",
    choices: ["Base", "Height", "Hypotenuse", "Median"],
    answer: "Hypotenuse",
  },
  {
    q: "What is the pythagorean theorem?",
    choices: [
      "a² + b² = c²",
      "M = ((x1 + x2)/2, (y1 + y2)/2)",
      "d=√((x_2-x_1)²+(y_2-y_1)²)",
    ],
    answer: "a² + b² = c²",
  },
  {
    q: "What is the midpoint formula?",
    choices: [
      "a² + b² = c²",
      "M = ((x1 + x2)/2, (y1 + y2)/2)",
      "d=√((x_2-x_1)²+(y_2-y_1)²)",
    ],
    answer: "M = ((x1 + x2)/2, (y1 + y2)/2)",
  },
  {
    q: "What is the distance formula?",
    choices: [
      "a² + b² = c²",
      "M = ((x1 + x2)/2, (y1 + y2)/2)",
      "d=√((x_2-x_1)²+(y_2-y_1)²)",
    ],
    answer: "d=√((x_2-x_1)²+(y_2-y_1)²)",
  },
];

let chosenWord, guessedWord, attempts, wrongGuesses;
let score = 0; // ✅ track score

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(chosenWord.length).fill("_");
  attempts = 6;
  wrongGuesses = [];

  document.getElementById("word").textContent = guessedWord.join(" ");
  document.getElementById("wrong").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("letters").innerHTML = "";
  document.getElementById("question-box").classList.add("hidden");
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = score; // ✅ update score display

  // create letter buttons a–z
  for (let i = 97; i <= 122; i++) {
    let btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.onclick = () => guessLetter(btn);
    document.getElementById("letters").appendChild(btn);
  }
}

function guessLetter(button) {
  let letter = button.textContent;
  button.disabled = true;

  if (chosenWord.includes(letter)) {
    chosenWord.split("").forEach((ch, i) => {
      if (ch === letter) guessedWord[i] = letter;
    });
  } else {
    attempts--;
    wrongGuesses.push(letter);
  }

  document.getElementById("word").textContent = guessedWord.join(" ");
  document.getElementById("wrong").textContent = wrongGuesses.join(", ");

  if (!guessedWord.includes("_")) {
    document.getElementById("message").textContent = "🎉 You Win!";
    score++; // ✅ +1 point for winning hangman
    document.getElementById("score").textContent = score;
    showQuestion();
  } else if (attempts === 0) {
    document.getElementById(
      "message"
    ).textContent = `💀 You Lose! The word was ${chosenWord}`;
    showQuestion();
  }
}

// ✅ Show a random geometry question
function showQuestion() {
  const qBox = document.getElementById("question-box");
  qBox.classList.remove("hidden");

  const randomQ = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").textContent = randomQ.q;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").textContent = "";

  // Shuffle choices
  let shuffled = [...randomQ.choices].sort(() => Math.random() - 0.5);

  shuffled.forEach((choice) => {
    let btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === randomQ.answer) {
        document.getElementById("feedback").textContent = "✅ Correct!";
        score++; // ✅ +1 point for correct question
      } else {
        document.getElementById(
          "feedback"
        ).textContent = `❌ Wrong! Correct: ${randomQ.answer}`;
      }
      document.getElementById("score").textContent = score;

      // disable all buttons after answer
      document
        .querySelectorAll("#choices button")
        .forEach((b) => (b.disabled = true));
    };
    document.getElementById("choices").appendChild(btn);
  });
}

startGame();
