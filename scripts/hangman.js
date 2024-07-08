const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters=[], wrongGuessCount;
const maxGuesses = 6;

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

function getRandomWord() {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;

    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame();
}



for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}



function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else {
        wrongGuessCount++;
        // hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
        switch (wrongGuessCount) {
            case 0:
                hangmanImage.src = "images/hangman-post.svg"
                break;
            case 1:
              hangmanImage.src = "images/hangman-head.svg";
              break;
            case 2:
              hangmanImage.src = "images/hangman-body.svg";
              break;
            case 3:
                hangmanImage.src = "images/hangman-right-arm.svg";
                break;
            case 4:
                hangmanImage.src = "images/hangman-left-arm.svg";
                break;
            case 5:
                hangmanImage.src = "images/hangman-right-leg.svg";
                break;
            case 6:
                hangmanImage.src = "images/hangman-left-leg.svg";
                break;
            
          }
    }
    button.disabled = true;
    guessesText.innerHTML = `${wrongGuessCount}/${maxGuesses}`

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

function gameOver(isVictory) {
    setTimeout(() => {

        if (isVictory) {
            document.getElementById('win_sound').play(); 
        } 
        else {
            document.getElementById('lose_sound').play();
        }
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerHTML = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        
       
        gameModal.classList.add("show");
    }, 300);
}

function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    // hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    hangmanImage.src="images/hangman.svg"
    guessesText.innerHTML = `${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

