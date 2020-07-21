const form = document.querySelector('form');
const categoriesSelect = document.querySelector('#categories-select');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const description = formData.get('description');
    const category_id = formData.get('category_id');
    const price = Number.parseFloat(formData.get('price'));
    const calories = Number.parseFloat(formData.get('calories'));
    const image = formData.get('image');

    const foodData = {
        name,
        description,
        category_id,
        price,
        calories,
        image
    };

    fetch(`${API_URL}/food/${getIdFromQuery()}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })
        .then(res => res.json())
        .then(data => {
            window.location = `/food.html?id=${data.id}`;
        });

});

getCategories()
    .then(data => listCategories(data))
    .then(loadForm);

function listCategories(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        categoriesSelect.appendChild(option);
        option.outerHTML = `
            <option value="${category.id}">${category.name}</option>
        `;
    });
}

function loadForm() {
    fetch(`${API_URL}/food/${getIdFromQuery()}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#name').value = data.name;
            document.querySelector('#description').value = data.description;
            categoriesSelect.value = data.category_id;
            document.querySelector('#price').value = data.price;
            document.querySelector('#calories').value = data.calories;
            document.querySelector('#image').value = data.image;

        })
}