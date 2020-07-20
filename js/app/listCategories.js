const categoriesUl = document.querySelector('#categories');

getCategories()
    .then(data => showCategories(data));

function getCategories() {
    return fetch(`${API_URL}/categories`)
        .then(res => res.json());
}

function showCategories(categories) {
    categories.forEach(category => {
        const li = document.createElement('li');
        categoriesUl.appendChild(li);
        li.outerHTML = `
        <li>
            <a href="category.html?id=${category.id}">${category.name}</a>
        </li>
        `;
    });
}