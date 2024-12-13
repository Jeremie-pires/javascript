let series = [];
let tabFav = [];

const saveLocal = () => {
    localStorage.setItem('series', JSON.stringify(tabFav));
}

const getSerie=async(imdb)=>{
    const key = '82fe5131'
    let url = `https://www.omdbapi.com/?apikey=${key}&$i=${imdb}`
    const response = await fetch(url);
    const serie = await response.json();
    return serie;
}


const afficherSeries = () => {
    console.log(series);
    const tbody = document.getElementById('myTbody');
    tbody.innerHTML = '';
    for (let s of series) {
        const template = document.getElementById("templateTr");
        const clone = template.content.cloneNode(true);
        let td = clone.querySelectorAll('td');
        td[0].textContent = s.Title;    
        td[1].textContent = s.Year;
        clone.querySelector('img').src = s.Poster;
        clone.querySelector('button').onclick = async(event) => {
            const tr = event.target.closest("tr");
            const id = tr.rowIndex - 1;
            let serie = await getSerie(series[id].imdbID);

            tabFav.push(serie);
            afficherFav();
            series.splice(id, 1);
            saveLocal();
        };
        tbody.appendChild(clone);
    }
};

const afficherFav = () => {
    const tbody2 = document.getElementById('myTbody2');
    tbody2.innerHTML = '';
    for (let f of tabFav) {
        const template2 = document.getElementById("templateTr2");
        const clone = template2.content.cloneNode(true);
        const td = clone.querySelectorAll('td');
        td[0].textContent = f.Title;
        td[1].textContent = f.Year;
        td[2].textContent = f.imdbRating;
        clone.querySelector('img').src = f.Poster;
        clone.querySelector('button').onclick = (event) => {
            const tr = event.target.closest("tr");
            const id = tr.rawIndex - 1;
            tabFav.splice(id, 1);
            afficherFav();
            saveLocal();
        };
        tbody2.appendChild(clone);
    };
}

document.getElementById('btnSearch').onclick = async() => {
    let serie = document.getElementById('serie').value;
    document.getElementById('serie').value = '';
    const key = '82fe5131';
    let url = `https://www.omdbapi.com/?apikey=${key}&s=${serie}&type=series`;
    const response = await fetch(url);
    const data = await response.json();
    series = data.Search;
    afficherSeries();
};

const data = localStorage.getItem('series');
if (data) {
    tabFav = JSON.parse(data);
    afficherFav();
}