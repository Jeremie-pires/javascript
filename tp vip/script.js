class Personne {
    constructor(prenom, nom) {
        this.prenom =  prenom;
        this.nom = nom;
        this.status = true;
    }
}

let personnes = [];

const saveLocal = () => {
    localStorage.setItem('personnes', JSON.stringify(personnes));
}

const afficher = () => {
    const tbody = document.getElementById('myTbody');
    tbody.innerHTML = '';
    for (let personne of personnes) {
        const template = document.getElementById("templateTr");
        const clone = template.content.cloneNode(true);
        let tr = clone.querySelector("tr");
        let td = clone.querySelectorAll('td');

        td[0].textContent = personne.prenom;
        td[1].textContent = personne.nom;

        if (personne.status) {
            tr.classList.add('vert');
            tr.classList.remove('rouge');
        } else {
            tr.classList.add('rouge');
            tr.classList.remove('vert');
        }

        sup = clone.querySelector(".btn-danger");   
        
        sup.onclick = (event) => {
                let indice = event.target.closest("tr").rowIndex - 1;
                personnes.splice(indice, 1);
                saveLocal();
                afficher();
            };

        invit = clone.querySelector(".btn-warning");
        invit.onclick = (event) => {
            personnes[index].status = !personnes[index].status;
                saveLocal();
                afficher();

        };
        tbody.appendChild(clone);
    }
};

document.getElementById('btnAjouter').onclick = () => {
    let prenom = document.getElementById('inputprenom').value;
    document.getElementById('inputprenom').value = '';
    let nom = document.getElementById('inputnom').value;
    document.getElementById('inputnom').value = '';
    const personne = new Personne(prenom, nom);
    personnes.push(personne);
    saveLocal();
    afficher();
};

const data = localStorage.getItem('personnes');
if (data){
    personnes=JSON.parse(data);
    afficher();
}
