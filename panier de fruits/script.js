document.getElementsByClassName('btn btn-danger').onclick = (event)=>{
    const tr = event.target.closest('tr');
    tr.remove();
}
