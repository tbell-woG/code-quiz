// Draw in page objects
let highscoreDiv = document.querySelector("#highscores");
let quizTimerEl = document.querySelector("#quizTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timer");

// let questionEl = document.querySelector("#question")
// let answersListEl = document.querySelector("#answer-list")

// set variables - how do we move these into localized
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var quizDuration = 0;
var quizSecElapsed = 0;
var quizInterval;

// draw instruction
init();

// var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
  clearDetails();
  reset();

  //Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Quiz Instructions";

  // Elements with the instructions for the quiz
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!";


  // Button to start the quiz
  let startQuiz = document.createElement("button");
  startQuiz.setAttribute("id", "startQuiz");
  startQuiz.setAttribute("class", "btn btn-secondary");
  startQuiz.textContent = "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startQuiz);

  startQuiz.addEventListener("click", function () {
    quizType = "Coding Quiz";
    startQuestions(testQuestions);
  });
}

// The function that clears the details element of all the children
function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  quizDuration = 0;
  quizSecElapsed = 0;
  quizInterval;
}

//Start the quiz
function startQuestions(questionSet) {
  if (test) { console.log("--- startQuiz ---"); }

  // Select random questions
  quiz = setUpQuestions(questionSet);

  // Display the timer
  timerTab.setAttribute("style", "visibility: visible;");

  // Start timer here
  quizDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:", quizDuration); }

  function startQuizTimer() {
    ///console.log("I am here in the startQuizTimer");
    //Create a setInterval function inside that runs every second and counts down a timer variable.
  }

  function renderTime() {
    ///console.log("I am here in the renderTime");
    //Create a setInterval function inside that runs every second and counts down a timer variable.
  }
  
  startQuizTimer();
  renderTime();

  //go to first question
  presentQuestion();
}

// Function to pull question out of the array
function setUpQuestions(arr) {
  if (test) { console.log("--- setUpQuestions ---"); }

  let ranQuest = [];

  for (let i = 0; i < arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// Function to reset screen with question 
function presentQuestion() {
  if (test) { console.log("--- presentQuestion ---"); }
  // if (test) {console.log("cur.choices[i] " + cur.choices);}

  // Reset time allows to answer question
  questionSecElapsed = 0;

  // Checks for no more questions and exits
  if (quiz.length === 0) {
    endOfGame();
    return;
  }

  // call question timer here
  // reduceQUiz global

  //sets current object (cur - question) by pulling out of reducedQuiz array leaving the remaining quetions in the array
  curQuestion = quiz.pop();

  //clears html to draw questions
  clearDetails();

  // add question to screen
  //build out display for new item
  let question = document.createElement("h1");
  // adds data value
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id", "choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for (let i = 0; i < curQuestion.choices.length; i++) {
    // creates variable for each choice item
    let listChoice = document.createElement("li");
    // adds data value
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id", "questionNum-" + i);
    listChoice.textContent = curQuestion.choices[i];
    //add choice to page
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion); }

  // get answer from user
  // using the anymous function delays the invocation of the scoreAnswer
  choiceBox.addEventListener("click", function () {
    scoreAnswer(curQuestion);
  });
  // calls for the next questions
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---"); }
  // ensure that the event on the li
  var e = event.target;
  if (e.matches("li")) {
    let selectedItem = e.textContent;
    // if (test) { console.log("check quiz " + quiz.length); }
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    // if (test) { console.log("selectedItem cur " , cur.answer); }
    if (selectedItem === cur.answer) {
      // if (test) { console.log("correct answer");}
      score += questionDuration - questionSecElapsed;
      //TODO music 
    } else {
      if (test) { console.log("wrong answer"); }
      //penelty for being wrong
      gameDuration -= 10;
    }
    if (test) { console.log("sselected ", selectedItem); }
    showAnswers(cur);
    // presentQuestion();
  }
}

// TODO incomplete does not disply the correct color
function showAnswers(cur) {
  if (test) { console.log("--- showAnswer ---"); }
  // if (test) { console.log("sa length",cur.choices.length);}
  if (test) { console.log("sa qanda", cur); }
  if (test) { console.log("sselected ", selectedItem); }


  for (let i = 0; i < cur.choices.length; i++) {
    if (test) { console.log("sa in for ", i); }

    let questid = "#questionNum-" + i;
    // if (test) { console.log("sa qn", questid );}
    let questrow = document.querySelector(questid);

    // if (test) { console.log("questrow",questrow);}

    if (test) { console.log("saf selected" + selectedItem + "<"); }
    if (test) { console.log("saf color test >" + cur.choices[i] + "<"); }

    if (cur.choices[i] !== cur.answer) {
      if (test) { console.log("color test flase"); }
      questrow.setAttribute("style", "background-color: red");
    } else {
      if (test) { console.log("color test true"); }
      questrow.setAttribute("style", "background-color: green");
    }
  }
  // pause so user can see results
  setTimeout(presentQuestion, 500);
}

// function to set time for game timer
function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}