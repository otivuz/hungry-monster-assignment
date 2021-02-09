function showWarning(errorMessages) {
    document.getElementById("errorMessage").innerText = errorMessages;
}

function displayAllDishes(meals) {
    document.getElementById("allDishes").innerHTML = "";
    document.getElementById("dishDetail").style.display = 'none';
    meals.forEach(meal => {
        const foodArea = document.createElement("div");
        foodArea.innerHTML = `
        <div onclick='dishdetails("${meal.idMeal}")' class="mealsCard">
            <img src="${meal.strMealThumb}" class="mealsImage">
            <h5 class="mealsName">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("allDishes").appendChild(foodArea);
    });
}
// fetching data
function dishdetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            showDetails(data.meals[0]);
        })
}

function showDetails(meal) {
    document.getElementById("dishDisplay").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="dishimages">
        <h3 class="dishTitle">${meal.strMeal}</h3>
    </div>
    <div>
        <h4>  Ingredients</h4>
        <ul id="ingredient-list">

        </ul>
    </div>
    `;

    document.getElementById("recipe").innerHTML = `
    <p class="receipeDetails">${meal.strInstructions}</p>
    `;
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) break;

        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }

    document.getElementById("dishDetail").style.display = "block";
    document.getElementById("dishDetail").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("searchDish").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("search-btn").click();
});

document.getElementById("search-btn").addEventListener("click", function () {
    showWarning("");
    let food = document.getElementById("searchDish").value;
    if (food === "") {
        showWarning("please let us know what do you want to eat")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    showWarning(`Not available or not found`)
                } else {
                    displayAllDishes(data.meals);
                }
            })
    }
    document.getElementById("searchDish").value = "";
})
