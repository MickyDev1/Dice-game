"use strict";

// Selecting all the elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const dice1 = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting the game at initial state
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice1.classList.add("hide");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//BUTTON ROLL
// Rolling dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    //let us generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // let us  display  dice
    dice1.classList.remove("hide");
    dice1.src = `dice-${dice}.png`;

    // Checking if not rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//BUTTON HOLD
btnHold.addEventListener("click", function () {
  if (playing) {
    // Adding current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Checking if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // the game should finish
      playing = false;
      dice1.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //  to Switch  the next player
      switchPlayer();
    }
  }
});

//reseting the game to initial state
btnNew.addEventListener("click", init);