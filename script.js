const API_KEY = "d99d9c4fbeeb42e0a69805ac8d2ff102";

async function getRecipes() {
    const foodInput = document.getElementById("foodInput").value.trim().toLowerCase();
    if (!foodInput) {
        alert("Please enter ingredients to search.");
        return;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${foodInput}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`;
    fetchRecipes(apiUrl);
}

async function getCuisineRecipes() {
    const selectedCountry = document.getElementById("countrySelect").value;
    if (!selectedCountry) {
        alert("Please select a country.");
        return;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${selectedCountry}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`;
    fetchRecipes(apiUrl);
}

async function getVegetarianRecipes() {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&number=10&addRecipeInformation=true&apiKey=${API_KEY}`;
    fetchRecipes(apiUrl);
}

async function getNonVegetarianRecipes() {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?excludeIngredients=tofu,lentils,beans,peas&number=10&addRecipeInformation=true&apiKey=${API_KEY}`;
    fetchRecipes(apiUrl);
}

async function getRandomRecipe() {
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=1&addRecipeInformation=true&apiKey=${API_KEY}`;
    fetchRecipes(apiUrl);
}

async function fetchRecipes(apiUrl) {
    try {
        document.getElementById("recipes").innerHTML = "<p>Loading recipes...</p>";
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.results && !data.recipes) {
            document.getElementById("recipes").innerHTML = "<p>No recipes found. Try different inputs.</p>";
            return;
        }

        const recipeData = data.results || data.recipes;
        displayRecipes(recipeData);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById("recipes").innerHTML = "<p>Failed to fetch recipes. Please try again later.</p>";
    }
}

function displayRecipes(recipes) {
    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe-card");
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Time:</strong> ${recipe.readyInMinutes || "N/A"} minutes</p>
            <p>${recipe.summary ? recipe.summary.replace(/<[^>]+>/g, "").slice(0, 100) + "..." : "No description available."}</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
        `;
        recipesDiv.appendChild(recipeElement);
    });
}
