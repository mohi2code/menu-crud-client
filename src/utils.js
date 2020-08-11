export function getEmailFromQuery() {
    const query = window.location.search.match(/\?email=([0-9a-zA-Z@\.\-]+)/);
    return query ? query[1] : '';
}
