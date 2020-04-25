
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


// Attempting to create an object to store values from prompt-promise in .. running into problems though and it's returning
let res = {
    artistName: '',
    albumName: '',
    albumYear: '',
    albumArtist: ''
};

// commenting out below portion . Initially wanted to greet user with welcome message, then go into storing prompts, but incurred error
/* prompt('Welecome to the music database!')
    .then (() => {return prompt.artist('Enter Artist Name: ')})
    .then (function artist(val) {
        res.push(val);
        console.log(res);
        prompt.done();
    })
    .catch((err) => {
        console.error('There was an oopsie-woopsie' + err);
        prompt.finish();
    }); */

prompt('Enter artist name: ')
    .then(function artistName(value) {
        res.artistName = value;
        return prompt.multiline('Enter album name: ');
    })
    .then(function albumName(value) {
        res.albumName = value;
        return prompt.multiline('Enter album year: ');
    })
    .then(function ablumYear(value) {
        res.albumYear = value;
        return prompt.multiline('Enter artist ID: ');
    })
    .then(function albumArtist(value) {
        res.albumArtist = value;
        console.log(res);
        prompt.done();
    })
    .catch((error) => {
        console.error('Oopsie-Woopsie, there was an error: ' + error)
    });    

 