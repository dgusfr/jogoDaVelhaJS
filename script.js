let jogoAcabou = false;
let pontuacaoX = 0;
let pontuacaoO = 0;

let jogadorAtual = "X";
let tabuleiro = Array(9).fill(null);

const elementoTabuleiro = document.getElementById("board");
const celulas = Array.from(elementoTabuleiro.querySelectorAll(".celula"));

function verificarVencedor() {
  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[a] === tabuleiro[c]
    ) {
      jogoAcabou = true;
      const vencedor = jogadorAtual === "X" ? "Jogador X" : "Jogador O";
      if (jogadorAtual === "X") {
        pontuacaoX++;
      } else {
        pontuacaoO++;
      }
      setTimeout(() => {
        alert(`${vencedor} venceu!`);
        reiniciarJogo();
      }, 100);
      return;
    }
  }

  if (!tabuleiro.includes(null)) {
    jogoAcabou = true;
    setTimeout(() => {
      alert("Empate!");
      reiniciarJogo();
    }, 100);
  }
}

function atualizarPontuacao() {
  document.getElementById(
    "pontuacao"
  ).textContent = `Jogador (X) - ${pontuacaoX} | Jogador (O) - ${pontuacaoO}`;
}

function reiniciarJogo() {
  tabuleiro.fill(null);
  jogoAcabou = false;
  celulas.forEach((celula) => (celula.textContent = ""));
  atualizarPontuacao();
}

document.querySelectorAll(".celula").forEach((celula, indice) => {
  celula.addEventListener("click", () => {
    if (!jogoAcabou && !tabuleiro[indice]) {
      tabuleiro[indice] = jogadorAtual;
      celula.textContent = jogadorAtual;
      verificarVencedor();
      jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    }
  });
});

window.onload = reiniciarJogo;
