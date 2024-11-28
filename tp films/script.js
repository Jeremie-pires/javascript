let series = [];
let tabFav = [];

document.getElementById('btnSearch').onclick = async() => {
    const serie = document.getElementById('serie').value;
    const key = '82fe5131';
    const url = `https://www.omdbapi.com/?apikey=${key}&s=${serie}&type=series`;
    const response = await fetch(url);
    const series = await response.json();
    afficherSeries();
};

const getSerie=async(id)=>{
    const key = '82fe5131'
    const url = `https://www.omdbapi.com/?apikey=${key}&$i=${id}`
    const response = await fetch(url);
    const serie = await r.json();
    return serie;
    }

const afficherSeries = () => {
    const tbody = document.getElementById('myTbody');
    tbody.innerHTML = '';
    for (let serie of series) {
        const template = document.getElementById("templateTr");
        const clone = template.content.cloneNode(true);
        let tr = clone.querySelector("tr");
        let td = clone.querySelectorAll('td');
        td[0].textContent = serie.Title;
        td[1].textContent = serie.Year;
        td[2].textContent = serie.Poster;
        clone.querySelector('img').src = serie.Poster;
        clone.querySelector('button').onclick = async(event) => {
            const tr = event.target.closest("tr");
            const id = tr.rawIndex - 1;
            let serie = await getSerie(series[index].imdbID);

            tabFav.push(serie);
            afficherFav();
            serie.splice(id, 1);
            saveLocal();
        };
        tbody.appendChild(clone);
    };
}

const afficherFav = () => {
    const tbody2 = document.getElementById('myTbody2');
    tbody.innerHTML = '';
    for (let serie of tabFav) {
        const template2 = document.getElementById("templateTr2");
        const clone = template2.content.cloneNode(true);
        let tr = clone.querySelector("tr");
        let td = clone.querySelectorAll('td');
        td[0].textContent = serie.Title;
        td[1].textContent = serie.Year;
        td[2].textContent = serie.imdbRating;
        td[3].textContent = serie.Poster;
        clone.querySelector('img').src = serie.Poster;
        clone.querySelector('button').onclick = async(event) => {
            const tr = event.target.closest("tr");
            const id = tr.rawIndex - 1;
            let serie = await getSerie(tabFav[index].imdbID);

            tabFav.splice(id, 1);
            saveLocal();
            afficherFav();
        };
        tbody2.appendChild(clone);
    };
}

const data = localStorage.getItem('series');
if (data) {
    tabFav = JSON.parse(data);
    afficherFav();
}