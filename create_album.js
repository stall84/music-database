
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


/* Attempted to export modules and require them here, but ran into errors

const db = require('./create_artist');
const prompt = require('./create_artist');
*/

let res = {
  albumName: '',
  albumYear: '',
  albumArtist: ''
};

prompt('Add album name: ')
    .then(function albumName(val) {
        res.albumName = val;
        return prompt.multiline('Enter album release year: ');
    })
    .then(function albumYear(val) {
        res.albumYear = val;
        return prompt.multiline('Enter artist reference ID: ');
    })
    .then(function albumArtist(val) {
        res.albumArtist = val;
        console.log(res);
        addAlbum();
        prompt.done();
    })
    .catch((err) => {
        console.error('There was a problem encountered in adding the album: ' + err.stack);
        prompt.finish();
    });

function addAlbum () {

    let query2 = "INSERT INTO album (album_name, release_year, artist_id) VALUES (${albumName}, ${albumYear}, ${albumArtist});";
        
    db.result(query2, res)
        .then(function(res) {
            console.log(res);
        })
        .catch((err) => {
            console.error('This fd up somewhere in the db-result: ' + err);
        });
        
};