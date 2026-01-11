/*-- Animação Iniciar --*/
const botao = document.getElementById("btnIniciar");
const anima = document.getElementById("anima");

let iniciouAnimacao = false;

botao.addEventListener("click", () => {
    iniciouAnimacao = true;
    anima.classList.add("ativo");
});

// Escuta o fim da transição
anima.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform" && iniciouAnimacao) {
        window.location.href = "paginas/home.html";
    }
});

// Ao voltar para a página (mobile)
window.addEventListener("pageshow", () => {
    iniciouAnimacao = false;
    anima.classList.remove("ativo");
});
