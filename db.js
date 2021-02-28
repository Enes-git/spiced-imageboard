var spicedPg = require('spiced-pg');
var db = spicedPg('postgres:postgres:postgres@localhost:5432/imageboard');

// all images
module.exports.getAllImageInfo = () => {
    const q = `
    SELECT * FROM images`;
    return db.query(q);
};

//
