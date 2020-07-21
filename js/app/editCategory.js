const form = document.querySelector('form');
document.querySelector('#category_name').value = getCategoryFromQuery();

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');

    updateCategory(name)
        .then(data => {
            window.location = `/category.html?id=${data.id}&category_name=${data.name}`
        });
});

function updateCategory(name) {
    return fetch(`${API_URL}/categories/${getIdFromQuery()}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then(res => res.json());
}