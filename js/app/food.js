const foodDiv = document.querySelector('#food');
const food_id = getIdFromQuery();

getFoodById(food_id)
    .then(data => showFood(data));

function getFoodById(id) {
    return fetch(`${API_URL}/food/${id}`)
        .then(res => res.json());
}

function showFood(food) {
    const div = document.createElement('div');
    foodDiv.appendChild(div);
    div.innerHTML = `
            <div class="card py-4">
                <img class="card-img-top" src="${food.image}"
                    alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title mb-3">${food.name}</h4>
                    <p class="card-text mb-2">${food.description}</p>
                    <p><small>Category</small> : <strong><a
                                href="/category.html?id=${food.category_id}">${food.category_name}</a></strong>
                        <p><small>Price</small> :
                            <strong>$${food.price}</strong>
                        </p>
                        <p><small>Clories</small> :
                            <strong>${food.calories}</strong>
                        </p>
                    </p>
                    <div class="text-white mt-4">
                        <a href="/editFood.html?id=${food_id}" class="btn btn-warning text-white">Edit</a>
                        <button type="button" class="btn btn-danger"
                                data-toggle="modal" data-target="#exampleModal">
                                Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
}

// Delete Food 
document.querySelector('#delete-food').addEventListener('click', e => {
    fetch(`${API_URL}/food/${getIdFromQuery()}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => window.location = '/index.html')
});