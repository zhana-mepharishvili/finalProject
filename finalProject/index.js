const burger = document.querySelector(".burger");
const navListMobile = document.querySelector(".navListMobile");
burger.addEventListener("click", () => {
   navListMobile.classList.toggle("nav-list-hide");
}
);



const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
const sliderItems = document.getElementsByClassName("slider-item");
let activeIndex = 0;
const removeActiveClass = () => {
    for(let item of sliderItems) {
        item.classList.remove("visible");
    }
};
arrowLeft.addEventListener("click", () => {
    if(activeIndex == 0) {
        activeIndex = sliderItems.length - 1;
    } else {
        activeIndex -= 1;
    }
    removeActiveClass();
    sliderItems[activeIndex].classList.add("visible");
});
arrowRight.addEventListener("click", () => {
    if(activeIndex == sliderItems.length - 1) {
        activeIndex = 0;
    } else {
        activeIndex += 1;
    }
    removeActiveClass();
    sliderItems[activeIndex].classList.add("visible");
});



const toggleButton = document.getElementById("toggleButton");
let isLightkMode = localStorage.getItem("lightMode");
if (isLightkMode === "enabled") {
  document.body.classList.add("lightMode");
} 
toggleButton.addEventListener("click", () => {
  isLightkMode = localStorage.getItem("lightMode");
  if (isLightkMode === "enabled") {
    localStorage.setItem("lightMode", "disabled");
    document.body.classList.remove("lightMode")
} else {
    localStorage.setItem("lightMode", "enabled");
    document.body.classList.add("lightMode")
}
});



const recipesContainer = document.querySelector(".recipesContainer");
const getRecipes = async () => {
    const response = await fetch("https://dummyjson.com/recipes?limit=12&skip=20");
    const result = await response.json();
    return result.recipes;    
};
const createCards = async (items) => {
    for(let recipe of items) {
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        let recipeImage = document.createElement("img");
        recipeImage.classList.add("recipeImg");
        recipeImage.src = recipe.image;
        let textsDiv = document.createElement("div");
        textsDiv.classList.add("texts");
        let recipeName = document.createElement("h3");
        recipeName.classList.add("name");
        recipeName.textContent = recipe.name;
        let recipeIngredients = document.createElement("p");
        recipeIngredients.classList.add("ingredients");
        recipeIngredients.textContent = recipe.ingredients;
        let recipeCuisine = document.createElement("p");
        recipeCuisine.classList.add("cuisine");
        recipeCuisine.textContent = recipe.cuisine;
        textsDiv.append(recipeName, recipeIngredients, recipeCuisine);
        recipeDiv.append(recipeImage, textsDiv);
        recipesContainer.appendChild(recipeDiv);
    };
};
const renderInitialRecipes = async () => {
    const recipes = await getRecipes();
    createCards(recipes);
};
renderInitialRecipes();



const search = document.getElementById("search");
search.addEventListener("change", async (e) => {
    const recipes = await getRecipes();
    const filteredRecipes = recipes.filter((recipe) => 
        recipe.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    recipesContainer.innerHTML = "";
    createCards(filteredRecipes);
 }
);



const inputs = document.querySelectorAll("input");
const patterns = {
    username: /^[a-z\d]{2,20}$/i,
    telephone: /^\d{9}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};
function validateInput(field, regex) {
    if (regex.test(field.value)) {
        field.className = "valid";
    } else {
        field.className = "invalid";
    }
}
for (let input of inputs) {
    input.addEventListener("keyup", (e) => {
        validateInput(e.target, patterns[e.target.attributes.name.value])
    });
};


