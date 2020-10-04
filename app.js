/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scoreA = document.querySelector('#score-0');
let scoreB = document.querySelector('#score-1');
let rollA = document.querySelector('#current-0');
let rollB = document.querySelector('#current-1');
let dice = document.querySelector('.dice');
let scorePoints, rollPoints, activePlayer, diceValue;

onInit();



function onInit() {
    scorePoints = [0,0];
    rollPoints = 0;
    activePlayer = 0;
    diceValue = null;
    setInitialValues();
}

function setInitialValues() {
    scoreA.textContent = scorePoints[0];
    scoreB.textContent = scorePoints[1];
    rollA.textContent = rollB.textContent = 0;
    rollB.textContent = rollB.textContent = 0;
    dice.style.display = 'none';
    document.querySelector('.player-0-panel').className = 'player-0-panel active';
    document.querySelector('.player-1-panel').className = 'player-1-panel';
    document.querySelector('.player-name.winner').className = 'player-name';
    document.querySelector('.winner').className = '';
}

function generateRandom() {
    return Math.floor(Math.random() * 6) + 1;
}

function onRoll() {
    let currentRoll = document.querySelector(`#current-${activePlayer}`);
    let currentRollValue = parseInt(currentRoll.textContent);
    let randomValue = generateRandom();
    if(rollPoints != 0 && randomValue == 1) {
        dice.src = 'dice-1.png';
        rollPoints = 0;
        currentRoll.textContent = 0;
        scorePoints[activePlayer] = 0;
        changeActivePlayer();
        setScore();
        return false;
    }
    let totalValue = currentRollValue + randomValue;

    currentRoll.textContent = totalValue;
    dice.src = `dice-${randomValue}.png`;
    dice.style.display = 'block'
    rollPoints = totalValue;
    return true;
}

function onHold() {
    scorePoints[activePlayer] += rollPoints;

    if(scorePoints[activePlayer] >= 40) {
        document.querySelector(`#name-${activePlayer}`).className = 'player-name winner';
        document.querySelector(`.player-${activePlayer}-panel`).className = `player-${activePlayer}-panel active`;
    }

    zerarRoll();
    changeActivePlayer();
    setScore();
}

function changeActivePlayer() {
    activePlayer = (activePlayer === 0) ? 1 : 0;
    document.querySelector(`.player-${activePlayer}-panel`).className = `player-${activePlayer}-panel active`;
    
    let otherPlayer = (activePlayer === 0) ? 1 : 0;
    document.querySelector(`.player-${otherPlayer}-panel`).className = `player-${otherPlayer}-panel`;

}

function setScore() {
    scoreA.textContent = scorePoints[0];
    scoreB.textContent = scorePoints[1];
}

function zerarRoll() {
    rollA.textContent = 0;
    rollB.textContent = 0;
    rollPoints = 0;
}