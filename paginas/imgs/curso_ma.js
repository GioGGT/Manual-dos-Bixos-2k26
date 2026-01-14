const lc = document.getElementById('leafCont');
function leaf(){
    const l = document.createElement("img");
    const type = Math.floor(Math.random() * 2)
    l.className = "leaf";
    l.src = type == 0? "../imgs/ma/leaf1.png" : "../imgs/ma/leaf2.png";
    l.style.setProperty("--r", -20 + "deg");
    l.style.left = Math.floor(Math.random()*100) + "%"
    l.style.height = Math.floor(Math.random()*20) + 20 + "px"
    l.style.setProperty("--h", Math.floor(Math.random() * (30 - 5 + 1)) + 105 + "vh")
    lc.appendChild(l);
    setTimeout(leaf, 400)
    l.addEventListener("animationend", () => {
        l.remove();
    })
}

document.addEventListener("DOMContentLoaded", () =>{leaf()})