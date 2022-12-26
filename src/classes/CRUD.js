class CRUD {
    constructor(apiUrl = 'https://jsonplaceholder.typicode.com') {
        this.apiUrl = apiUrl;
    }

    async get(path) {
        const response = await fetch(path ? `${this.apiUrl}/${path}`: this.apiUrl);

        if (response.ok) {
            return response.json();
        }

        console.error('debug exception: ', 'Network error');
    }
}