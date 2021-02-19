var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

// FOR THE TIMER
var timer;
var timerCount;

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 30;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    renderBlanks()
    startTimer()
  }  

//THIS DOES NOT WORK!!
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;

    //   STOP THE TIMER - NOT WORKING!!
      if (timerCount >= 0 || timerCount===0) {
          // Clears interval and stops timer
          clearInterval(timer);
    }, 1000);
  }

// QUESTIONS
var myQuestions = [
  {question: "What are the different data types present in javascript?",
    answers: {
      a: 'Boolean',
      b: 'Number',
      c: 'String',
      d: 'All of the above'
    },
    correctAnswer: 'd'
  },
  {question: "Which of the following a is not a keyword in Java?",
    answers: {
      a: 'class',
      b: 'interface',
      c: 'extends',
      d: 'abstraction'
    },
    correctAnswer: 'c'
  },
  {question: "Which is the correct syntax?",
    answers: {
      a: 'public class ABC extends QWE extends Student',
      b: 'int i="A";',
      c: 'String s="Hello";',
      d: 'private class ABC'
    },
    correctAnswer: 'b'
  },

  {question: "What is true about Java?",
    answers: {
      a: 'Java is platform specific',
      b: 'Java does not support multiple inheritance',
      c: 'Java does not run on Linux and Mac',
      d: 'Java is not a multi-threaded language'
    },
    correctAnswer: 'a'
  }
];

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // Store the answer choices
    var output = [];
    var answers;

    // Loop each question
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // loop available answer
      for(letter in questions[i].answers){

        // an html radio button - 
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // Combine output list into one string of html
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // Loop each question
    for(var i=0; i<questions.length; i++){

      // Selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions 
  showQuestions(questions, quizContainer);
  
  // on submit, show results
//   submitButton.onclick = function(){
//     showResults(questions, quizContainer, resultsContainer);
//   }

}
