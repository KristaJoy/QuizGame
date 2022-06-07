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
        question: "When did Oregon become a state?",
        choice1: "March 13, 1901",
        choice2: "February 14, 1859",
        choice3: "January 1, 1826",
        choice4: "August 15, 1872",
        answer: 2,
        caption: "<p><strong>FEBRUARY 14, 1859:  </strong>Happy Valentine's to the 33rd State! Oregon has the only double-sided flag in the US, showing the State seal on one side, and the State animal, a Beaver, on the reverse.</p>"
    },
    {
        question: "What is the capital of Oregon?",
        choice1: "Portland",
        choice2: "Eugene",
        choice3: "Salem",
        choice4: "Oregon City",
        answer: 3,
        caption: "<p><strong>SALEM:  </strong>Oregon City was the first capital, and the end of the Oregon Trail when Oregon was a Territory. Salem became its capital in 1852.</p>"
    },
    {
        question: "In 1873 what destroyed much of downtown Portland?",
        choice1: "Flooding",
        choice2: "Animal Rampage",
        choice3: "Wind Storm",
        choice4: "Fire",
        answer: 4,
        caption: "<p><strong>FIRE:  </strong>Early morning August 2, 1873 a fire started near SW 1st and Taylor at a furniture store, and destroyed over 20 square blocks. Some believe it was from the furniture varnish catching fire, others believed it was started by anti-Chinese arsonists. Rather than addressing structural or leadership issues, in response the city purchased a louder 4,000-pound warning bell.</p>"
    },
    {
        question: "Portland's nickname is:",
        choice1: "City of Roses",
        choice2: "Timber City",
        choice3: "Forest Park",
        choice4: "Coffeetown",
        answer: 1,
        caption: "<p><strong>CITY OF ROSES:  </strong>See roses around town at the International Rose Test Garden, Ladd's Addition neighborhood, and Peninsula Park. Other unofficial nicknames are: 'PDX' referencing the airport code, 'Stumptown' from the logging industry, 'Rip City' for the TrailBlazers, 'Bridgetown' for its 10 bridges over the Willamette river, and 'P-town'.</p>"
    },
    {
        question: "Before European settlement, the Portland basin area was populated by which indigenous group?",
        choice1: "Chinook",
        choice2: "Navajo",
        choice3: "Sioux",
        choice4: "Yakima",
        answer: 1,
        caption: "<p><strong>CHINOOK:  </strong>The land was inhabited for many centuries by two bands of indigenous Chinook people — the Multnomah and the Clackamas. The Chinook people occupying the land were first documented in 1805 by Meriwether Lewis and William Clark. Before its European settlement, the Portland Basin of the lower Columbia River and Willamette River valleys had been one of the most densely populated regions on the Pacific Coast.</p>"
    },
    {
        question: "Portland has a pedestrian bridge dedicated to which cartoon character?",
        choice1: "Mickey Mouse",
        choice2: "Ned Flanders",
        choice3: "Patrick Star",
        choice4: "Wile E. Coyote",
        answer: 2,
        caption: "<p><strong>NED FLANDERS:  </strong>'Hi-Diddly-Ho, neighborinos!' Crossing I-405 at Flanders St., the bridge honors 'The Simpson's' character created by Portland native Matt Groening. He graduated from Lincoln High School in SW Portland.</p>"
    },
    {
        question: "While in Portland you can visit both the biggest and smallest one of these.",
        choice1: "Parks",
        choice2: "Waterfalls",
        choice3: "Museums",
        choice4: "Coffee cups",
        answer: 1,
        caption: "<p><strong>PARKS:  </strong>Covering more than 5,000 acres, Forest Park is the largest wilderness park within city limits in the United States. Since 1971 The Guinness Book of Records has recognized Mill Ends Park as the smallest park in the world, measuring about 2 feet across.</p>"
    },
    {
        question: "Portland has this within city limits:",
        choice1: "Salmon fishery",
        choice2: "Largest waterfall in Oregon",
        choice3: "A volcano",
        choice4: "Goat farm",
        answer: 3,
        caption: "<p><strong>A VOLCANO:  </strong>Mt. Tabor is an extinct volcano which is home to a park with walking trails, large decommissioned open water reservoirs, and a beautiful view over the city. Mt. Tabor was named by an Oregon City pioneer's son after the Mt. Tabor near Nazareth, Israel.</p>"
    },
    {
        question: "Portland was named on a coin toss between being named after Portland, Maine, or this city:",
        choice1: "Providence",
        choice2: "Philadelphia",
        choice3: "Boston",
        choice4: "Chicago",
        answer: 3,
        caption: "<p><strong>BOSTON:  </strong>In 1845 Portland's two founders did a best of 3 coin toss — Francis Pettygrove who was from Portland, Maine, and Asa Lovejoy who was from Boston, Massachusetts. Streets in the Alphabet District of Portland are named after many city founders, NW Pettygrove St. and NW Lovejoy St. among them. </p>"
    },
    {
        question: "Portland had the first American team to compete in which event?",
        choice1: "Rugby World Cup",
        choice2: "Cricket World Cup",
        choice3: "Tour de France",
        choice4: "The Stanley Cup",
        answer: 4,
        caption: "<p><strong>THE STANLEY CUP:  </strong>The Portland Rosebuds won the league championship (their name is on the Stanley Cup!), but lost to the Montreal Canadiens in the 1916 Stanley Cup final. The team folded after four seasons. The team was revived in 1925 but was sold the next season to form the Chicago Blackhawks expansion team.</p>"
    },
    {
        question: "What game-changing product was invented in Portland?",
        choice1: "Velcro",
        choice2: "Phillips Screw",
        choice3: "Fluorescent Bulb",
        choice4: "Plexiglass",
        answer: 2,
        caption: "<p><strong>PHILLIPS SCREW:  </strong>John P. Thompson patented a self-centering screw (1932) and screw driver (1933) ideal for manufacturing. In 1935 he sold the patents to Henry Frank Phillips who was able to refine the designs and then popularize the screw.</p>"
    },
    {
        question: "The contiguous national average for annual precipitation is 30.3 inches, how much rain does Portland get?",
        choice1: "43.7",
        choice2: "29.5",
        choice3: "55.8",
        choice4: "39.3",
        answer: 1,
        caption: "<p><strong>43.7:  </strong>Portland is known for being rainy, but cities like Houston (55.6 in), New Orleans (63.4 in), and Atlanta (50.4 in) get more. More likely to drizzle than downpour, Portland does have some of the most days <i>with</i> rain.</p>"
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
        console.log(availableQuestions);
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
        
        captionText.innerHTML = currentQuestion.caption; //show text for caption
        cap.style.display = "block"; //unhide the div with caption

        console.log(selectedChoice.parentElement);
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