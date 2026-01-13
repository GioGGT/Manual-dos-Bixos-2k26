function pato(){
    const pato  = document.getElementById('pato')
    const p = document.createElement("span");
    if(pato.parentElement.children.length > 1){
        return;
    }
    const quack = [new Audio("imgs/pp/quack1.mp3"), new Audio("imgs/pp/quack2.mp3"), new Audio("imgs/pp/quack3.mp3")];
    const falas = ["Isso é um texto com palavras muito longas que podem ser hifenizadas automaticamente."]
    p.className = "texto";
    p.textContent = falas[Math.floor(Math.random() * falas.length)]
    p.style.left = "48%";
    p.style.top = "15%";
    p.style.setProperty("--x", (Math.floor(Math.random() * 6)*30 - 150) + "px")
    p.style.setProperty("--y", (Math.floor(Math.random() * 6)*30 - 75) + "px")
    pato.parentElement.appendChild(p);
    quack[Math.floor(Math.random()*3)].play();
    pato.classList.add('pressed');
    p.addEventListener("animationend", () => {
        p.remove();
    })
    pato.addEventListener("animationend", () =>{
        pato.classList.remove('pressed');
    })
}
    
