let order = [];
let clickedOrder = [];
let score = 0;

//0 - red : e61125
//1 - yellow : fffb09
//2 - green : 90b80a
//3 - blue : 0485ed

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//random logic
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 400);

  setTimeout(() => {
    element.classList.remove("selected");
  }, number - 200);
};

let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Você acertou!\nPontuação: ${score}\nIniciando próximo nível!`);
    nextLevel();
  }
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 200);
};

let createColorElement = (color) => {
  if (color == 0) {
    return red;
  } else if (color == 1) {
    return green;
  } else if (color == 2) {
    return blue;
  } else if (color == 3) {
    return yellow;
  }
};

let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

let playGame = () => {
  alert("Bem vindo ao Genius! Iniciando novo jogo!");
  score = 0;

  nextLevel();
};

red.onclick = () => click(0);
green.onclick = () => click(1);
blue.onclick = () => click(2);
yellow.onclick = () => click(3);

playGame();
