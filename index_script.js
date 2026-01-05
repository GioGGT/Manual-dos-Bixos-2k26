/*-- Animação Iniciar --*/
const botao = document.getElementById("btnIniciar");
const anima = document.getElementById("anima");

botao.addEventListener("click", () => {
    anima.classList.add("ativo");
});

// Escuta o fim da transição
anima.addEventListener("transitionend", (event) => {
if (event.propertyName === "transform") {
    // Troca de tela
    window.location.href = "outra-pagina.html";
    }
});

/*-- Animação Texto --*/
const palavras = ["O", "E", "ET", "ETE", "ET", "E"];
let indice = 0;

function animar() {
  document.getElementById("dinamico").textContent = palavras[indice];
  indice = (indice + 1) % palavras.length;
  setTimeout(animar, 600);
}

animar();