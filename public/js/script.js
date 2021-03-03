(function () {
    console.log('sanity :>> ');

    // selected image
    Vue.component('img-details-component', {
        template: '#img-details-temlate',
        data: function () {
            return {
                url: '',
                title: '',
                description: '',
                username: '',
            };
        },
        props: ['imageId'],
        mounted: function () {
            // console.log('this.imageId component/props :>> ', this.imageId);
            var self = this;
            axios
                .get('/images/img_detail/' + this.imageId)
                .then(function (response) {
                    // console.log('got response from img_detail :>> ', response);
                    // console.log(
                    //     'response data from img_detail :>> ',
                    //     response.data[0]
                    // );
                    const {
                        url,
                        title,
                        description,
                        username,
                    } = response.data[0];
                    self.url = url;
                    self.title = title;
                    self.description = description;
                    self.username = username;
                })
                .catch((err) => {
                    console.log('err in GET/img_details route :>> ', err);
                });
        },
        methods: {
            closeDetails: function () {
                this.$emit('close');
            },
        },
    });

    // comments
    Vue.component('img-comments-component', {
        template: '#img-comments-temlate',
        data: function () {
            return {
                comments: [],
                username: '',
                comment: '',
                created_at: '',
            };
        },
        props: ['imageId'],
        mounted: function () {
            var self = this;
            axios
                .get('/comments/' + this.imageId)
                .then(function (response) {
                    console.log('response.data :>> ', response.data);
                    self.comments = response.data;
                })
                .catch((err) => {
                    console.log('err in GET/comments request :>> ', err);
                });
        },
        methods: {
            postComment: function () {
                var self = this;
                var commentData = {
                    comment: this.comment,
                    username: this.username,
                    image_id: this.imageId,
                };
                axios
                    .post('/post_comment', commentData)
                    .then(function (response) {
                        self.comments.unshift(response.data);
                    })
                    .catch((err) => {
                        console.log('err in /post_comment request :>> ', err);
                    });
            },
        },
    });

    // main Vue
    new Vue({
        el: '#main',
        data: {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            selectedImage: null,
        },
        mounted: function () {
            // to overcoming "this" problem
            var self = this;

            axios
                .get('/images')
                .then(function (response) {
                    // console.log('response.data :>> ', response.data);
                    self.images = response.data;
                })
                .catch(function (err) {
                    console.log('err in get /images axios :>> ', err);
                });
        },
        methods: {
            handleClick: function () {
                console.log('click handled :>> ');
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
            openImage: function (id) {
                // console.log('clicked image with id :>> ', id);
                this.selectedImage = id;
            },
            closeImage: function () {
                this.selectedImage = null;
            },
        },
    });
})();
