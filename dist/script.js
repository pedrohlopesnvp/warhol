"use strict";
let order = [];
let clickedOrder = [];
let score = 0;
let record = 0;
// Pegando os elementos do placar
const scoreLabel = document.querySelector(".infos p:nth-child(1) label");
const recordLabel = document.querySelector(".infos p:nth-child(2) label");
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
if (!blue || !red || !green || !yellow || !scoreLabel || !recordLabel) {
    throw new Error("Elementos do DOM não encontrados.");
}
const updateScore = () => {
    scoreLabel.textContent = score.toString();
};
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];
    order.forEach((color, index) => {
        let elementColor = createColorElement(color);
        if (elementColor) {
            lightColor(elementColor, index + 1);
        }
    });
};
const lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add("selected");
    }, number - 400);
    setTimeout(() => {
        element.classList.remove("selected");
    }, number - 200);
};
const checkOrder = () => {
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
const click = (color) => {
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
const createColorElement = (color) => {
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
const nextLevel = () => {
    shuffleOrder();
};
const gameOver = () => {
    if (score > record) {
        record = score;
        recordLabel.textContent = record.toString();
    }
    // alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
    order = [];
    clickedOrder = [];
    playGame();
};
const playGame = () => {
    // alert("Bem-vindo ao Genius! Iniciando novo jogo!");
    score = 0;
    updateScore(); // Reseta o placar
    nextLevel();
};
// Adicionando eventos de clique
red === null || red === void 0 ? void 0 : red.addEventListener("click", () => click(0));
green === null || green === void 0 ? void 0 : green.addEventListener("click", () => click(1));
blue === null || blue === void 0 ? void 0 : blue.addEventListener("click", () => click(2));
yellow === null || yellow === void 0 ? void 0 : yellow.addEventListener("click", () => click(3));
playGame();
