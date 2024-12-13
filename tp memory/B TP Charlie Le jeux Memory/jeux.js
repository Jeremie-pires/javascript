let tab = [0,1,2,3,4,5,6,7,8,9,10,11];
let tab2 = tab.concat(tab);

const melange = (tab2) => {
    let tableau = [];
    for (let i = 0; i < tab2.length; i++) {
      do {
        // je genere un nb alea de 0 à taille du tableau
        x = Math.floor(Math.random() * tab2.length);
      } while (tableau[x] != undefined);
      // tant que l'emplacement n'est pas vide
      tableau[x]= tab2[i];
    }   
    return tableau;
  }


const grille = () => {
    const tableau = melange(tab2);
    let container = document.getElementById("grille");
    container.innerHTML = "";
    container.classList.add("container");
    const template = document.getElementById("templateCase");
    for (let cases of tableau) {
        const clone = template.content.cloneNode(true);
        let div = clone.querySelector("div");
        let img = clone.querySelector("img");
        img.src = `img/${cases}.webp`;   
        div.dataset.value = cases;
        container.appendChild(div);  
    }
    document.body.appendChild(container);
};

let secondes = 0;
let firstClick = false;
let chronoInterval;

document.getElementById("grille").addEventListener("click", (event) => {
    if (!firstClick) {
        chrono();
    }
    let div = event.target.closest("div");
    if (!div || div.innerHTML === "") return;   
    if (selec1 == null && selec2 == null) {
        selec1 = div;
        selec1.classList.add("green");
    } else if (!selec2 && div != selec1) {
        div = event.target.closest("div");
        selec2 = div;
        selec2.classList.add("green");     
    
        if (selec1.dataset.value === selec2.dataset.value) {
            selec1.innerHTML = "";
            selec2.innerHTML = "";
            selec1.classList.remove("green");
            selec2.classList.remove("green");
            selec1 = null;
            selec2 = null;
            verifVictoire();
        } else {
            selec1.classList.remove("green");
            selec2.classList.remove("green");
            selec1 = null;
            selec2 = null;
        }
    }
    else if (div == selec1) {
        div.classList.remove("green");
        selec1 = null;
    }
});

const verifVictoire = () => {
    const cases = document.getElementById("grille").children;
    for (let c of cases) {
        if (c.innerHTML !== "") {
            return false;
        }
    }
    victoire();
};

const victoire = () => {
    clearInterval(chronoInterval);
    let para = document.getElementById("chrono");
    const template = document.getElementById("templateWin");
    const clone = template.content.cloneNode(true);
    let container = document.getElementById("grille");
    container.innerHTML = "";
    let div = clone.querySelector("div");
    div.id = "divRejouer";
    let bouton = clone.querySelector("button");
    bouton.id = "boutonRejouer";
    bouton.innerHTML = "Rejouer";
    let temps = clone.querySelector("p");
    temps.id = "temps";
    temps.innerHTML = `Temps : ${secondes} secondes`;
    para.innerHTML = "";
    container.appendChild(temps);
    container.appendChild(div);
    div.appendChild(bouton);
    alert("Bravo ! Vous avez gagné !");
    document.getElementById("boutonRejouer").addEventListener("click", () => {
        location.reload(), false;
    });
};

const jeu = () => {
    selec1 = null;
    selec2 = null;
    grille();
};


const chrono = () => {
    if (!firstClick) {
        secondes = 0;
        firstClick = true;
    }
    chronoInterval = setInterval(tictictic, 1000);
    function tictictic() {
        secondes++;
        let para = document.getElementById("chrono");
        para.innerHTML = `Chrono : ${secondes} secondes`;
    }
};

jeu();