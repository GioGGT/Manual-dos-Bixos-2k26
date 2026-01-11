const map = document.getElementById('map');
const wrapper = document.querySelector('.map-wrapper');

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
        infoTitle.textContent = region.dataset.title;
        infoDesc.textContent = region.dataset.desc;
        const imgSrc = region.dataset.img;
        infoImage.innerHTML = imgSrc
            ? `<img src="${imgSrc}" 
            style="width:100%;height:100%;object-fit:cover;border-radius:14px;">`
            : `<span>Sem imagem</span>`;
    });
});
