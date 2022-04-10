// const username = document.getElementById('username');
// const saveScoreBtn = document.getElementById('saveScoreBtn');
// const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
//JSON.parse to turn into String
//get what's there or initial empty array if nothing yet otherwise returns null

// const MAX_HIGH_SCORES = 5;

finalScore.innerText = "You scored " + mostRecentScore + " out of 12"; //score is stored as string in local storage


// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = (e) => {
//     e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value
//     };
    
//     /// push to scores, sort scores, limit display to 5 scores
    
//     highScores.push(score); // add to list
//     highScores.sort( (a,b) => b.score - a.score); //if b score is higher than a return b before a
//     highScores.splice(5); // limit list to index 5

//     localStorage.setItem('highScores', JSON.stringify(highScores)); //Stringify into JSON so it can be saved as a string
//     //console.log(highScores);
//     window.location.assign('/highscores');
// }