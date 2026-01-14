// ====== DADOS ======
const trips = [
    {
        id: "paranapiacaba",
        year: "1º ano",
        title: "PARANAPIACABA",
        badge: "Paranapiacaba • 1º ano",
        cover: "img/paranapiacaba_capa.jpg",
        teaser: "Centro histórico, passeio de barco e aquele clima de viagem que junta todo mundo.",
        story:
            "Paraty é aquele lugar que mistura história com paisagem bonita. " +
            "A turma geralmente curte o centro histórico, passeio de barco e muita foto. " +
            "Dica: chinelo + tênis, porque tem pedra e também tem água.",
        gallery: [
            "imgs/image.png",
            "img/paraty_2.jpg",
            "img/paraty_3.jpg"
        ]
    },
    {
        id: "santos",
        year: "1º ano",
        title: "SANTOS",
        badge: "Santos • 1º ano",
        cover: "img/santos_capa.jpg",
        teaser: "Centro histórico, passeio de barco e aquele clima de viagem que junta todo mundo.",
        story:
            "Paraty é aquele lugar que mistura história com paisagem bonita. " +
            "A turma geralmente curte o centro histórico, passeio de barco e muita foto. " +
            "Dica: chinelo + tênis, porque tem pedra e também tem água.",
        gallery: [
            "img/paraty_1.jpg",
            "img/paraty_2.jpg",
            "img/paraty_3.jpg"
        ]
    },
    {
        id: "cananeia",
        year: "2º ano",
        title: "CANANÉIA",
        badge: "Cananéia • 2º ano",
        cover: "img/cananeia_capa.jpg",
        teaser: "Já imaginou passar 3 dias em um chalé em frente à praia, em uma ilha, com os amigos?",
        story:
            "Pois é, a viagem do 2º ano foi para nada menos que a Ilha do Cardoso, próxima a Cananéia. " +
            "Foram dias com trilhas, praia, risadas e aquela sensação de estar vivendo algo que vai virar " +
            "história pra sempre. Leva repelente, tênis confortável e prepara a câmera!",
        gallery: [
            "img/cananeia_1.jpg",
            "img/cananeia_2.jpg",
            "img/cananeia_3.jpg"
        ]
    },
    {
        id: "petar",
        year: "3º ano",
        title: "PETAR",
        badge: "Petar • 3º ano",
        cover: "img/petar_capa.jpg",
        teaser: "Friozinho, passeio e aquela vibe de despedida com a turma no último ano.",
        story:
            "No 3º ano, a viagem costuma ter um clima especial. Campos do Jordão é famosa pelo frio, " +
            "comida boa e passeio. Leva casaco de verdade e aproveita pra curtir com a galera — " +
            "porque depois cada um vai pra um lado.",
        gallery: [
            "img/campos_1.jpg",
            "img/campos_2.jpg",
            "img/campos_3.jpg"
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
