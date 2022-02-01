const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //get what's there or initial empty array if nothing yet

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore; //score is stored as string in local storage


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    
    /// push to scores, sort scores, limit display to 5 scores
    
    highScores.push(score); 
    highScores.sort( (a,b) => b.score - a.score); //if b score is higher than a put b before a
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(highScores);
}