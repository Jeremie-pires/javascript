const dbFire = 
    "https://projet-js-218b4-default-rtdb.europe-west1.firebasedatabase.app/";


const noeud = "personnes";
let data = {};

class Personne {
    constructor(prenom, nom) {
        this.prenom =  prenom;
        this.nom = nom;
        this.status = true;
    }
}

const saveLocal = () => {
    localStorage.setItem('personnes', JSON.stringify(personnes));
  }

const afficher = () => {
    const tbody = document.getElementById('myTbody');
    tbody.innerHTML = '';
    if (data && Object.keys(data).length > 0) {
        Object.keys(data).map(id => {
            const personne = data[id];
            const template = document.getElementById("templateTr");
            const clone = template.content.cloneNode(true);
            let tr = clone.querySelector("tr");
            tr.setAttribute('data-id', id);
            personne.status 
                ? tr.classList.add("table-success") 
                : tr.classList.add("table-danger");

            let td = clone.querySelectorAll('td');
            td[0].textContent = personne.prenom;
            td[1].textContent = personne.nom;
            sup = clone.querySelector(".btn-danger");
            sup.onclick = async(event) => {
                const tr = event.target.closest("tr");
                const id = tr.dataset.id;
                const url = `${dbFire}${noeud}/${id}.json`;
                const response = await axios.delete(url);
                delete data[id];
                afficher();
            };
            invit = clone.querySelector(".btn-warning");
            invit.onclick = async(event) => {
                const tr = event.target.closest("tr");
                const id = tr.dataset.id;
                const obj = {status: !data[id].status};
                const url = `${dbFire}${noeud}/${id}.json`;
                const response = await axios.patch(url, obj);
                data[id].status = !data[id].status;
                afficher();
            };
        
            if (personne.status) {
                tr.classList.remove('table-danger');
                tr.classList.add('table-success');
                tr.classList.remove('rouge');
                tr.classList.add('vert');
            } else {
                tr.classList.remove('table-success');
                tr.classList.add('table-danger');
                tr.classList.remove('vert');
                tr.classList.add('rouge');
            }
            tbody.appendChild(clone);
        });
    }
};

document.getElementById('btnAjouter').onclick = async() => {
    let prenom = document.getElementById('prenom').value;
    document.getElementById('prenom').value = '';
    let nom = document.getElementById('nom').value;
    document.getElementById('nom').value = '';
    const personne = new Personne(prenom, nom);
    const url = `${dbFire}${noeud}.json`;
    const response = await axios.post(url, personne);
    const id = response.data;
    data[id] = personne;
    afficher(); 
    
}; 


const loadFire = async () => {
    const url = `${dbFire}${noeud}.json`;
    const response = await axios.get(url);
    data = response.data || {};
    afficher();
  }
  
  loadFire();