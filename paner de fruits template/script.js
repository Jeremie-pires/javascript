let fruits = [];

const liste = () => {
  const tbody = document.getElementById('myTbody');
  tbody.innerHTML = '';

  for (let fruit of fruits) {
    const template = document.getElementById("templateTr");
    const clone = template.content.cloneNode(true);
    let td = clone.querySelector("td");
    td.textContent = fruit;
    let btn = clone.querySelector("button");
    btn.onclick = (event) => {
      if (confirm("Voulez-vous enlever : " + fruit + " ?")) {
       const indice =  event.target.closest("tr").rowIndex -1;
       fruits.splice(indice,1);
       liste();
      }
    };
    tbody.appendChild(clone);
  }
};

document.getElementById('btn-ajouter').onclick = () => {
  let fruitName = document.getElementById('fruit').value;
  document.getElementById('fruit').value = '';
  fruits.push(fruitName);
  liste();
};

 