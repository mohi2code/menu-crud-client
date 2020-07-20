const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');

    addCategory(name)
        .then(data => {
            window.location = `/category.html?id=${data.id}&category_name=${data.name}`
        });
});

function addCategory(name) {
    return fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }).then(res => res.json());
}