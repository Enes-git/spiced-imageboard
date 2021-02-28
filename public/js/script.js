console.log('sanity :>> ');

new Vue({
    el: '#main',
    data: {
        name: 'NS',
        seen: true,
        images: [],
        title: '',
        description: '',
        username: '',
        file: null,
    },
    mounted: function () {
        // to overcoming "this" problem
        var self = this;

        axios
            .get('/images')
            .then(function (response) {
                console.log('response.data :>> ', response.data);
                self.images = response.data;
            })
            .catch(function (err) {
                console.log('err in axios get /images :>> ', err);
            });
    },
    methods: {
        handleClick: function () {
            console.log('click handled :>> ');
            this.seen = !this.seen;
            var formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('username', this.username);
            formData.append('file', this.file);
            // bunch of logs for sanity
            console.log('this.title: ', this.title);
            console.log('this.description: ', this.description);
            console.log('this.username: ', this.username);
            console.log('this.file: ', this.file);
            axios
                .post('/upload', formData)
                .then(function (response) {
                    console.log('response from post req: ', response);
                })
                .catch(function (err) {
                    console.log('error from post req', err);
                });
        },
        handleChange: function (event) {
            console.log('handleChange is running');
            console.log('event.target.list :>> ', event.target.list);
        },
    },
});
