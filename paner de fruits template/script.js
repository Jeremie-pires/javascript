let fruits = [];

const liste = () => {
  const tbody = document.getElementById('myTbody');
  tbody.innerHTML = '';

  fruits.forEach((fruit) => {
    const template = document.getElementById("templateTr");
    // cloner le template
    const clone = template.content.cloneNode(true);
    let td = clone.querySelector("td");
    td.textContent = fruit;
    
    let btn = clone.querySelector("button");
    btn.onclick = (event) => {
      if (confirm("Voulez-vous enlever : " + fruit + " ?")) {
       const indice =  event.target.closest("tr").rowIndex -1;
       fruits.splice(indice,1);
       afficher();
      }
    };
    // ajouter le tr cloner ds le tableau html
    tbody.appendChild(clone);
  });
};

document.getElementById('btn-ajouter').onclick = () => {
  const input = document.getElementById('fruit');
  const fruitName = input.value.trim();

  if (fruitName) {
    fruits.push(fruitName);
    input.value = ''; 
    liste();
  }
};
 