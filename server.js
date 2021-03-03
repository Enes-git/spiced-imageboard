const express = require('express');
const app = express();
const db = require('./db');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const { s3Url } = require('./config');

// setting storage place and limitations
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4097152,
    },
});

app.use(express.static('public'));

app.get('/images', (req, res) => {
    console.log('hit the get "/images" route!');
    db.getAllImageInfo()
        .then(({ rows }) => {
            // console.log('rows :>> ', rows);
            return res.json(rows);
        })
        .catch((err) => {
            console.log('err in getImages :>> ', err);
        });
});
app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    console.log('hit the post route....');
    console.log('req.file :>> ', req.file);
    console.log('req.body :>> ', req.body);

    const { title, username, description } = req.body;
    const { filename } = req.file;
    let url = s3Url + filename;

    db.addNewImage(url, username, title, description)
        .then(() => {
            res.json({
                title: title,
                username: username,
                description: description,
                url: url,
                success: true, // no need this
            });
        })
        .catch((err) => {
            console.log('err in route "/upload" addNewImage :>> ', err);
            res.json({
                success: false,
            });
        });
});
app.get('/images/img_detail/:id', (req, res) => {
    const requestedId = req.params.id;
    db.getSelectedImage(requestedId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(
                'err in db.getSelectedImage /img_detail route :>> ',
                err
            );
        });
});
app.get('/comments/:id', (req, res) => {
    // console.log('req.params :>> ', req.params);
    const requestedId = req.params.id;
    db.getComments(requestedId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log('err in db.getComments /comments route :>> ', err);
        });
});
app.post('/post_comment', (req, res) => {
    const { username, comment, image_id } = req.body;
    db.postComment(username, comment, image_id)
        .then(({ rows }) => {
            console.log('rows :>> ', rows);
        })
        .catch((err) => {
            console.log('err in db.postComment /post_comment :>> ', err);
        });
});
app.listen(8080, () => console.log(`I'm all ears Imageboard Master!`));

// ==================================================
// const cardDeck = [
//     // got this part completely wrong!!!
//     {
//         id: 1, // cannot get this for the ids of tags ??????
//         //and constantly getting id error
//         img: '/images/bosphorus.jpg',
//         width: '50px', // could not get these props through vue???????
//         height: '50px',
//         explanation: 'Dusk in Bosphorus',
//     },
//     {
//         id: 2,
//         img: '/images/seagull.jpg',
//         width: '50px',
//         height: '50px',
//         explanation: 'Seagull over The Maiden Tower',
//     },
//     {
//         id: 3,
//         img: '/images/cutie.jpg',
//         width: '50px',
//         height: '50px',
//         explanation: 'Cutie looking over in my lap',
//     },
// ];
