const botao = document.getElementById("btnIniciar");
const anima = document.getElementById("anima");

// 1. O "Reset" para o botão voltar
window.addEventListener("pageshow", (event) => {
    // Se a página veio do cache de navegação, removemos a classe
    if (event.persisted) {
        anima.classList.remove("ativo");
    }
});

// 2. Iniciar animação
botao.addEventListener("click", () => {
    anima.classList.add("ativo");
});

// 3. Troca de tela
anima.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform") {
        window.location.href = "paginas/home.html";
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