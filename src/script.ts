let order: number[] = [];
let clickedOrder: number[] = [];
let score: number = 0;
let record: number = 0;

// Pegando os elementos do placar
const scoreLabel = document.querySelector(".infos p:nth-child(1) label") as HTMLElement;
const recordLabel = document.querySelector(".infos p:nth-child(2) label") as HTMLElement;

const blue = document.querySelector(".blue") as HTMLElement | null;
const red = document.querySelector(".red") as HTMLElement | null;
const green = document.querySelector(".green") as HTMLElement | null;
const yellow = document.querySelector(".yellow") as HTMLElement | null;

if (!blue || !red || !green || !yellow || !scoreLabel || !recordLabel) {
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
    score++; // Aumenta a pontuação ao passar de nível
    updateScore(); // Atualiza o placar
    // alert(`Você acertou!\nPontuação: ${score}\nIniciando próximo nível!`);
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

  // alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
  order = [];
  clickedOrder = [];

  playGame();
};

const playGame = (): void => {
  // alert("Bem-vindo ao Genius! Iniciando novo jogo!");
  score = 0;
  updateScore(); // Reseta o placar
  nextLevel();
};

// Adicionando eventos de clique
red?.addEventListener("click", () => click(0));
green?.addEventListener("click", () => click(1));
blue?.addEventListener("click", () => click(2));
yellow?.addEventListener("click", () => click(3));

playGame();
