console.log('sanity :>> ');

new Vue({
    el: '#main',
    data: {
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
                // console.log('response.data :>> ', response.data);
                self.images = response.data.reverse();
            })
            .catch(function (err) {
                console.log('err in get /images axios :>> ', err);
            });
    },
    methods: {
        handleClick: function () {
            console.log('click handled :>> ');
            this.seen = !this.seen;
            var formData = new FormData();
            var self = this;
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('username', this.username);
            formData.append('file', this.file);
            // console.log('formData :>> ', formData);
            // bunch of logs for sanity
            // console.log('this.title: ', this.title);
            // console.log('this.description: ', this.description);
            // console.log('this.username: ', this.username);
            // console.log('this.file: ', this.file);
            axios
                .post('/upload', formData)
                .then(function (response) {
                    console.log('response from post req: ', response);
                    self.images.unshift(response.data);
                })
                .catch(function (err) {
                    console.log('error from post req', err);
                });
        },
        handleChange: function (event) {
            console.log('handleChange is running');
            // console.log('event.target.files[0] :>> ', event.target.files[0]);
            this.file = event.target.files[0];
        },
    },
});
