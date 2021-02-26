console.log('sanity :>> ');

new Vue({
    el: '#main',
    data: {
        name: 'NS',
        seen: true,
        cardDeck: [],
    },
    mounted: function () {
        // to overcoming "this" problem
        var self = this;

        axios
            .get('/cardDeck')
            .then(function (response) {
                console.log('response :>> ', response.data);
                self.cardDeck = response.data;
            })
            .catch(function (err) {
                console.log('err in axios get /cardDeck :>> ', err);
            });
    },
    methods: {
        handleClick: function () {
            console.log('click handled :>> ');
            this.seen = !this.seen;
        },
    },
});
