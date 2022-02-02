// variables and constants for the game
let word = "";
let fontSize = 70;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let failsCounter = 0;
let gameStarted = false;
let failLetters = "";
let writedLetters = "";
const startButton = document.querySelector("#start_button");
const addButton = document.querySelector("#add_button");
const inputNewWord = document.querySelector("#input_new_word");
const showWordsListLink = document.querySelector("#show_words_list_link");
const wordsList = document.querySelector("#words_list");

// list of words to be used in the game
let words = [
  "LEON",
  "TIGRE",
  "ELEFANTE",
  "GATO",
  "CABALLO",
  "PERRO",
  "CABRA",
  "CERDO",
  "RATON",
  "MONO",
  "BALLENA",
  "JIRAFA",
  "COCODRILO",
];

// Functions

const randomWord = () => {
  // get a random word from the list
  let random = Math.floor(Math.random() * words.length);
  return words[random];
};

const drawSpaces = (word) => {
  // draw "_" for each letter in the word in the canvas
  for (let i = 0; i < word.length; i++) {
    ctx.fillStyle = "#000";
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(
      "_",
      i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
      canvasHeight - 300
    );
  }
};

const start = () => {
  // start the game
  startGame();
  word = randomWord();
  drawSpaces(word);
  drawFloor();
  console.log(word);
  window.scrollTo(0, 100);
  gameStarted = true;
};

const restart = () => {
  // restart the game
  window.location.reload();
};

const addNewWord = () => {
  // add a new word to the list
  let newWord = inputNewWord.value;
  words.push(newWord);
  inputNewWord.value = "";
  console.log(words);
  showWordsList();
};

const showWordsList = () => {
  // show the list of words
  wordsList.style.display = "block";
  wordsList.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = words[i];
    wordsList.appendChild(li);
  }
};

const inputToUppercase = (input) => {
  // input to upercase letters
  input.value = input.value.toUpperCase();
};

const createRestartButton = () => {
  // create Restart Button in front of the canvas
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart";
  restartButton.classList.add("restart_button");
  restartButton.style.display = "inherit";
  restartButton.addEventListener("click", () => {
    restart();
  });
  canvas.parentNode.insertBefore(restartButton, canvas);
};

const addLetterInWritedLetters = (letter) => {
  // add letter in the array of writed letters
  let ammountOfLetterInWord = word
    .split("")
    .filter((el) => el === letter).length;
  let ammountOfletterInWritedLetters = writedLetters
    .split("")
    .filter((el) => el === letter).length;
  if (ammountOfLetterInWord > ammountOfletterInWritedLetters) {
    writedLetters += letter;
  }
};

const checkLetter = (letter) => {
  // check if letter is in word
  let correct = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter && failLetters.includes(letter) === false) {
      correct = true;
    }
  }
  return correct;
};

const checkIfWon = () => {
  // check if the user won
  if (writedLetters.length === word.length) {
    return true;
  }
  return false;
};

const checkIfLost = () => {
  // if the user lost
  if (failsCounter === 9) {
    return true;
  }
};

// Event Listeners

// Start Game
startButton.addEventListener("click", start);

// use input to upercase letters
inputNewWord.addEventListener("keyup", (e) => {
  inputToUppercase(e.target);
});

// Add New Word to the list
addButton.addEventListener("click", addNewWord);

// Show the list of words
showWordsListLink.addEventListener("click", showWordsList);

// Check if the letter is correct or not
document.addEventListener("keypress", (e) => {
  // letter to uppercase
  let letter = e.key.toUpperCase();
  if (checkLetter(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hit = true;
        ctx.fillStyle = "#000";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(
          letter,
          i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
          canvasHeight - 300
        );
        addLetterInWritedLetters(letter);
      }
    }

    console.log(writedLetters);
  }
  drawFail(checkLetter(letter), letter);

  if (checkIfWon()) {
    drawWinMessage();
  }
  if (checkIfLost()) {
    drawLostMessage();
  }
});
