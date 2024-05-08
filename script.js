// Function to create recipe card
function createRecipeCard(recipeName, imageUrl, description) {
    // Create card element
    let card = document.createElement('div');
    card.classList.add('recipe-card');

    // Create image element
    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = recipeName + ' Image';
    card.appendChild(img);

    // Create title element
    let title = document.createElement('h3');
    title.textContent = recipeName;
    card.appendChild(title);

    // Create description element
    let desc = document.createElement('p');
    desc.textContent = description;
    card.appendChild(desc);

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove recipe';
    deleteBtn.classList.add('delete-btn');

    // Event listener to remove the card when delete button is clicked
    deleteBtn.addEventListener('click', function() {
        card.remove();
        // Remove the recipe from local storage when deleted
        removeRecipeFromLocalStorage(recipeName);
    });

    // Append delete button to card
    card.appendChild(deleteBtn);

    // Append card to recipe container
    document.getElementById('recipe-container').appendChild(card);
}

// Function to save recipe to local storage
function saveRecipeToLocalStorage(recipeName, imageUrl, description) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push({ name: recipeName, imageUrl: imageUrl, description: description });
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to remove recipe from local storage
function removeRecipeFromLocalStorage(recipeName) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
}

// Load recipes from local storage when the page loads
window.addEventListener('load', function() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.forEach(recipe => {
        createRecipeCard(recipe.name, recipe.imageUrl, recipe.description);
    });
});

// Event listener for form submission
let form = document.getElementById('recipe-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let recipeName = document.getElementById('recipe-name').value;
    let recipeInstruction = document.getElementById('recipe-instruction').value;
    let recipeImage = document.getElementById('recipe-image').value;

    createRecipeCard(recipeName, recipeImage, recipeInstruction);

    // Save the new recipe to local storage
    saveRecipeToLocalStorage(recipeName, recipeImage, recipeInstruction);

    // Clear form fields after submitting
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-instruction').value = '';
    document.getElementById('recipe-image').value = '';
});
