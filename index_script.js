const botao = document.getElementById("btnIniciar");
const anima = document.getElementById("anima");

botao.addEventListener("click", () => {
    anima.classList.add("ativo");

    const handleTransition = (event) => {
        if (event.propertyName === "transform") {
            window.location.href = "paginas/home.html";
        }
    };

    anima.addEventListener("transitionend", handleTransition, { once: true });

    // Fallback de segurança: se após 1s não mudou de página, força a mudança
    setTimeout(() => {
        window.location.href = "paginas/home.html";
    }, 1000);
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        anima.classList.remove("ativo");
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