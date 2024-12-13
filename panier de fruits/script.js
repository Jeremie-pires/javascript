const add = document.getElementById('btnAjouter').onclick = ()=>{

    let tr = document.createElement('tr');

    let tdfruit = document.createElement('td');
    tdfruit.textContent = document.getElementById('fruit').value;

    let td = document.createElement('td');

    let bouton = document.createElement('button');
    bouton.classList.add('btn', 'btn-danger');

    let i = document.createElement('i');
    i.classList.add('fa', 'fa-trash');

    bouton.appendChild(i);
    td.appendChild(bouton);
    tr.appendChild(tdfruit);
    tr.appendChild(td);
    document.getElementById('myTbody').appendChild(tr);
    document.getElementById('fruit').value = '';

    bouton.onclick = (supprimer) => {
        const sup = supprimer.target.closest('tr');
        if (sup) {
            sup.remove();
        }
    };
};

const boutons = document.getElementsByClassName('btn btn-danger');
for (let i = 0; i < boutons.length; i++) {
    boutons[i].onclick = (supprimer) =>{
        const sup = supprimer.target.closest('tr');
        if (sup) {
            sup.remove();
        }
    };
}   

