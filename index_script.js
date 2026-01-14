/*-- Animação de Abertura--*/
const botao = document.getElementById("btnIniciar");
const anima = document.getElementById("anima");

window.addEventListener("pageshow", (event) => {
    anima.classList.remove("ativo");
});

botao.addEventListener("click", () => {

    anima.classList.add("ativo");


    const redirecionar = (event) => {
        if (!event || event.propertyName === "transform") {
            window.location.href = "paginas/home.html";
        }
    };

    anima.addEventListener("transitionend", redirecionar, { once: true });

    setTimeout(() => {
        redirecionar();
    }, 900);
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