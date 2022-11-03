const getEl = x => document.querySelector(x);

const startRef = getEl('button[data-start]');
const stopRef = getEl('button[data-stop]');
let intervalID = null;

startRef.addEventListener('click', changeBGColor);
stopRef.addEventListener('click', intervalDelete);
stopRef.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBGColor() {
  startRef.disabled = true;
  stopRef.disabled = false;
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function intervalDelete() {
  startRef.disabled = false;
  stopRef.disabled = true;
  clearInterval(intervalID);
}
