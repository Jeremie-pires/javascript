let fruits = [];

const liste = () => {
  const tbody = document.getElementById('myTbody');
  tbody.innerHTML = '';

  fruits.forEach((fruit, index) => {
    const tr = document.createElement('tr');
    const tdFruit = document.createElement('td');
    tdFruit.textContent = fruit;
    tr.appendChild(tdFruit);

    const tdAction = document.createElement('td');
    const bouton = document.createElement('button');
    bouton.classList.add('btn', 'btn-danger');
    bouton.innerHTML = '<i class="fa fa-trash"></i>';
    bouton.addEventListener('click', () => supprimer(index));
    tdAction.appendChild(bouton);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
};

const add = () => {
  const inputFruit = document.getElementById('fruit');
  const fruit = inputFruit.value.trim();

  if (fruit) {
    fruits.push(fruit);
    inputFruit.value = ''; 
    liste();
  }
};

const supprimer = (index) => {
  fruits.splice(index, 1);
  liste();
};

document.addEventListener('DOMContentLoaded', () => {
  liste();

  document.getElementById('btnAjouter').addEventListener('click', add);
});
