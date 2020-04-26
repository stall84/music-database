
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

exports.db = db;
exports.prompt = prompt;

// Attempting to create an object to store values from prompt-promise in .. running into problems though and it's returning
let res = {
  artistName: '',
};

prompt(`Welcome to the ${config.database} database. Press enter to start input of artist data`)
    .then(function goToInput() {
        return prompt.multiline('Enter artist name: ');
    })
    .then(function artistName(value) {
        res.artistName = value;
        console.log(res);
        addArtist();
        prompt.done();
    })
    .catch((err) => {
        console.error('Oopsie-Woopsie, there was an error: ' + err.stack);
        prompt.finish();
    });    

function addArtist () {

    let query = "INSERT INTO artist (artist_name) VALUES ($1);";

    db.result(query, res.artistName)
        .then(function(res) {
            console.log(res);
        })
        .catch((err) => {
            console.error('There was an error uploading to database: ' + err.stack);
        });
};

