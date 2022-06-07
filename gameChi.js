const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); //gets an array
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const captionText = document.getElementById("caption");
const cap = document.getElementById("toggle");
const next = document.getElementById("next");

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
        caption: "<p><strong>DECEMBER 3, 1818:  </strong>Illinois is the 21st state and features the state seal on its flag. The first state capital was Kaskaskia, then moved to Vandalia, and finally to Springfield in 1837.</p>"
    },
    {
        question: "Chicago gets its name from which wild plant?",
        choice1: "Fennel",
        choice2: "Chard",
        choice3: "Onion",
        choice4: "Grass",
        answer: 3,
        caption: "<p><strong>ONION:  </strong>Chicago is derived from a French rendering of the indigenous Miami-Illinois word <i>shikaakwa</i> for a wild relative of the onion (also known as ramps). According to explorer Henri Joutel's diary in September 1687, 'called \"Chicagou\" which... has taken this name because of the quanity of garlic which grows...'</p>"
    },
    {
        question: "Who was the first non-indigenous settler of Chicago?",
        choice1: "William B. Ogden",
        choice2: "Jean Baptiste Point du Sable",
        choice3: "Abraham Lincoln",
        choice4: "René LaSalle",
        answer: 2,
        caption: "<p><strong>JEAN BAPTISTE POINT DU SABLE:  </strong>Considered the Founder of Chicago, Point du Sable's settlement site from the 1780s is marked near the Chicago River on Michigan Avenue. Little is known of him before he settled there other than his African descent. He married a native american woman, eventually selling his Chicago property in 1800 and moving to St. Charles, Missouri Territory where he died in 1818.</p>"
    },
    {
        question: "The City of Chicago completed what historic project in 1900?",
        choice1: "Rebuilt the city after a fire wiped much of it out.",
        choice2: "The United State's first draw bridge.",
        choice3: "The first 20-story building in the world.",
        choice4: "Reversing the flow of the Chicago River.",
        answer: 4,
        caption: "<p><strong>REVERSING THE RIVER:  </strong>Using canal locks, the main stem (into the lake) and the south branch of the river both reversed their course. The system the city engineers created was named a 'Civil Engineering Monument of the Millennium' by the American Society of Civil Engineers (ASCE) in 1999.</p>"
    },
    {
        question: "The Lincoln Park Zoo was founded in 1868 with the gift of which animals?",
        choice1: "Swans",
        choice2: "Bears",
        choice3: "Ostriches",
        choice4: "Deer",
        answer: 1,
        caption: "<p><strong>SWANS:  </strong>Lincoln Park Commissioners were given two pairs of swans by New York Central Park's Board of Commissioners. Over 150 years old, the Lincoln Park Zoo is the only free zoo in the country.</p>"
    },
    {
        question: "The Palmer House Hotel's kitchen created which treat for the 1893 Chicago World's Fair?",
        choice1: "Moon Pie",
        choice2: "Brownie",
        choice3: "Cheesecake",
        choice4: "Waffle Cone",
        answer: 2,
        caption: "<p><strong>BROWNIE:  </strong>Find the original brownie recipe on the hotel's website. Other famous food introduced at the World's Fair? Pabst Blue Ribbon, Cracker Jacks, Vienna Beef hot dogs, Aunt Jemima Pancake Mix, Wrigley gum, and Heinz condiments.</p>"
    },
    {
        question: "The Pledge of Allegiance was written in 1892 to:",
        choice1: "Help Sell American Flags",
        choice2: "Celebrate America's Achievements",
        choice3: "Unify the Public School System",
        choice4: "Celebrate the 50 States of the Flag",
        answer: 1,
        caption: "<p><strong>HELP SELL FLAGS:  </strong>The <i>Youth's Companion</i> magazine sold American flags to schools and wanted to sell more! The pledge was written by the magazine's promotional department and first recited at the opening ceremony of the Chicago World's Columbian Exposition of 1893 (originally set for 1892, the 400 year anniversary of Christopher Columbus). Notably, the original pledge did not have the phrase 'under God' but was added by Congress in 1954.</p>"
    },
    {
        question: "Chicago is home to approximately how many people?",
        choice1: "4.2 million",
        choice2: "1.9 million",
        choice3: "2.7 million",
        choice4: "3.5 million",
        answer: 3,
        caption: "<p><strong>2.7 MILLION:  </strong>The third largest city in the United States, Chicago is home to about 2.7 million people — the Chicagoland metropolitan area about 9.5 million.</p>"
    },
    {
        question: "What sport was invented in Chicago?",
        choice1: "Pickle Ball",
        choice2: "Boxing",
        choice3: "Softball",
        choice4: "Curling",
        answer: 3,
        caption: "<p><strong>SOFTBALL:  </strong>What's now known as softball was first played Thanksgiving Day, 1887. It took place between Yale and Harvard University supporters gathered to hear the outcome of a football game at a boat club.</p>"
    },
    {
        question: "Which of these is not one of Chicago's nicknames?",
        choice1: "The Windy City",
        choice2: "Second City",
        choice3: "The White City",
        choice4: "The Garden City",
        answer: 4,
        caption: "<p><strong>THE GARDEN CITY:  </strong>While not a nickname, Chicago's motto is <i>urbs in horto</i> or 'city in a garden' celebrating the city's impressive park system. Almost 600 parks dot the neighborhoods around Chicago.</p>"
    },
    {
        question: "If you use this topping on your hot dog in Chicago you might make the chef cringe:",
        choice1: "Peppers",
        choice2: "Ketchup",
        choice3: "Mustard",
        choice4: "Tomato Slice",
        answer: 2,
        caption: "<p><strong>KETCHUP:  </strong>Some say the sweetness of ketchup masks the flavor of the meat. If you'd like to eat a true Chicago-style dog you'll top it with a squirt of mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slice or wedges, pickled sport peppers, and a dash of celery salt.</p>"
    },
    {
        question: "What event was first televised from Chicago?",
        choice1: "Presidential debate",
        choice2: "Thanksgiving Day parade",
        choice3: "Baseball game",
        choice4: "Nuclear fission",
        answer: 1,
        caption: "<p><strong>PRESIDENTIAL DEBATE:  </strong>The first televised presidential debate between Senator John F. Kennedy and Vice President Richard Nixon was broadcast from the Chicago CBS studios. A precursor event, televised four years earlier, was Eleanor Roosevelt and Senator Margaret Chase Smith debating the merits of Adlai Stevenson vs. Dwight Eisenhower for president.</p>"
    }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 1;
    score = 0;
    availableQuestions = [ ... questions]; //make copy of questions
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end of the page
        return window.location.assign("./end.html");
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
        
        captionText.innerHTML = currentQuestion.caption;
        cap.style.display = "block";

    });

});

next.addEventListener("click", function() {
    cap.style.display = "none";
    choices.forEach(choice =>{
        choice.parentElement.classList.remove("correct");
    })
    choices.forEach(choice =>{
        choice.parentElement.classList.remove("incorrect");
    })
    getNewQuestion();
});

// keep track of the score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();