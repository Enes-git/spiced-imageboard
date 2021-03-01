var spicedPg = require('spiced-pg');
var db = spicedPg('postgres:postgres:postgres@localhost:5432/imageboard');

// all images
module.exports.getAllImageInfo = () => {
    const q = `
    SELECT * FROM images`;
    return db.query(q);
};

// adding new image
module.exports.addNewImage = () => {
    const q = `
    INSERT INTO images (url,username,title,description)
    VALUES ($1,$2,$3,$4)
    RETURNING id`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
