const form = document.querySelector('form');
const categoriesSelect = document.querySelector('#categories-select');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const description = formData.get('description');
    const category_id = formData.get('category_id');
    const price = formData.get('price');
    const calories = formData.get('calories');
    const image = formData.get('image');

    const foodData = {
        name,
        description,
        category_id,
        price,
        calories,
        image
    };

    fetch(`${API_URL}/food`, {
            method: 'POST',
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
    .then(data => listCategories(data));

function listCategories(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        categoriesSelect.appendChild(option);
        option.outerHTML = `
            <option value="${category.id}">${category.name}</option>
        `;
    });
}