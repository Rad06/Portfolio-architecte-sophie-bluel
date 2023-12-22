


function createCategoriesContainer() {
    // Ajouter la DIV catégories
    const images = document.getElementById("images") //GALERIE IMAGES
    const portfolio = document.getElementById("portfolio")
    const categories = document.createElement("div")
    categories.classList.add("categories")
    // Inserer la DIV catégories dans la section portfolio en première position
    portfolio.insertBefore(categories, images);

}
// // Ajouter les projets
function displayCategories(categories) {

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        createCategoryButton(category)
    }


}
function createCategoryButton(category) {
    const button = document.createElement('button')
    button.textContent = category.name
    const categories = document.querySelector(".categories")
    categories.appendChild(button)
    // ECOUTEURS/LISTENERS D'EVENEMENTS EXECUTER AU CLICK
   button.addEventListener("click", () => {
        filterWorks(category.id)
    });

}