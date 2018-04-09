var questions = [{
        questionNum: 0,
        question: 'How many Stark children are there at the start of the show?',
        choices: [4, 5, 6, 7],
        answer: 1
    },
    {
        questionNum: 1,
        question: 'How many children does Cersei have at the start of the show?',
        choices: [0, 2, 4, 3],
        answer: 3
    },
    {
        questionNum: 2,
        question: 'What continent is the seven kingdoms on?',
        choices: ["Easteros", "Planetos", "Westeros", "Asshai"],
        answer: 2
    },
    {
        questionNum: 3,
        question: 'Another name for Oberyn Martell is?',
        choices: ["the viper", "the lion", "the shark", "the cobra"],
        answer: 0
    },
    {
        questionNum: 4,
        question: 'How many direwolf pups are there at the start of the show',
        choices: [4, 5, 6, 7],
        answer: 2
    },
    {
        questionNum: 5,
        question: 'What was the Mad King\'s first name',
        choices: ["Aemon", "Aerys", "Aegon", "Armon"],
        answer: 1
    },
    {
        questionNum: 6,
        question: 'What is the name of the leader of the dead',
        choices: ["Winter King", "Nightmare", "Night King", "Frosty the Snowman"],
        answer: 2
    },
    {
        questionNum: 7,
        question: 'What is Arya\'s sword\'s name',
        choices: ["Needler", "Needle", "Pointy", "Mr. Stick"],
        answer: 1
    },
    {
        questionNum: 8,
        question: 'What are the Greyjoy\'s words',
        choices: ["We Do Not Bow", "Family,Duty,Honor", "We Do Not Sow", "Winter is Coming"],
        answer: 2
    },
    {
        questionNum: 9,
        question: 'What is Jon Snow\'s sword name ',
        choices: ["Longclaw", "Sharpclaw", "Longpaw", "Bastardclaw"],
        answer: 0
    }
];

var correctGuesses = [];
var wrongGuesses = [];
var intervalId;

var audio = document.getElementById("myAudio");

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

$("#start").click(function () {
    run();
    questionShow();
    audio.play();
});

$(".submit").click(function () {
    $(".modal-body").html(`<div>Correct Answers: ${correctGuesses.length} </div> <div> Wrong Answers: ${wrongGuesses.length}`);
    $('#scoreBoxModal').modal('show');
    clearInterval(intervalId);
});

function run() {
    clearInterval(intervalId);
    number = 90;
    intervalId = setInterval(decrement, 1000);
    $("#start").css('display', 'none')
    $("#questionTag").css('display', 'inline')
}

function decrement() {
    number--;
    document.querySelector(".timerSpot").textContent = number;
    if (!number) { //This might look weird to you, but zero is considered non-truthy in JS. to check truthiness, in your console prefix what you want to evaluate with `!!`. Try it with `!!1` and `!!0`.
        stop();
        alert('Times up! Click ok to view your score and hit refresh to play again!')
        $(".modal-body").html(`<div>Correct Answers: ${correctGuesses.length} </div> <div> Wrong Answers: ${wrongGuesses.length}`);
        $('#scoreBoxModal').modal('show');
    }
}

function stop() {
    clearInterval(intervalId);
}

// Use the for each function to loop over the array of question objects
function questionShow() {
    $(".submit").css('display', 'inline');

    questions.forEach(function (question, index) {
        //p element created dynamically and appended the question text.Gave each p element 2 classes 
        var node = document.createElement("p");
        node.classList = `gameOfThronesFont`;
        var questionText = document.createTextNode(question.question); //question.question is a code smell. Recommend iterating with currentQuestion.question or something
        node.appendChild(questionText);
        //created div element and appended the p element into the div
        var questionQC = document.createElement("div");
        questionQC.classList = `col-md-12 border mt-4 p-5 questionBackground question-${index}`;
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
        var currentQuestion = $(e.target).first().parent()
            .attr('class')
            .split(/\s+/)
            .filter(function (className) {
                return className.startsWith('question-')
            })[0];
        var questionIndex = currentQuestion[currentQuestion.length - 1];

        var choiceName = $(e.target).first()
            .attr('class')
            .split(/\s+/)
            .filter(function (className) {
                return className.startsWith('choice')
            })[0];
        var userAnswer = choiceName[choiceName.length - 1];

        checkCorrectAnswer(questionIndex, userAnswer);
    }
    // checks correct answer against the array object answers and alerts. 
    function checkCorrectAnswer(questionIndex, userAnswer) {
        if (questions[questionIndex].answer == userAnswer) {
            correctGuesses.push(userAnswer);
        } else {
            wrongGuesses.push(userAnswer);
            console.log(wrongGuesses);
        }
    }
}
// Some things I'd like to improve if possible
// I couldn't figure out how to lock people out from selecting more than one button since all those buttons are created dynamically
// My timer still looks a little shabby and I'd like to spruce it up
// I'd like to add something where you click the button and it highlights your choice
// Pretty happy with how things turned out

/* Notes:
    1) CSS/HTML should really use hyphens for a lot of reasons: 
    http://jasonbuckboyer.com/playground/use-hyphens-in-css/

    2) Your formatting is atrocious. Really difficult to read and inconsistent
    I'm going to recommend an extension for you. To install it, go to your left
    sidebar and click extensions, then search for it in the search bar.
    Beautify 1.3.0
    install it, then hit "cmd-shift-p" and start typing "beautify file". Do this
    in your js or html or css and it'll automatically add indents and shit. Also be
    consistent with your semi-colon use and stop adding unecessary spaces between lines.
    You should however add an extra space when you're doing something new. This isn't
    so much of a hard and fast rule, but more a judgement call. Either way I re-entered
    based on how I'd do it.

    3) I'm really confused with your mixing of using the document API AND jQuery. 
    You'll do something like `var node = document.createElement("p");` when you 
    can just do `var node = $('<p>')`. Use jQuery. It's built to make life easier.


*/