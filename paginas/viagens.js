// ====== DADOS ======
const trips = [
    {
        id: "paranapiacaba",
        year: "1º ano",
        title: "PARANAPIACABA",
        badge: "Paranapiacaba • 1º ano",
        cover: "../paginas/imgs/viagens/paranapiacaba_capa.jpg",
        teaser: "Paranapiacaba, distrito com forte ação ferroviária inglesa,"+ 
        "hoje histórico(e tem quem diga que é assombrado por bruxas!)",
        story:
            "Em uma das viagens do 1° ano vocês terão a oportunidade de conhecer Paranapiacaba, um vilarejo cheio de história e com um clima único." +
            "O lugar é palco de muito aprendizado e diversão, proporcionando risadas, por conta das trilhas em meio a lama, e conhecimento, afinal, paranapiacaba é o berço de muitas histórias e antiguidades. " ,
        gallery: [
            "../paginas/imgs/viagens/paranapiacaba_1.jpg",
            "../paginas/imgs/viagens/paranapiacaba_2.png",
            "../paginas/imgs/viagens/paranapiacaba_3.png"
        ]
    },
    {
        id: "santos",
        year: "1º ano",
        title: "SANTOS",
        badge: "Santos • 1º ano",
        cover: "../paginas/imgs/viagens/santos_capa.png",
        teaser: "Localizado na Baixada Santista, região litorânea de São Paulo, com museus históricos do Café e do grande Rei Pelé!!",
        story:
            "Adicionado á pouco tempo, mas adorado por muitos, temos o passeio ao Porto de Santos. " +
            "As aventuras em meio ao litoral e suas praias são uma das mais marcantes do primeiro ano. " +
            " Com visitas aos museus e passeio de escuna, onde vocês poderão fazer alguns mergulhos (se tiverem coragem) e apreciar a vista do mar. ",
        gallery: [
            "../paginas/imgs/viagens/santos_1.jpg",
            "../paginas/imgs/viagens/santos_2.jpg",
            "../paginas/imgs/viagens/santos_3.png"
        ]
    },
    {
        id: "cananeia",
        year: "2º ano",
        title: "CANANÉIA",
        badge: "Cananéia • 2º ano",
        cover: "../paginas/imgs/viagens/cananeia_capa.jpg",
        teaser: "Já imaginou passar 3 dias em um chalé em frente à praia, em uma ilha, com os amigos?",
        story:
            "No momento em que se tornarem vermes, poderão passar uma estadia de 3 dias em Cananéia, na incrível Ilha do Cardoso, que é palco de muita risada e diversão!!!  " +
            "Foram dias com trilhas, praia, risadas e aquela sensação de estar vivendo algo que vai virar uma memória incrível.Vocês poderão conhecer a região preservada por caiçaras, explorar o Poço das Antas, se sujar no manguezal, curtir a praia e, de quebra, conhecer um pouco da cidade e da história de Cananeia!!! " +
            "Leva repelente, tênis confortável e prepara a câmera!",
        gallery: [
            "../paginas/imgs/viagens/cananeia_1.jpg",
            "../paginas/imgs/viagens/cananeia_2.JPG",
            "../paginas/imgs/viagens/cananeia_3.jpg"
        ]
    },
    {
        id: "petar",
        year: "3º ano",
        title: "PETAR",
        badge: "Petar • 3º ano",
        cover: "../paginas/imgs/viagens/petar_capa.png",
        teaser: "Parque Estadual Turístico do Alto Ribeira. e se aventurar nas cavernas e paisagens lindas do extremo sul paulista!",
        story:
            "Quando finalmente virarem gente e se tornarem Vets, irão conhecer o PETAR, que assim " +
            "Quando finalmente virarem gente e se tornarem Vets, irão conhecer o PETAR, que assim como os outros passeios é memorável, e aproveitem bastante, pois vai ser o ultimo. " ,
        gallery: [
            "../paginas/imgs/viagens/petar_1.jpg",
            "../paginas/imgs/viagens/petar_2.png",
            "../paginas/imgs/viagens/petar_3.png"
        ]
    }
];

// ====== ELEMENTOS ======
const viewport = document.getElementById("carouselViewport");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const tripTitle = document.getElementById("tripTitle");
const tripTeaser = document.getElementById("tripTeaser");
const openStoryBtn = document.getElementById("openStoryBtn");

const storyOverlay = document.getElementById("storyOverlay");
const sheet = document.getElementById("sheet");
const closeSheetBtn = document.getElementById("closeSheetBtn");
const closeSheetBtn2 = document.getElementById("closeSheetBtn2");

const sheetKicker = document.getElementById("sheetKicker");
const sheetTitle = document.getElementById("sheetTitle");
const sheetText = document.getElementById("sheetText");
const miniGallery = document.getElementById("miniGallery");

// ====== RENDER ======
function createSlide(trip, index) {
    const slide = document.createElement("article");
    slide.className = "v-slide";
    slide.setAttribute("data-index", index);

    slide.innerHTML = `
        <div class="v-badge">${trip.badge}</div>
        <img src="${trip.cover}" alt="Foto da viagem: ${trip.title}">
        <div class="v-gradient"></div>
        <div class="v-slide-title">${trip.title}</div>
    `;
    return slide;
}

function createDot(index) {
    const dot = document.createElement("button");
    dot.className = "v-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o item ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    return dot;
}

function render() {
    viewport.innerHTML = "";
    dotsEl.innerHTML = "";

    trips.forEach((trip, i) => {
        viewport.appendChild(createSlide(trip, i));
        dotsEl.appendChild(createDot(i));
    });

    updateUI(0);
    setActiveDot(0);
}

render();

// ====== CONTROLE DO CARROSSEL ======
let currentIndex = 0;

function slideWidth() {
    return viewport.clientWidth;
}

function goTo(index) {
    currentIndex = Math.max(0, Math.min(trips.length - 1, index));
    viewport.scrollTo({
        left: currentIndex * slideWidth(),
        behavior: "smooth"
    });
    updateUI(currentIndex);
    setActiveDot(currentIndex);
}

function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

let scrollTimeout = null;
viewport.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const idx = Math.round(viewport.scrollLeft / slideWidth());
        if (idx !== currentIndex) {
            currentIndex = idx;
            updateUI(currentIndex);
            setActiveDot(currentIndex);
        }
    }, 80);
});

window.addEventListener("resize", () => {
    viewport.scrollTo({ left: currentIndex * slideWidth() });
});

// ====== UI (resumo embaixo) ======
function updateUI(index) {
    const t = trips[index];
    tripTitle.textContent = t.title;
    tripTeaser.textContent = t.teaser;
    openStoryBtn.setAttribute("data-open-id", t.id);
}

function setActiveDot(index) {
    const dots = [...dotsEl.querySelectorAll(".v-dot")];
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

// ====== BOTTOM SHEET ======
function openSheetByIndex(index) {
    const t = trips[index];

    sheetKicker.textContent = t.badge;
    sheetTitle.textContent = t.title;
    sheetText.textContent = t.story;

    miniGallery.innerHTML = "";
    t.gallery.forEach((src) => {
        const div = document.createElement("div");
        div.className = "v-thumb";
        div.innerHTML = `<img src="${src}" alt="Foto da viagem: ${t.title}">`;
        miniGallery.appendChild(div);
    });

    storyOverlay.hidden = false;
    sheet.hidden = false;

    requestAnimationFrame(() => {
        sheet.classList.add("open");
    });

    document.body.style.overflow = "hidden";
}

function closeSheet() {
    sheet.classList.remove("open");
    storyOverlay.hidden = true;

    setTimeout(() => {
        sheet.hidden = true;
        // se a imagem fullscreen NÃO estiver aberta, libera o scroll
        if (imgOverlay && imgOverlay.hidden) document.body.style.overflow = "";
    }, 220);
}

openStoryBtn.addEventListener("click", () => {
    openSheetByIndex(currentIndex);
});

closeSheetBtn.addEventListener("click", closeSheet);
closeSheetBtn2.addEventListener("click", closeSheet);
storyOverlay.addEventListener("click", closeSheet);

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !sheet.hidden) closeSheet();
});

window.addEventListener("keydown", (e) => {
    if (!sheet.hidden) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});


// ====== IMAGEM EM TELA CHEIA (CORRIGIDO) ======
const imgOverlay = document.getElementById("imgOverlay");
const imgOverlayContent = document.getElementById("imgOverlayContent");
const imgCloseBtn = document.getElementById("imgCloseBtn");

// Abre ao clicar numa thumb (delegação)
miniGallery.addEventListener("click", (e) => {
    const clickedImg = e.target.closest(".v-thumb img");
    if (!clickedImg) return;

    imgOverlayContent.src = clickedImg.src;
    imgOverlay.hidden = false;

    // mantém travado (sheet já trava), mas garante:
    document.body.style.overflow = "hidden";
});

function closeImageOverlay() {
    imgOverlay.hidden = true;
    imgOverlayContent.src = "";

    // se o sheet ainda estiver aberto, mantém o body travado
    document.body.style.overflow = sheet.hidden ? "" : "hidden";
}

imgCloseBtn.addEventListener("click", closeImageOverlay);

// clicar fora da imagem fecha
imgOverlay.addEventListener("click", (e) => {
    // se clicou no fundo (e não na imagem/botão), fecha
    if (e.target === imgOverlay) closeImageOverlay();
});

// evita que clique na imagem feche (por segurança)
imgOverlayContent.addEventListener("click", (e) => {
    e.stopPropagation();
});

// ESC fecha a imagem (prioridade)
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imgOverlay && !imgOverlay.hidden) {
        closeImageOverlay();
    }
});





