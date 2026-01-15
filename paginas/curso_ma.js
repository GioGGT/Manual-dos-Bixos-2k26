const lc = document.getElementById('leafCont');

function leaf() {
    const l = document.createElement("img");
    if(lc.children.length > 50){
        setTimeout(leaf, 2000);
        return
    }
    const type = Math.floor(Math.random() * 2);

    l.className = "leaf";
    l.src = type === 0
        ? "../imgs/ma/leaf1.png"
        : "../imgs/ma/leaf2.png";

    l.style.left = Math.random() * 100 + "%";
    l.style.setProperty("--x", (Math.random() * 60 - 30) + "px");
    l.style.setProperty("--r", (Math.random() * 360) + "deg");
    l.style.setProperty("--h", (100 + Math.random() * 40) + "vh");

    l.style.setProperty("--t", (18 + Math.random() * 12) + "s");
    l.style.setProperty("--s", (4 + Math.random() * 3) + "s");

    l.style.setProperty("--sc", (0.35 + Math.random() * 0.25));
    l.style.setProperty("--o", (0.2 + Math.random() * 0.25));
    l.style.setProperty("--b", Math.random() * 0.6 + "px");

    lc.appendChild(l);

    l.addEventListener("animationend", () => l.remove());

    setTimeout(leaf, 2000);

}

document.addEventListener("DOMContentLoaded", leaf);



