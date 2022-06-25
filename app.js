const start = document.querySelector(".start");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const allAnswerChoices = document.querySelectorAll(".choice");
const answerChoiceA = document.querySelector("#A");
const answerChoiceB = document.querySelector("#B");
const answerChoiceC = document.querySelector("#C");
const answerChoiceD = document.querySelector("#D");
const counter = document.querySelector(".counter");
const timeGauge = document.querySelector(".time-gauge");
const progressContainer = document.querySelector(".progress-container");
const ScoreContainer = document.querySelector(".score-container");

// Questions
let questions = [
  {
    question: "Project managers spend what percentage of their time communicating?",
    questionImg: "img/1.jpg",
    choiceA: "90",
    choiceB: "85",
    choiceC: "75",
    choiceD: "50",
    correctAnswer: "90",
  },
  {
    question: "What is one of the most important skills a project manager can have?",
    questionImg: "img/2.jpg",
    choiceA: "Negotiation skills",
    choiceB: "Influencing skills",
    choiceC: "Communication skills",
    choiceD: "Business skills",
    correctAnswer: "Communication skills",
  },
  {
    question: "The inputs of the Monitor Communications process include all of the following except for which one?",
    questionImg: "img/3.jpg",
    choiceA: "Project management plan",
    choiceB: "Project documents",
    choiceC: "Enterprise environmental factors",
    choiceD: "Work performance information",
    correctAnswer: "Work performance information",
  },
  {
    question: "You need to convey some very complex, detailed information to the project stakeholders. What is the best method for communicating this kind of information?",
    questionImg: "img/4.jpg",
    choiceA: "Verbal",
    choiceB: "Vertical",
    choiceC: "Horizontal",
    choiceD: "Written",
    correctAnswer: "Written",
  },
  {
    question: "As a result of a face-to-face meeting you recently had to discuss the items in your issue log, you have resolved issues, managed expectations, and come away with an action plan that will improve project performance and will also require an update to the communications management plan (part of the project management plan). Which process does this describe?",
    questionImg: "img/5.jpg",
    choiceA: "Manage Stakeholder Engagement",
    choiceB: "Monitor Communications",
    choiceC: "Manage Project  Communications",
    choiceD: "Manage Project Team",
    correctAnswer: "Manage Stakeholder Engagement",
  },
  {
    question: "Communication technology takes into account all of the following factors that can affect the project except for which one?",
    questionImg: "img/6.jpg",
    choiceA: "Urgency of the need for information",
    choiceB: "Project environment",
    choiceC: "Reasons for the distribution of information",
    choiceD: "Duration of the project",
    correctAnswer: "Reasons for the distribution of information",
  },
  {
    question: "Which of the following ensures that information is distributed but does not acknowledge or certify that it was understood by the intended receiver(s)?",
    questionImg: "img/7.jpg",
    choiceA: "Push communication",
    choiceB: "Interactive communication",
    choiceC: "Transmit",
    choiceD: "Message and feedback message",
    correctAnswer: "Push communication",
  },
  {
    question: "According to the PMBOK® Guide, which of the following names all the components of an interactive communication model?",
    questionImg: "img/8.jpg",
    choiceA: "Encode, transmit, decode",
    choiceB: "Encode, transmit, decode, acknowledge, feedback/response",
    choiceC: "Encode, transmit, decode, feedback/response",
    choiceD: "Encode, transmit, acknowledge, decode",
    correctAnswer: "Encode, transmit, decode, acknowledge, feedback/response",
  },
  {
    question: "You are preparing your communications management plan and know that all of the follow- ing are true except for which one?",
    questionImg: "img/9.jpg",
    choiceA: "Decode means to translate thoughts or ideas so they can be understood by others",
    choiceB: "Transmit concerns the method used to convey the message",
    choiceC: "Acknowledgment means the receiver has received and agrees with the message",
    choiceD: "Encoding and decoding are the responsibility of both the sender and receiver",
    correctAnswer: "Acknowledgment means the receiver has received and agrees with the message",
  },
  {
    question: "You need to communicate information in a multidirectional fashion with several stakeholders. Which of the following is true?",
    questionImg: "img/10.jpg",
    choiceA: "This describes push communication, which is a communication model",
    choiceB: "This describes interactive communication, which is a communication method",
    choiceC: "This describes pull communication, which is a communication method",
    choiceD: "This describes communication requirements analysis, which is a communication model",
    correctAnswer: "This describes interactive communication, which is a communication method",
  },
];

// Neccessary Variables
const lastQuestion = questions.length - 1;
let activeQuestion = 0;
const questionTime = 25; // 25 seconds
const gaugeWidth = 800; // 800px
const gaugeUnit = gaugeWidth / questionTime; // 80px
let count = 0;
let TIMER;
let score = 0;

// Start Button Event Listener
start.addEventListener("click", startQuiz);

// Answer choices Event Listeners
allAnswerChoices.forEach(function (clickAnswer) {
  clickAnswer.addEventListener("click", function (e) {
    let userAnswer = e.target.innerText;
    checkAnswer(userAnswer);
  });
});

// renderQuestion Function
function renderQuestion() {
  let q = questions[activeQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  answerChoiceA.innerHTML = q.choiceA;
  answerChoiceB.innerHTML = q.choiceB;
  answerChoiceC.innerHTML = q.choiceC;
  answerChoiceD.innerHTML = q.choiceD;

  let bodyImg = `url('${q.questionImg}')`;
  document.body.style.backgroundImage = bodyImg;
}

// startQuiz Function
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.visibility = "visible";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

// renderProgress Function
function renderProgress() {
  for (let questionIndex = 0; questionIndex <= lastQuestion; questionIndex++) {
    progressContainer.innerHTML +=
      "<div class='progress-box' id=" + questionIndex + "></div>";
  }
}

// renderCounter Function
function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    answerIsIncorrect();
    nextQuestion();
  }
}

// checkAnswer Function
function checkAnswer(answer) {
  if (answer === questions[activeQuestion].correctAnswer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsIncorrect();
  }
  nextQuestion();
}

// answerIsCorrect Function
function answerIsCorrect() {
  document.getElementById(activeQuestion).style.backgroundColor = "green";
}

// answerIsIncorrect Function
function answerIsIncorrect() {
  document.getElementById(activeQuestion).style.backgroundColor = "red";
}

// nextQuestion Function
function nextQuestion() {
  count = 0;
  if (activeQuestion < lastQuestion) {
    activeQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    renderScore();
  }
}

// renderScore Function
function renderScore() {
  ScoreContainer.style.visibility = "visible";

  let scorePercentage = Math.round((100 * score) / questions.length);
  ScoreContainer.innerHTML = `<h2>Percentage of Correctly Answered Questions: ${scorePercentage}</h2>`;
  ScoreContainer.innerHTML += `<h2>Number of Correctly Answered Questions: ${score}</h2>`;
}
