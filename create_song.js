// Script to prompt user for inputs of song data, then upload those entries to the database

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

let entries = {
    name: '',
    duration: '',
    release_year: ''
};

// Create prompts for user to input the song data

prompt(`Welcome to the ${config.database} database. Press enter to start input of song data:`)
    .then(function goToInput() {
        return prompt.multiline('Please enter song name/title: ');
    })
    .then(function addName(val) {
        entries.name = val;
        return prompt.multiline('Please enter song duration in format mm:ss : ');
    })
    .then(function addTime(val) {
        entries.duration = val;
        return prompt.multiline('Please enter song release year: ');
    })
    .then(function addYear(val) {
        entries.release_year = val;
        console.log(entries);
        addTrack();
        prompt.done();
    })
    .catch((err) => {
        console.error('Ouch! There was a problem with data input: ' + err.stack);
        prompt.finish();
    }); 

function addTrack () {

    let query = "INSERT INTO song (name, duration, release_year) VALUES (${name}, ${duration}, ${release_year});";

    db.result(query, entries)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error('Ouch! There was a problem uploading data to db: ' + err.stack);
        });
};    
