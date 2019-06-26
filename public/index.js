new Vue({
    el: '#app',
    data: {
        error: '',
        name: '',
        url: '',
        processing: false,
        success: false
    },
    watch: {
        url: function() {
            this.processing = false;
            this.error = '';
        },
        name: function() {
            this.processing = false;
            this.error = '';
        }
    },
    methods: {
        async createShorty() {
            //* Toggle loading animation
            this.processing = true;
            const API_URI = '/api/shorty';
            const body = {
                name: this.name,
                url: this.url
            };

            fetch(API_URI, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(result => {
                if (result.isJoi) {
                    //* Validation error
                    this.error = result.details.map(detail => detail.message).join('. ');
                } else {
                    this.success = true;
                }
            });
            // this.processing = false;
        }
    }
});