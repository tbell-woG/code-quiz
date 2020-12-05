// draw in page objects
let highscoreDiv = document.querySelector("#highscores");
let quizTimerEl = document.querySelector("#quizTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timer");


// let questionEl = document.querySelector("#question")
// let answersListEl = document.querySelector("#answer-list")

// set global variables
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var quizDuration = 0;
var quizSecElapsed = 0;
var quizInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;

// draw instruction
init();

// var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
  clearDetails();
  reset();

  // Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Quiz Instructions";

  // creates elements with the instructions for the quiz
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!";

  // adding more question - this should move into loop or function
  // creates button to start the quiz
  let startQuiz = document.createElement("button");
  startQuiz.setAttribute("id", "startQuiz");
  startQuiz.setAttribute("class", "btn btn-primary");
  startQuiz.textContent = "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startQuiz);

  startQuiz.addEventListener("click", function () {
    quizType = "Coding Quiz";
    startQuestions(testQuestions);
  });
}

// function to clear details element of all children
function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  quizDuration = 0;
  quizSecElapsed = 0;
  quizInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//Start quiz
function startQuestions(questionSet) {
  if (test) { console.log("--- startQuestions ---"); }
  // select quiz randomize questions

  quiz = setUpQuestions(questionSet);

  // displays timer
  timerTab.setAttribute("style", "visibility: visible;");

  // Start timer here
  quizDuration = quiz.length * 15;
  if (test) { console.log("duration q,q:", quizDuration, questionDuration); }

  startQuizTimer();

  function startQuizTimer() {
    ///console.log("I am here in the startQuizTimer");
    //Create a setInterval function inside that runs every second and counts down a timer variable.

  }

  renderTime();

  function renderTime() {
    ///console.log("I am here in the renderTime");
    //Create a setInterval function inside that runs every second and counts down a timer variable.
  }

  //go to first question
  presentQuestion();
}

// function to get random question out of array
function setUpQuestions(arr) {
  if (test) { console.log("--- setUpQuestions ---"); }

  let ranQuest = [];

  for (let i = 0; i < arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion() {
  if (test) { console.log("--- presentQuestion ---"); }
  // if (test) {console.log("cur.choices[i] " + cur.choices);}

  //reset time allows to answer question
  questionSecElapsed = 0;

  // checks for no more questions and exits
  if (quiz.length === 0) {
    endOfquiz();
    return;

    function endOfquiz() {
      ///console.log("I am here in the endOfquiz");      
    }
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

    } else {
      if (test) { console.log("wrong answer"); }
      //penelty for being wrong
      quizDuration -= 10;
    }
    if (test) { console.log("sselected ", selectedItem); }
    showAnswers(cur);
    // presentQuestion();
  }
}

function showAnswers(cur) {
  if (test) { console.log("--- showAnswer ---"); }
  // if (test) { console.log("sa length",cur.choices.length);}
  if (test) { console.log("see asnwer", cur); }
  if (test) { console.log("see selected ", selectedItem); }


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
      questrow.setAttribute("style", "background-color: yellow");
    }
  }
  // pause so user can see results
  setTimeout(presentQuestion, 75);
}

// function to set time for quiz timer
function setQuizTime() {
  if (test) { console.log("--- setQuizTime ---"); }
  if (test) { console.log("quizDuration " + quizDuration); }
  clearInterval(quizInterval);
  quizSeconds = quizDuration;
}


function renderTime() {
  // if (test) { console.log(" --- renderTime --- "); }
  // if (test) { console.log("quizSecElapsed " + quizSecElapsed); }
  // if (test) { console.log("quizDuration " + quizDuration); }
  // if (test) { console.log("questionDuration " + questionDuration); }

  quizTimerEl.textContent = quizDuration - quizSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ((questionDuration - questionSecElapsed) < 1) {
    // quiz penelty for letting timer run out
    quizDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  }

  if ((quizDuration - quizSecElapsed) < 1) {
    endOfQuiz();
  }
}

function startQuizTimer() {
  if (test) { console.log("--- startQuizTimer ---"); }
  setQuizTime();

  quizInterval = setInterval(function () {
    quizSecElapsed++;
    questionSecElapsed++;
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- "); }
  quizSeconds = 0;
  questionSeconds = 0;
  clearInterval(quizInterval);
}

// function of end of quiz
function endOfQuiz() {
  if (test) { console.log("--- endOfQuiz ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Time is up!";

  // creates elements with the instructions for the quiz
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score;

  // creates button to start the quiz
  let quizAgain = document.createElement("button");
  quizAgain.setAttribute("id", "quizAgain");
  quizAgain.setAttribute("class", "btn btn-primary");
  quizAgain.textContent = "Take quiz again";

  // creates input for user to add initials
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for", "userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "userInitials");
  initialsInput.setAttribute("name", "userInitials");
  initialsInput.setAttribute("minlength", "3");
  initialsInput.setAttribute("maxlength", "3");
  initialsInput.setAttribute("size", "3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(quizAgain);

  quizAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function () {
    initialsInput.value = initialsInput.value.toUpperCase();
    if (initialsInput.value.length === 3) {

      //create object for this score
      let thisScore = [{ type: quizType, name: initialsInput.value, score: score }];

      //get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores"));
      if (test) { console.log("storedScore", storedScores); }

      if (storedScores !== null) {
        storedScores.push(thisScore[0]);
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  //get scores from storage
  let storedScores = JSON.parse(localStorage.getItem("highScores"));

  // draw heading
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top 5 High Scores";

  mainEl.appendChild(heading);

  // Render a new li for each score
  if (storedScores !== null) {
    // sort scores
    storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    // sets the number of scores to display to 5 or the number of quizes played. Which ever is less
    let numScores2Display = 5;
    if (storedScores.length < 5) {
      numScores2Display = storedScores.length;
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent = "Your Initials Here!"
    mainEl.appendChild(p);
  }


  // creates button to start the quiz
  let quizAgain = document.createElement("button");
  quizAgain.setAttribute("id", "quizAgain");
  quizAgain.setAttribute("class", "btn btn-primary");
  quizAgain.textContent = "Take the Quiz!";

  mainEl.appendChild(quizAgain);

  quizAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);