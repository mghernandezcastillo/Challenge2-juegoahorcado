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

// Event Listeners


