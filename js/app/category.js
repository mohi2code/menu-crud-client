const foodDiv = document.querySelector('#food');
const categoryName = document.querySelector('#category-name');
const editCategoryButton = document.querySelector('#edit-category');
const deleteCategoryButton = document.querySelector('#delete-category');
const category_id = getIdFromQuery();

getFoodByCategoryId(category_id)
    .then(data => showFood(data));

function getFoodByCategoryId(id) {
    return fetch(`${API_URL}/categories/${id}`)
        .then(res => res.json());
}

function showFood(food) {
    categoryName.textContent = getCategoryFromQuery();
    editCategoryButton.outerHTML = `
        <a href="/editCategory.html?id=${category_id}&category_name=${getCategoryFromQuery()}" class="btn btn-outline-warning">Edit</a>
    `;
    food.forEach(foodItem => {
        const div = document.createElement('div');
        foodDiv.appendChild(div);
        div.outerHTML = `
        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" src="${foodItem.image}"
                    alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title mb-3">${foodItem.name}</h4>
                    <p class="card-text mb-2">${foodItem.description}</p>
                    <p>
                        <p><small>Price</small> : <strong>$${foodItem.price}</strong>
                        </p>
                    </p>
                    <a href="/food.html?id=${foodItem.id}" class="btn btn-outline-info mt-3">Details</a>
                </div>
            </div>
        </div>
        `;
    });
}

// Delete Category
deleteCategoryButton.addEventListener('click', e => {
    fetch(`${API_URL}/categories/${getIdFromQuery()}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => window.location = '/index.html')
});