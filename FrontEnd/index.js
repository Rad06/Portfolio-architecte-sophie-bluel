const overlay = document.querySelector(".modaleGrey");
const fermetureModale = document.querySelector(".fermetureModale");
const galerie = document.getElementById("back_galery");
const galerie_add = document.getElementById("back_add");
const formAddLink = document.getElementById("add-photo-link");
const modaleTitle = document.querySelector(".fermetureModale .modale-title");
const modaleBack = document.getElementById("modale_back");
const formAddPhoto = document.getElementById('form-add-photo');

// LANCEMENT DE PAGE
loadCategories().then((categories) => {
  createCategoriesContainer();
  // Une fois les travaux recuperes on appel nos fonctions
  displayCategories(categories); //Transmet categories au displayCategories
});
displayAllWorks();

function getValue() {
  // //  // Sélectionner l'élément input et récupérer sa valeur
  // let email = document.getElementById("email").value;
  // Afficher la valeur
  alert("input");
  // déclencher un événement sur le clic de bouton
  email.addEventListener("click", () => {
    // console.log("Vous avez cliqué sur le bouton")
    console.log("Vous avez cliqué sur le bouton");
  });
}

function selectionner() {
  // //  // Sélectionner l'élément input et récupérer sa valeur
  // let password = document.getElementById("password").value;
  // Afficher la valeur
  alert(input);
  // déclencher un événement sur le clic de bouton
  password.addEventListener("click", () => {
    console.log("Vous avez cliqué sur le bouton");
  });
}

// Ajouter un message error sur le champ email si ce dernier n'est pas bon
function verifierChamp(email) {}
// Ajouter un message error sur le champ password si ce dernier n'est pas bon
function verifierChamp(password) {}

if (isAuthenticated()) {
  let nouveauButton = document.createElement("button");
  const h2 = document.querySelector("#portfolio h2");
  nouveauButton.textContent = "modifier";
  const img = document.createElement("img");
  img.src = "assets/images/Vector (8).png";
  img.className = "logo-Modifier";
  img.setAttribute("alt", "bouton modifier");
  nouveauButton.appendChild(img);
  h2.appendChild(nouveauButton);
  nouveauButton.addEventListener("click", () => {
    overlay.classList.add("opened");

    galerie.innerHTML = "";
    fermetureModale.open = true;
    loadWorks().then((works) => {
      works.forEach((projet) => {
        const container = document.createElement("div");
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        const a = document.createElement("a");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        a.appendChild(trash);
        fermetureModale.appendChild(a);
        // Relier la poubelle à l'ID de l'image
        trash.id = projet.id;
        console.log(projet.id);
        container.className = "galery-item";
        container.appendChild(image);
        container.appendChild(a);
        galerie.appendChild(container);
      });
      deletPhotos();
    });
  });
}

// Fermer la fenetre modale au click sur le bouton
const closeModalGaleryButton = document.getElementById("close_back_galery");
closeModalGaleryButton.addEventListener("click", () => {
  // close_back_galery.style.display = "none";
  closeModal();
});

// Fermeture de la page transparente
overlay.addEventListener("click", () => {
  closeModal();
});

// Supprimer les photos au click
function deletPhotos() {
  // const trashAll = document.querySelectorAll(".fa-trash-can")
  const trashAll = document.querySelectorAll(".fa-trash-can");

  trashAll.forEach((trash) => {
    trash.addEventListener("click", (event) => {
      event.preventDefault();
      const id = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      };
      fetch("http://localhost:5678/api/works/" + id, init)
        .then((reponse) => {
          if (!reponse.ok) {
            console.log("le delet ne marche pas");
          }
          return reponse.json();
        })
        .then((data) => {
          console.log("delet reussi voila la data:", data);
          // rafraichir la gallerie

          // rafraichir la page d'accueil
          displayAllWorks()
        });
    });
  });
}

// deletPhotos()
deletPhotos();

// AJOUTER DES PHOTOS AU MODALE EN CLIQUANT SUR LE BOUTON AJOUTER

formAddLink.addEventListener("submit", (event) => {
  event.preventDefault();
  navigate(true);
});

modaleBack.addEventListener("click", (event) => {
  event.preventDefault();
  navigate(false);
});


formAddPhoto.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('recupérer les données du formulaire et envoie à l api pour créer le nouveau projet')
})