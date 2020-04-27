// Script to receive user inputs for track data and then upload to database server

const config = {

    host: 'localhost',
    port: 5432,
    database: 'music_db',
    user: 'postgres'

};

const pgp = require('pg-promise')();
const db = pgp(config);
const co = require('co');
const prompt = require('prompt-promise');

let entries =  {
    song_id: '',
    album_id: ''
};

prompt(`Welcome to the ${config.database} database. Press enter to start input of track data:`)
    .then(function goToInput() {
        return prompt.multiline('Please enter the related song_id: ');
    })
    .then(function addSongID(val) {
        entries.song_id = val;
        return prompt.multiline('Please enter the related album_id: ');
    })
    .then(function addAlbumID(val) {
        entries.album_id = val;
        console.log(entries);
        addTrack();
        prompt.done();
    })
    .catch((err) => {
        console.error('Wowzers something went wrong: ' + err.stack);
        prompt.finish();
    });

function addTrack () {

    let query = "INSERT INTO track (song_id, album_id) VALUES (${song_id}, ${album_id});";

    db.result(query, entries) 
        .then((results) => {
            console.log(results);
        })
        .catch((err) => {
            console.error('Wowzers something went wrong in upload to db: ' + err.stack);
        });
}; 