CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    artist_name VARCHAR(255)
);

CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    album_name VARCHAR(255),
    artist_id INTEGER REFERENCES artist(id),
    release_year INTEGER 
);

CREATE TABLE song (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    duration INTEGER,
    release_year INTEGER
);

CREATE TABLE track (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES song(id),
    album_id INTEGER REFERENCES album(id)
);

CREATE TABLE song_writer (
    id SERIAL PRIMARY KEY,
    writer_name VARCHAR(255)
);

/* "songwriters_link" will be a join-table between song_writers and song*/

CREATE TABLE songwriters_link (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES song(id),
    writer_id INTEGER REFERENCES song_writer(id)
);

/* collab_link will be a join-table between artist and track*/

CREATE TABLE artist_track_collab (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artist(id),
    track_id INTEGER REFERENCES track(id)
);