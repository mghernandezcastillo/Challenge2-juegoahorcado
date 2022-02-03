const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// variables
const container = document.querySelector(".container");

// Functions


const showCanvas = () => {
  // show canvas
  canvas.style.display = "block";
};

const hideContainer = () => {
  // hide container
  container.style.display = "none";
};

const fillCanvas = () => {
  // fill canvas
  ctx.fillStyle = "#c5d4e6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const startGame = () => {
  // start game
  hideContainer();
  showCanvas();
  fillCanvas();
};

const drawRect = (x, y, width, height, color) => {
  // draw a rectangle
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawLine = (x1, y1, x2, y2) => {
  // draw a line
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = 10;
  ctx.stroke();
};

const drawFailsLetters = (word) => {
  // draw the letters that the user has already used
  ctx.clearRect(0, canvasHeight - 265, canvasWidth, canvasHeight);
  drawRect(0, canvasHeight - 265, canvasWidth, canvasHeight, "#c5d4e6");

  ctx.fillStyle = "gray";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(word, canvasWidth / 2, canvasHeight - 190);
};

// Functions to draw the hangman
const drawFloor = () =>  drawRect((canvasWidth - 400) / 2, 400, 400, 10, "#000");

const drawTrunk = () => drawRect((canvasWidth - 400) / 2, 400, 10, -370, "#000");

const drawRoof = () => drawRect((canvasWidth - 400) / 2, 30, 250, -10, "#000");

const drawRope = () => drawRect(canvasWidth / 2 - 5, 30, 10, 55, "#000");

const drawHead = () => {
  // draw the head
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, 125, 40, 0, Math.PI * 2, false);
  ctx.fillStyle = "lightgray";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
};

const drawBody = () => drawRect(canvasWidth / 2 - 5, 164, 10, 150, "#000");

const drawFirstLeg = () => drawLine(canvasWidth / 2, 310, 550, 380);

const drawSecondLeg = () => drawLine(canvasWidth / 2, 310, 650, 380);

const drawFirstArm = () => drawLine(canvasWidth / 2, 164, 550, 240);

const drawSecondArm = () => drawLine(canvasWidth / 2, 164, 650, 240);



const drawFail = (flag, letter) => {
  // draw the hangman when the user fails
  if (!flag && failLetters.includes(letter) === false) {
    failsCounter++;
    failsCounter===1 ? drawTrunk() : null;
    failsCounter===2 ? drawRoof() : null;
    failsCounter===3 ? drawRope() : null;
    failsCounter===4 ? drawHead() : null;
    failsCounter===5 ? drawBody() : null;
    failsCounter===6 ? drawFirstLeg() : null;
    failsCounter===7 ? drawSecondLeg() : null;
    failsCounter===8 ? drawFirstArm() : null;
    failsCounter===9 ? drawSecondArm() : null;
    failLetters += letter;
    drawFailsLetters(failLetters.split("").join(" "));
  }
};

const drawWinMessage = () => {
  // draw the win message
  ctx.fillStyle = "darkgreen";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("You Won!", 900, canvasHeight / 4);
  if (gameStarted) {
    createRestartButton();
  }
};

const drawLostMessage = () => {
  // draw lost message
  ctx.fillStyle = "#ff0000";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("End Game!", 900, canvasHeight / 4);
  ctx.fillStyle = "#000";
  ctx.font = `45px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(`La palabra era: ${word}`, 900, canvasHeight / 4 + 100);
  if (gameStarted) {
    createRestartButton();
  }
};


