const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); //gets an array
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const captionText = document.getElementById("caption");
const cap = document.getElementById("toggle");
const btn = document.getElementById("btn");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "When did Illinois become a state?",
        choice1: "December 3, 1818",
        choice2: "January 23, 1801",
        choice3: "June 9, 1836",
        choice4: "March 7, 1823",
        answer: 1,
        caption: "Illinois is the 21st state and features the state seal on its flag. The first state capital was Kaskaskia, then moved to Vandalia, and finally to Springfield in 1837."
    },
    {
        question: "Chicago gets its name from which wild plant?",
        choice1: "Fennel",
        choice2: "Chard",
        choice3: "Onion",
        choice4: "Grass",
        answer: 3,
        caption: "Chicago is derived from a French rendering of the indigenous Miami-Illinois word shikaakwa for a wild relative of the onion."
    },
    {
        question: "Who was the first non-indigenous settler of Chicago?",
        choice1: "William B. Ogden",
        choice2: "Jean Baptiste Point du Sable",
        choice3: "Abraham Lincoln",
        choice4: "René LaSalle",
        answer: 2,
        caption: "Considered the Founder of Chicago, Point du Sable's settlement site is marked near the Chicago River on Michigan Avenue. Little is known of him other than his African descent."
    },
    {
        question: "The City of Chicago completed what historic project in 1900?",
        choice1: "Rebuilt the city after a fire wiped much of it out.",
        choice2: "The United State's first draw bridge.",
        choice3: "The first 20-story building in the world.",
        choice4: "Reversing the flow of the Chicago River.",
        answer: 4,
        caption: "Using canal locks the main stem (into the lake) and south branch of the river reversed course. The system they created was named a 'Civil Engineering Monument of the Millennium' by the American Society of Civil Engineers (ASCE) in 1999."
    },
    {
        question: "The Lincoln Park Zoo was founded in 1868 with the gift of which animals?",
        choice1: "Swans",
        choice2: "Bears",
        choice3: "Ostriches",
        choice4: "Deer",
        answer: 1,
        caption: "Lincoln Park Commissioners were given two pairs of swans by New York Central Park's Board of Commissioners. Lincoln Park Zoo is the only free zoo in the country."
    },
    {
        question: "The Palmer House Hotel's kitchen created which treat for the 1893 Chicago World's Fair?",
        choice1: "Moon Pie",
        choice2: "Brownie",
        choice3: "Cheesecake",
        choice4: "Waffle Cone",
        answer: 2,
        caption: "Find the original brownie recipe on the hotel's website! Other famous food introduced at the World's Fair? Pabst Blue Ribbon, Cracker Jacks, Vienna Beef hot dogs, Aunt Jemima Pancake Mix, Wrigley gum, and Heinz condiments."
    },
    {
        question: "The Pledge of Allegiance was written in Chicago in 1892 to:",
        choice1: "Help Sell American Flags",
        choice2: "Celebrate America's Achievements",
        choice3: "Unify the Public School System",
        choice4: "Celebrate the 50 States of the Flag",
        answer: 1,
        caption: "The Youth's Companion magazine sold American flags to schools and wanted to sell more flags and teach students a lesson in patriotism. This was done to celebrate 400 years of Columbus and the Chicago Columbian Exposition (World Fair). Notably, the original pledge did not have the phrase 'under God' but was added by Congress in 1954."
    },
    {
        question: "Chicago is home to approximately how many people?",
        choice1: "4.2 million",
        choice2: "1.9 million",
        choice3: "2.7 million",
        choice4: "3.5 million",
        answer: 3,
        caption: "The third largest city in the United States, Chicago is home to about 2.7 million people — the Chicagoland metropolitan area about 9.5 million."
    },
    {
        question: "What sport was invented in Chicago?",
        choice1: "Pickle Ball",
        choice2: "Boxing",
        choice3: "Softball",
        choice4: "Curling",
        answer: 3,
        caption: "What's now known as softball was first played Thanksgiving Day, 1887. It took place between Yale and Harvard University supporters gathered to hear the outcome of a football game at a boat club."
    },
    {
        question: "Which of these is not one of Chicago's nicknames?",
        choice1: "The Windy City",
        choice2: "Second City",
        choice3: "The White City",
        choice4: "The Garden City",
        answer: 4,
        caption: "While Chicago's motto is 'urbs in horto' or 'city in a garden' it isn't a nickname, but does celebrate the city's impressive park system."
    },
    {
        question: "If you use this topping on your hot dog in Chicago you might make the chef cringe:",
        choice1: "Peppers",
        choice2: "Ketchup",
        choice3: "Mustard",
        choice4: "Tomato Slice",
        answer: 2,
        caption: "Some say the sweetness of ketchup masks the flavor of the meat. You'd see a true Chicago-style dog made with a squirt of mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slice or wedges, pickled sport peppers, and a dash of celery salt."
    },
    {
        question: "What event was first televised from Chicago?",
        choice1: "Presidential debate",
        choice2: "Thanksgiving Day parade",
        choice3: "Baseball game",
        choice4: "Nuclear fission",
        answer: 1,
        caption: "The first televised presidential debate between Senator John F. Kennedy and Vice President Richard Nixon was hosted in the Chicago CBS studios. Although, four years before this Eleanor Roosevelt debated Senator Margaret Chase Smith on television debating Adlai Stevenson vs Dwight Eisenhower for president."
    }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions]; //make copy of questions
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end of the page
        return window.location.assign("/end.html");
    }
    
    //question progress text and bar
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    questionCounter++; //increment by one


    const questionIndex = Math.floor((Math.random() * availableQuestions.length));
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        
        
            //alert(currentQuestion.caption);//////
        captionText.innerText = currentQuestion.caption;
        cap.style.display = "block";
        btn.addEventListener("click", function() {
            cap.style.display = "none";
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        });

    });

});

// keep track of the score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();