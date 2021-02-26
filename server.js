const express = require('express');
const app = express();

app.use(express.static('public'));

const cardDeck = [
    // got this part completely wrong!!!
    {
        id: 1, // cannot get this for the ids of tags ??????
        //and constantly getting id error
        img: '/images/bosphorus.jpg',
        width: '50px', // could not get these props through vue???????
        height: '50px',
        explanation: 'Dusk in Bosphorus',
    },
    {
        id: 2,
        img: '/images/seagull.jpg',
        width: '50px',
        height: '50px',
        explanation: 'Seagull over The Maiden Tower',
    },
    {
        id: 3,
        img: '/images/cutie.jpg',
        width: '50px',
        height: '50px',
        explanation: 'Cutie looking over in my lap',
    },
];

app.get('/cardDeck', (req, res) => {
    console.log('hit the get "/cardDeck" route!');
    res.json(cardDeck);
});

app.listen(8080, () => console.log(`I'm all ears Imageboard Master!`));
