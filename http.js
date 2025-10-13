export async function fetcher(URL, options) {
    return fetch(URL, options).then((res) => res.json());
}
