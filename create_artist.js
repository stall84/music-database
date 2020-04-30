
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

var valObj = {
    name: ''
};

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



function displayArtists () {
    Artist.findAll()
        .then((res) => {
            res.forEach((row) => {
                console.log(row.dataValues.artist_name);
            })
        })
        .catch((error) => {
            console.error('There was an error: ' + error.stack);
        })
};


function addArtist () {
    Artist.create({ artist_name: valObj.name })
        .then((artist) => {
            console.log('New artist added!');
        })
        .catch((err) => {
            console.error('Whoaaaa There SMART GUY.. There was a problem: ' + err.stack);
        });
};
