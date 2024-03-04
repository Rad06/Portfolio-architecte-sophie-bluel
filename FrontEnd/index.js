// VARIABLES
const overlay = document.querySelector(".modaleGrey");
const fermetureModale = document.querySelector(".fermetureModale");
const galerie = document.getElementById("back_galery");
const galerie_add = document.getElementById("back_add");
const formAddLink = document.getElementById("add-photo-link");
const modaleTitle = document.querySelector(".fermetureModale .modale-title");
const modaleBack = document.getElementById("modale_back");
const formAddPhoto = document.getElementById("form-add-photo");
const addFile = document.getElementById("add-file");
const inputFile = document.getElementById("input-file");
const imagePreview = document.getElementById("image-preview");

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
          Authorization: "Bearer " + getToken(),
        },
      };
      fetch("http://localhost:5678/api/works/" + id, init)
        .then(() => {
     // rafraichir la page d'accueil
     displayAllWorks();
     // fermer la modale
     closeModal();
   })
   .catch((error) => {
     console.error("error DELETE", error.toString());
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








//  récupérer les données du formulaire en js //


formAddPhoto.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire

  // Récupérer les valeurs du formulaire
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  if (inputFile.files.length === 0) {
    alert("veuillez uploader une image");
    return;
  }

  // Vérification simple pour l'exemple
  if (!title || !category) {
    alert("Veuillez remplir tous les champs requis.");
    return; // Arrête la fonction si le formulaire est invalide
  }


  // Si la validation est réussie, appeler la fonction pour envoyer le formulaire
  sendForm();
  return false;
});


  // Si la validation est réussie, appeler la fonction pour envoyer le formulaire
  sendForm();




  function sendForm() {
    const file = inputFile.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", document.getElementById("category").value);
    formData.append("title", document.getElementById("title").value);
    //  faire la requête API pour créer le projet en js
    fetch("http://localhost:5678/api/works/", {
      method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    body: formData,
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.error) {
      alert("une erreur s est produite: " + data.error.toString());
      return false;
    } else {
      alert("Projet ajouté avec succès!");
      //remettre la modal sur la page de listing
      navigate(false);
      // Mettez à jour la galerie pour inclure le nouveau projet
      displayAllWorks();
      // fermer la modale
      closeModal();
    }
      return false;
    })
    .catch((error) => {
      console.error("Erreur:", error.toString());
      // alert('Une erreur est survenue lors de l'ajout du projet.');
    });
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  displayAllWorks(); // Assurez-vous que cette fonction récupère les projets depuis votre API
});
   


addFile.addEventListener("click", function (e) {
  e.preventDefault();
  inputFile.click();
});


function handleFiles(files) {

  const file = files[0];

  if (!file.type.startsWith("image/")) {
    return;
  }


  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

inputFile.addEventListener(
  "change",
  () => {
    handleFiles(inputFile.files);
  },
  false
);








