new Vue({
    el: '#app',
    data: {
        name: '',
        url: ''
    },
    methods: {
        async createShorty() {
            const API_URI = '/api/shorty';
            const body = {
                name: this.name,
                url: this.url
            };

            const response = await fetch(API_URI, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const result = await response;
            console.log(result);
            return response.json();
        }
    }
});