const map = document.getElementById('map');
const wrapper = document.querySelector('.map-wrapper');

const locais = [
    {
    nome: "Metrô Tiradentes",
    desc: "Aqui fica o metrô Tiradentes. É a estação mais próxima da Etesp — literalmente do lado. Vão se acostumando com a vista. Vai ter dia em que vocês vão esperar amigos aqui, sair pra rolês, trombar com outros etespianos e, claro, evitar contato com alguns também.",
    img: "imgs/mapa/metro.jpg"
    },
    {
    nome: "Hipólito",
    desc: "Esse é o Hipólito, o habitat dos veteranos. Ele fica no caminho entre a sala de estudos e a praceta. Dizem que, dependendo do horário em que você passa por ali, dá pra ouvir gritos e choros de desespero dos vets.",
    img: "imgs/mapa/hipo.jpg"
    },
    {
    nome: "Praceta",
    desc: "Bem-vindos à Praceta, bixos! Esse é um patrimônio único da Etesp. É aqui que vocês matam aula, jogam conversa fora, descansam depois do almoço, dão risada… Aqui pode acontecer de tudo: de roda de capoeira até barraca de pastel com caldo de cana (sim, realmente aconteceu tudo isso kkkk).",
    img: "imgs/mapa/praceta.jpeg"
    }
]

/* DRAG */
let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

function startDrag(x, y) {
    isDragging = true;
    startX = x - currentX;
    startY = y - currentY;
}

function moveDrag(x, y) {
    if (!isDragging) return;

    currentX = x - startX;
    currentY = y - startY;

    const minX = wrapper.clientWidth - map.offsetWidth;
    const minY = wrapper.clientHeight - map.offsetHeight;

    currentX = Math.min(0, Math.max(minX, currentX));
    currentY = Math.min(0, Math.max(minY, currentY));

    map.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function endDrag() {
    isDragging = false;
}

/* MOUSE */
map.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
window.addEventListener('mouseup', endDrag);

/* TOUCH */
map.addEventListener('touchstart', e => {
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
});

map.addEventListener('touchmove', e => {
    const t = e.touches[0];
    moveDrag(t.clientX, t.clientY);
});

map.addEventListener('touchend', endDrag);

/* PAINEL DE INFORMAÇÕES */
const infoTitle = document.getElementById('infoTitle');
const infoDesc = document.getElementById('infoDesc');
const infoImage = document.getElementById('infoImage');

document.querySelectorAll('.region').forEach(region => {
    region.addEventListener('click', () => {
        const i = Number(region.dataset.valor);
        infoTitle.textContent = locais[i].nome;
        infoDesc.textContent = locais[i].desc;
        const imgSrc = locais[i].img;
        infoImage.innerHTML = imgSrc
            ? `<img src="${imgSrc}" 
            style="width:100%;height:100%;object-fit:cover;border-radius:14px;">`
            : `<span>Sem imagem</span>`;
    });
});
