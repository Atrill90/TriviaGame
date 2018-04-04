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
        question: 'What is Arya\'s sword',
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

questions.forEach(function (question, index) {

    var node = document.createElement("p");
    node.classList = `gameOfThronesFont question-${index} `;
    var questionText = document.createTextNode(question.question);
    node.appendChild(questionText);
    var questionQC = document.createElement("div");
    questionQC.classList = 'col-md-12 border mt-4 p-5';
    questionQC.appendChild(node);

    question.choices.forEach(function (choice, index) {
        var choiceHouse = document.createElement("button");
        choiceHouse.classList = `ml-5 choice-${index} winter`;
        choiceHouse.appendChild(document.createTextNode(choice));
        questionQC.appendChild(choiceHouse);


    });
    document.querySelector(".questionField").appendChild(questionQC);
});

var buttonsArray = Array.from(document.querySelectorAll(".winter"))
buttonsArray.forEach(button => {
    button.addEventListener("click", checkUserInput);
});

function checkUserInput(e) {

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

function checkCorrectAnswer(currentQuestion, userAnswer) {
    questions.forEach(question => {
        if (question.questionNum === currentQuestion) {
            if (question.answer === userAnswer) {
                alert('correct!')
            } else {
                alert('you suck')
            }
        }
    });
}