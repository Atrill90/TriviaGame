//Array of questions that are also objects
var questions = [{
        questionNum: "question-0",
        question: 'How many Stark children are there at the start of the show?',
        choices: [4, 5, 6, 7],
        answer: "choice-1"
    },
    {
        questionNum: "question-1",
        question: 'How many children does Cersei have at the start of the show?',
        choices: [0, 2, 4, 3],
        answer: "choice-3"
    },
    {
        questionNum: "question-2",
        question: 'What continent is the seven kingdoms on?',
        choices: ["Easteros", "Planetos", "Westeros", "Asshai"],
        answer: "choice-2"
    },
    {
        questionNum: "question-3",
        question: 'Another name for Oberyn Martell is?',
        choices: ["the viper", "the lion", "the shark", "the cobra"],
        answer: "choice-0"
    },
    {
        questionNum: "question-4",
        question: 'How many direwolf pups are there at the start of the show',
        choices: [4, 5, 6, 7],
        answer: "choice-2"
    },
    {
        questionNum: "question-5",
        question: 'What was the Mad King\'s first name',
        choices: ["Aemon", "Aerys", "Aegon", "Armon"],
        answer: "choice-1"
    },
    {
        questionNum: "question-6",
        question: 'What is the name of the leader of the dead',
        choices: ["Winter King", "Nightmare", "Night King", "Frosty the Snowman"],
        answer: "choice-2"
    },
    {
        questionNum: "question-7",
        question: 'What is Arya\'s sword\'s name',
        choices: ["Needler", "Needle", "Pointy", "Mr. Stick"],
        answer: "choice-1"
    },
    {
        questionNum: "question-8",
        question: 'What are the Greyjoy\'s words',
        choices: ["We Do Not Bow", "Family,Duty,Honor", "We Do Not Sow", "Winter is Coming"],
        answer: "choice-2"
    },
    {
        questionNum: "question-9",
        question: 'What is Jon Snow\'s sword name ',
        choices: ["Longclaw", "Sharpclaw", "Longpaw", "Bastardclaw"],
        answer: "choice-0"
    }
];

var correctGuesses = [];
var wrongGuesses = [];
var intervalId;


var x = document.getElementById("myAudio"); 

function playAudio() { 
    x.play(); 
} 

function pauseAudio() { 
    x.pause(); 
} 

$("#start").click(function(){
run();
$("#questionTag").css('display','inline')
questionShow();
$(".submit").css('display','inline')
x.play(); 
});

$(".submit").click(function(){
    $(".modal-body").html(`<div>Correct Answers: ${correctGuesses.length} </div> <div> Wrong Answers: ${wrongGuesses.length}`);
    $('#scoreBoxModal').modal('show');
    clearInterval(intervalId);
});

function run(){
   clearInterval(intervalId);
    number = 90;
    intervalId = setInterval(decrement, 1000);
    $("#start").css('display','none')
   
}
function decrement(){
    number--;
    document.querySelector(".timerSpot").textContent = number;
    if (number ===0){
        stop();
        alert('Times up! Click ok to view your score and hit refresh to play again!')
        $(".modal-body").html(`<div>Correct Answers: ${correctGuesses.length} </div> <div> Wrong Answers: ${wrongGuesses.length}`);
        $('#scoreBoxModal').modal('show');
    }
}
function stop(){
    clearInterval(intervalId);
}

// Use the for each function to loop over the array of question objects
function questionShow(){
questions.forEach(function (question, index) {
//p element created dynamically and appended the question text.Gave each p element 2 classes 
    var node = document.createElement("p");
    node.classList = `gameOfThronesFont question-${index} `;
    var questionText = document.createTextNode(question.question);
    node.appendChild(questionText);
    //created div element and appended the p element into the div
    var questionQC = document.createElement("div");
    questionQC.classList = 'col-md-12 border mt-4 p-5 questionBackground';
    questionQC.appendChild(node);
// Used for each loop to go over each question choice and create a button and then appended them to the choice house
    question.choices.forEach(function (choice, index) {
        var choiceHouse = document.createElement("button");
        choiceHouse.classList = `ml-5 choice-${index} winter btn btn-secondary aria-pressed="true"`;
        choiceHouse.appendChild(document.createTextNode(choice));
        questionQC.appendChild(choiceHouse);


    });
    // Append questions and choices to the parent div
    document.querySelector(".questionField").appendChild(questionQC);
});

  //creating an array from the winter nodelist 
var buttonsArray = Array.from(document.querySelectorAll(".winter"));
// for each button added click event and call the check user input function
buttonsArray.forEach(button => {
    button.addEventListener("click", checkUserInput);
});

function checkUserInput(e) {
// capture the event and the traverse the dom to get the question and user selected answer
    var currentQuestion,
        userAnswer;
    if (e.target.classList.contains('choice-0')) {
        currentQuestion = e.target.previousElementSibling.classList[1];
        userAnswer = e.target.classList[1];
        checkCorrectAnswer(currentQuestion, userAnswer);
    } else if (e.target.classList.contains('choice-1')) {
        currentQuestion = e.target.previousElementSibling.previousElementSibling.classList[1];
        userAnswer = e.target.classList[1];
        checkCorrectAnswer(currentQuestion, userAnswer);
    } else if (e.target.classList.contains('choice-2')) {
        currentQuestion = e.target.previousElementSibling.previousElementSibling.previousElementSibling.classList[1];
        userAnswer = e.target.classList[1];
        checkCorrectAnswer(currentQuestion, userAnswer);
    } else if (e.target.classList.contains('choice-3')) {
        currentQuestion = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList[1];
        userAnswer = e.target.classList[1];
        checkCorrectAnswer(currentQuestion, userAnswer);
    }
}
// checks correct answer against the array object answers and alerts. 
function checkCorrectAnswer(currentQuestion, userAnswer) {
    questions.forEach(question => {
        if (question.questionNum === currentQuestion) {
            if (question.answer === userAnswer) {
                correctGuesses.push(userAnswer);
                
                

            } else {
                wrongGuesses.push(userAnswer);
                console.log(wrongGuesses);
                
            }
        }
    });
}
}
// Some things I'd like to improve if possible
// I couldn't figure out how to lock people out from selecting more than one button since all those buttons are created dynamically
// My timer still looks a little shabby and I'd like to spruce it up
// I'd like to add something where you click the button and it highlights your choice
// Pretty happy with how things turned out 
