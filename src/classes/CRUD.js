class CRUD {
    constructor(apiUrl = 'https://jsonplaceholder.typicode.com') {
        this.apiUrl = apiUrl;
    }

    validateResponse(response) {
        if (response.status >= 400) {
            throw new Error('Network error');
        }
    }

    async get(path) {
       try {
           const response = await fetch(path ? `${this.apiUrl}/${path}`: this.apiUrl);
           this.validateResponse(response);
           return response.json();
       } catch(exception) {
           console.log('debug exception: ', exception);
           return [];
       }
    }
}