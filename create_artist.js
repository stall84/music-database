/* Commenting out pg-promise code while 'migrating' to sequelize */

/*
const config = {

    host: 'localhost',
    port: 5432,
    database: 'music_db',
    user: 'postgres'

};

const pgp = require('pg-promise')();
const db = pgp(config);
const co = require('co');
*/

const Sequelize = require('sequelize');
const prompt = require('prompt-promise');

const sequelize = new Sequelize('music_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

const Model = Sequelize.Model;

class Artist extends Model {};

Artist.init({
    artist_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: 'Artist',
    tableName: 'artist',
    timestamps: false
});

// Attempting to create an object to store values from prompt-promise in .. running into problems though and it's returning
/*
let res = {
  artistName: '',
};
*/
prompt(`Welcome to the music database. Press enter to search all artist entries`)
    .then(function goToInput() {
        return prompt.multiline('Press enter to display artist table');
    })
    .then(function display() {
        searchArtist();
        prompt.done();
    })
    .catch((err) => {
        console.error('Oopsie-Woopsie, there was an error: ' + err.stack);
        prompt.finish();
    });    

/*function addArtist () {

    let query = "INSERT INTO artist (artist_name) VALUES ($1);";

    db.result(query, res.artistName)
        .then(function(res) {
            console.log(res);
        })
        .catch((err) => {
            console.error('There was an error uploading to database: ' + err.stack);
        });
};
*/

function searchArtist () {
    Artist.findAll()
        .then((res) => {
            res.forEach((row) => {
                console.log(row)
            })
        })
        .catch((error) => {
            console.error('There was an error: ' + error.stack);
        })
};