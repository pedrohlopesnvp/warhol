let order: number[] = [];
let clickedOrder: number[] = [];
let score: number = 0;
let record: number = 0;

// Pegando os elementos do placar
const scoreLabel = document.querySelector(".infos p:nth-child(2) label") as HTMLElement;
const recordLabel = document.querySelector(".infos p:nth-child(3) label") as HTMLElement;
const restartButton = document.querySelector(".restart") as HTMLElement;

// Elementos da tela de início
const startScreen = document.querySelector(".start-screen") as HTMLElement;
const playButton = document.querySelector(".play-button") as HTMLElement;

const blue = document.querySelector(".blue") as HTMLElement | null;
const red = document.querySelector(".red") as HTMLElement | null;
const green = document.querySelector(".green") as HTMLElement | null;
const yellow = document.querySelector(".yellow") as HTMLElement | null;

if (!blue || !red || !green || !yellow || !scoreLabel || !recordLabel || !restartButton || !startScreen || !playButton) {
  throw new Error("Elementos do DOM não encontrados.");
}

const updateScore = (): void => {
  scoreLabel.textContent = score.toString();
};

const shuffleOrder = (): void => {
  let colorOrder: number = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];

  order.forEach((color, index) => {
    let elementColor = createColorElement(color);
    if (elementColor) {
      lightColor(elementColor, index + 1);
    }
  });
};

const lightColor = (element: HTMLElement, number: number): void => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 400);

  setTimeout(() => {
    element.classList.remove("selected");
  }, number - 200);
};

const checkOrder = (): void => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      return;
    }
  }
  if (clickedOrder.length === order.length) {
    score++;
    updateScore();
    nextLevel();
  }
};

const click = (color: number): void => {
  clickedOrder.push(color);
  const element = createColorElement(color);
  if (element) {
    element.classList.add("selected");
    setTimeout(() => {
      element.classList.remove("selected");
      checkOrder();
    }, 200);
  }
};

const createColorElement = (color: number): HTMLElement | null => {
  switch (color) {
    case 0:
      return red;
    case 1:
      return green;
    case 2:
      return blue;
    case 3:
      return yellow;
    default:
      return null;
  }
};

const nextLevel = (): void => {
  shuffleOrder();
};

const gameOver = (): void => {
  if (score > record) {
    record = score;
    recordLabel.textContent = record.toString();
  }
  order = [];
  clickedOrder = [];

  restartGame()
};

const playGame = (): void => {
  score = 0;
  updateScore();
  nextLevel();
};

const restartGame = (): void => {
  if (score > record) {
    record = score;
    recordLabel.textContent = record.toString();
  }
  order = [];
  clickedOrder = [];
  score = 0;
  updateScore();
  nextLevel();
};

// Função para iniciar o jogo e esconder a tela de início
const startGame = (): void => {
  startScreen.classList.add("hidden"); // Esconde a tela de início
  playGame(); // Inicia o jogo
};

// Adicionando eventos de clique
red?.addEventListener("click", () => click(0));
green?.addEventListener("click", () => click(1));
blue?.addEventListener("click", () => click(2));
yellow?.addEventListener("click", () => click(3));

// Evento para reiniciar o jogo
restartButton.addEventListener("click", () => restartGame());

// Evento para o botão "Jogar" na tela de início
playButton.addEventListener("click", () => startGame());