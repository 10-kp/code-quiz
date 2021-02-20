//create variables for each id in HTML
var start = document.querySelector(".start");
var timer = document.querySelector("#timer");
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");

// Start the timer
var timeOnClock = 30;

// Monitor the answers and incorrect answers
var correct = 0;
var incorrect = 0;
var currentIndex = 0;

// Questions
var questions = [
  {
    title: "What are the different data types present in javascript?",
    choices: ["Boolean", "Number", "String", "All of the above"],
    answer: 'choice4' 
  },

  {
    title: "Which of the following a is not a keyword in Java?",
    choices: ["Class", "Interface", "Extends", "Abstraction"],
    answer: 'choice3' 
  },
  {
    title: "Which is the correct syntax?",
    choices: ["public class ABC extends QWE extends Student", "int i='A';", 'String s="Hello";', 'private class ABC'],
    answer: 'choice2'
  },
  {
    title: "What is true about Java?",
    choices: ["Java is platform specific", "Java does not support multiple inheritance", 
    'Java does not run on Linux and Mac', 'Java is not a multi-threaded language'],
    aswer: 'choice1'
  }
];

// Start the timer
function startTimer() {
    // Sets timer
    var timerInterval = setInterval(function() {
      timeOnClock--;
      timer.textContent = timeOnClock + " seconds left.";
  
      // loop the timer
      if(timeOnClock === 0 || currentIndex === questions.length) {
        clearInterval(timerInterval);
        timer.textContent = "";
        alert("finish");
        results();
      }
  
    }, 1000);
  }
// Show the questions
  function displayQuestions() {
    for (var i = 0; i < questions.length; i++) {
        var c = questions[currentIndex].choices;
        var q = questions[currentIndex].title;
        choice1.innerHTML = c[0];
        choice2.innerHTML = c[1];
        choice3.innerHTML = c[2];
        choice4.innerHTML = c[3];
        question.innerHTML = q;
    }
}

function checkAnswer(answer) {
    if (questions[currentIndex].answer == answer) {
        alert("correct");
        correct++;
        nextQuestion();
    }
    else {
        alert("incorrect");
        incorrect++;
        timeOnClock= timeOnClock - 8;
        nextQuestion();
    }
}

function nextQuestion(){
  currentIndex++;
  displayQuestions();
  
}

function results(){
  var score = parseInt(correct) + parseInt(timeOnClock);
  question.innerHTML = "score: " + score;
  quiz.style.fontSize = "24px";
  quiz.style.color = "sienna";
  
  quiz.innerHTML = "correct: " + correct + " " + "incorrect: " + incorrect;
  
  var input = document.createElement("input");
  input.style.margin = "10px";
  quiz.append(input);
  
  var save = document.createElement("button");
  save.innerHTML = "type your name and click to save";
  quiz.append(save);
  
  save.addEventListener("click", function (event) {
    event.preventDefault();
    var highscore = JSON.parse(localStorage.getItem('highscore')) || [];
    var userScore = {name: input.value, score: score };
    highscore.length <= 5 && highscore.push(userScore);
   if (highscore.length >= 5){
     for (let i = 0; i < highscore.length; i++){
      if (highscore[i].score < userScore.score){
        highscore.splice(i, 1, userScore);
        break;
      }
    }
   }

   localStorage.setItem('highscore', JSON.stringify(highscore));
      highscore.map(i => {
        if (highscore.length > 5){
              highscore.splice(5);
        }
        var li = document.createElement("li");
        li.innerHTML = i.name + " " + i.score;
        return quiz.append(li);
      }) 
      input.style.visibility = "hidden";
      save.style.visibility = "hidden";
      timer.innerHTML = "Score Board";

    });
  }

  start.addEventListener("click", function () {    
    startTimer();
    displayQuestions();
    start.style.display = "none";
})
