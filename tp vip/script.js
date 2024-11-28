const saveLocal = () => {
    localStorage.setItem('personnes', JSON.stringify(personnes));
}

class Personne {
    constructor(prenom, nom, status) {
        this.prenom =  prenom;
        this.nom = nom;
        this.status = false;
    }
}

const personnes = [];

const afficher = () => {
    const tbody = document.getElementById('myTbody');
    tbody.innerHTML = '';
    for (let personne of personnes) {
        console.log(personnes);

        const template = document.getElementById("templateTr");
        const clone = template.content.cloneNode(true);
        let td1 = clone.document.getElementById("prenom");
        td1.textContent = personne.prenom;
        let td2 = clone.document.getElementById("nom");
        td2.textContent = personne.nom;


        let sup = clone.querySelector("btn btn-danger");
        
        sup.onclick = (event) => {
            if (confirm("Voulez-vous enlever : " + personne.prenom + ' ' + personne.nom + " ?")) {
                const indice = event.target.closest("tr").rowIndex - 1;
                personnes.splice(indice, 1);
                saveLocal();
                afficher();
            }
        };

        let invit = clone.querySelector("btn btn-warning");
        invit.onclick = (event) => {
            if (personne.status == false) {
                personne.status = true;
                let couleurElement = document.getElementById('box');
                couleurElement.classList.remove('couleurElement')
                couleurElement.classList.add('vert');
                saveLocal();
                afficher();
            }
            else if (personne.status == true) {
                personne.status = false;
                let couleurElement = document.getElementById('box');
                couleurElement.classList.remove('couleurElement');
                couleurElement.classList.add('rouge');
                saveLocal();
                afficher();
            }
        };
        tbody.appendChild(clone);
    }
};

document.getElementById('btnAjouter').onclick = () => {
    const prenom = document.getElementById('inputprenom').value;
    document.getElementById('inputprenom').value = '';
    const nom = document.getElementById('inputnom').value;
    document.getElementById('inputnom').value = '';
    const personne = new Personne(prenom, nom);
    personnes.push(personne);
    saveLocal();
    afficher();
};

const data = localStorage.getItem('personnes');
id (data){
    personnes=JSON.parse(data);
    afficher();
}
