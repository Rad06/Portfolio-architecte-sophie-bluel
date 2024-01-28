
const overlay = document.querySelector(".modaleGrey");
const fermetureModale = document.querySelector(".fermetureModale");

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
function verifierChamp(email) {
  
}
// Ajouter un message error sur le champ password si ce dernier n'est pas bon 
function verifierChamp(password) {
}

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
    overlay.classList.add('opened');
    const galerie = document.getElementById("back_galery");
    galerie.innerHTML = "";
    fermetureModale.open = true;
    loadWorks().then((works) => {
      works.forEach(projet => {
        const container = document.createElement("div");
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        const a = document.createElement("a");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        a.appendChild(trash);
        fermetureModale.appendChild(a);






        // Relier la poubelle à l'ID de l'image
        trash.id = projet.id
        console.log(projet.id);
        container.className = "galery-item";
        container.appendChild(image);
        container.appendChild(a);
        galerie.appendChild(container);
      });
    })

  })
  deletPhotos();
}

// Fermer la fenetre modale au click sur le bouton
const closeModalGaleryButton = document.getElementById("close_back_galery");
closeModalGaleryButton.addEventListener("click", () => {
  close_back_galery.style.display = "none";
  closeModal();
});

// Fermeture de la page transparente
overlay.addEventListener("click", () => {
  console.log("test");
  closeModal();
})

// Supprimer les photos au click
function deletPhotos() {
  // const trashAll = document.querySelectorAll(".fa-trash-can")
  const trashAll = document.querySelectorAll(".fa-trash-can");
  console.log(trashAll);
trashAll.forEach((trash) => {
  trash.addEventListener("click", () => {
    const id = trash.id;
    const init = {
      method: "DELETE",
      Headers: { "content type": "application/json" },
    };
    fetch("http://localhost:5678/api/works" + id, init)
      .then((reponse) => {
        if (!reponse.ok) {
          console.log("le delet ne marche pas");
        }
        return reponse.json();
      })
      .then((data) => {
        console.log("delet reussi voila la data:", data);
        fermetureModale();
        back_galery();
      });
  });
});
}

// deletPhotos()
deletPhotos();





