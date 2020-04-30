
const prompt = require('prompt-promise');

const { Artist, Album, Song, Track } = require('./sequelize');


prompt('Welcome to the music database. Press enter to start')
    .then(function goToNext() {
        return prompt.multiline('Press enter to retrieve all artist entries');
    })
    .then(function getArtist() {
        queryArtists();
        prompt.done();
    })
    .catch((err) => {
        console.error('Oopsie-Woopsie, DUMMY there was an error: ' + err.stack);
        prompt.finish();
    });    


function queryArtists() {

    Artist.findAll()
        .then((res) => {
            res.forEach((entry) =>
            console.log(entry.dataValues.artist_name));
        })
        .catch((err) => {
            console.error('Bro.. Did you really think this would work? ' + err.stack);
        });


}


/*
prompt(`Welcome to the music database. Press enter to start`)
    .then(function goToInput() {
        return prompt.multiline('Please enter new artist name: ');
    })
    .then(function artistAdd(value) {
        valObj.name = value;
        addArtist();
        return prompt.multiline('Press enter to view current full list of artists')
    })
    .then(function displayAll() {
        displayArtists();
        prompt.done();
    })
    .catch((err) => {
        console.error('Oopsie-Woopsie, there was an error: ' + err.stack);
        prompt.finish();
    });    
*/