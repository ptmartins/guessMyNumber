'use strict';

(function () {

    let gameNumber = null,
        score = 20,
        highscore = null;


    const

        /**
         * Object that caches all necessary DOM elements 
         */
        DOM = {},

        /**
         * Message to display when the guess is correct
         */
        message = {
            initial: 'Start guessing...',
            success: `You won! 🎉🎉🎉`,
            tooLow: `Too low!  Try again!`,
            tooHigh: `Too high!  Try again!`,
            lost: `You lost!  Try again!`
        },

        /**
         * Generate a random number between 1 and 20
         */
        generateGameNumber = () => {
            gameNumber = Math.trunc(Math.random() * 100) + 1;
        },

        /**
         * Cache all necessary DOM elements
         */
        cacheDOM = () => {
            DOM.number = document.querySelector('.number');
            DOM.guess = document.querySelector('.guess');
            DOM.check = document.querySelector('.check');
            DOM.newGame = document.querySelector('.newGame');
            DOM.message = document.querySelector('.message');
            DOM.score = document.querySelector('.score');
            DOM.highscore = document.querySelector('.highscore');
            DOM.newGame = document.querySelector('.newGame');

        },

        /**
         * Check if the guess is correct
         */
        checkGuess = () => {
            let value = +DOM.guess.value;
            if (gameNumber === value) {
                showSuccess();
            } else {
                handleFail(value);
            }
        },

        /**
         * Handle the fail case
         */
        handleFail = (value) => {
            if (value < gameNumber) {
                DOM.message.textContent = message.tooLow;
            } else {
                DOM.message.textContent = message.tooHigh;
            }

            if (score > 1) {
                score--;
                DOM.score.textContent = score;
            }

            if (score === 1) {
                DOM.message.textContent = message.lost;
                DOM.score.textContent = 0;
                DOM.check.disabled = true;
            }

            DOM.guess.value = '';
        },

        /**
         * Show the success message
         */
        showSuccess = () => {
            DOM.message.textContent = message.success;
            DOM.message.classList.add('success');
            DOM.number.classList.add('success');
            updateHighScore(score);
            DOM.number.textContent = gameNumber;
            DOM.check.disabled = true;
            DOM.guess.value = '';
        },

        /**
         * Update highscore
         */
        updateHighScore = (newScore) => {
            if (newScore > highscore) {
                highscore = newScore;
                DOM.highscore.textContent = highscore;
            }
        },

        /**
         * Resets score
         */
        resetScore = () => {
            score = 20;
            DOM.score.textContent = score;
        },

        /**
         * Start a new game
         */
        startNewGame = () => {
            DOM.number.textContent = '?';
            DOM.message.textContent = message.initial;
            DOM.check.disabled ? DOM.check.disabled = false : null;
            resetScore();

            clearSuccess();
        },

        /**
         * Clear success message
         */
        clearSuccess = () => {
            DOM.message.classList.contains('success') ? DOM.message.classList.remove('success') : null;
            DOM.number.classList.contains('success') ? DOM.number.classList.remove('success') : null;
            DOM.guess.value = '';
        },

        /**
         * Setup event listeners
         */
        setupEvents = () => {
            DOM.check.addEventListener('click', checkGuess);
            DOM.newGame.addEventListener('click', startNewGame);
        },

        /**
         * Initialize the app
         */
        init = () => {
            cacheDOM();
            generateGameNumber();
            console.log(gameNumber);
            setupEvents();
        };

    window.addEventListener('DOMContentLoaded', init);
})()