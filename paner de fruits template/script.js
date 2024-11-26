// arrow function
document.getElementById("btnAjouter").onclick = () => {
    const myTbody = document.getElementById("myTbody");
    const template = document.getElementById("myTr");
    // le champ input id=fruit
    const fruit = document.getElementById("fruit").value;
    document.getElementById("fruit").value = "";
    const clone = template.content.cloneNode(true);
    // le premier td du template
    clone.querySelectorAll("td")[0].textContent = fruit;
    clone.querySelector("button").onclick = (event) => {
      const nom =event.target.closest("tr").querySelector('td').innerHTML
      const test = confirm('Effacer '+nom+' ?');
      if (test) {
        const selecteur = event.target;
        //selecteur.parentElement.parentElement.remove()
        selecteur.closest("tr").remove();
       
      }
    };
    myTbody.appendChild(clone);
  };