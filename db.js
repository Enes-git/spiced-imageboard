var spicedPg = require('spiced-pg');
var db = spicedPg('postgres:postgres:postgres@localhost:5432/imageboard');

// getting all images
module.exports.getAllImageInfo = () => {
    const q = `
    SELECT * FROM images
    ORDER BY id DESC
    LIMIT 10`;
    return db.query(q);
};

// adding new image
module.exports.addNewImage = (url, username, title, description) => {
    const q = `
    INSERT INTO images (url,username,title,description)
    VALUES ($1,$2,$3,$4)
    RETURNING id`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

// getting selected image
module.exports.getSelectedImage = (id) => {
    const q = `
    SELECT * FROM images
    WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

// getting img comments
module.exports.getComments = (id) => {
    const q = `
    SELECT * FROM comments
    WHERE image_id = ($1)
    ORDER BY id DESC`;
    const params = [id];
    return db.query(q, params);
};

// adding new comment
module.exports.postComment = (username, comment, image_id) => {
    const q = `
    INSERT INTO comments
    VALUES ($1,$2,$3)
    RETURNING *`;
    const params = [username, commetn, image_id];
    return db.query(q, params);
};
