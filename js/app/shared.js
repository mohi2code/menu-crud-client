API_URL = 'http://localhost:3000';

function getIdFromQuery() {
    return window.location.search.match(/\?id=([0-9a-zA-Z\-]+)/)[1];
}

function getCategoryFromQuery() {
    return window.location.search.match(/\&category_name=([0-9a-zA-Z\-]+)/)[1];
}