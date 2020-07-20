const foodDiv = document.querySelector('#food');
const category_id = getIdFromQuery();

getFoodByCategoryId(category_id)
    .then(data => showFood(data));

function getFoodByCategoryId(id) {
    return fetch(`${API_URL}/categories/${id}`)
        .then(res => res.json());
}

function showFood(food) {
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
                    <p><small>Category</small> : <strong><a
                                href="/category.html?id=${foodItem.category_id}">${foodItem.category_name}</a></strong>
                        <p><small>Price</small> : <strong>$${foodItem.price}</strong>
                        </p>
                    </p>
                </div>
            </div>
        </div>
        `;
    });
}