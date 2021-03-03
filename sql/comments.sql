DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR NOT NULL CHECK (username <> ''),
    comment     TEXT NOT NULL CHECK (comment <> ''),
    image_id    INTEGER NOT NULL REFERENCES images (id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
