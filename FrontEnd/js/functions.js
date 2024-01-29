function isAuthenticated() {
    if (localStorage.getItem("token")) {
        return true
    }
    return false
}

function getToken() {
    return localStorage.getItem('token')
}
function closeModal() {
    overlay.classList.remove('opened')
    fermetureModale.open = false
}

function navigate(ajoutPhoto = true) {
    if (ajoutPhoto) {
        galerie.style.display = 'none';
        galerie_add.style.display = 'block';
        formAddLink.style.display = 'none';
        modaleTitle.textContent = 'Ajout photo';
        modaleBack.style.display = 'inline';
    } else {
        galerie.style.display = 'grid';
        galerie_add.style.display = 'none';
        formAddLink.style.display = 'block';
        modaleTitle.textContent = 'Galerie photo';
        modaleBack.style.display = 'none';
    }

}