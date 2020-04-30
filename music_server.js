
const prompt = require('prompt-promise');

const { Artist, Album, Song, Track } = require('./sequelize');

// create artist object with empty string to hold prompt input values 
var artistObj = {
    name: ''
};
var albumObj = {
    name: '',
    artID: '',
    year: ''
};

prompt(`Welcome to the music database. Press enter to start`)
    .then(function goToInput() {
        return prompt.multiline('Please enter new artist name: ');
    })
    .then(function artistAdd(value) {
        artistObj.name = value;
        addArtist();
        return prompt.multiline('Press enter to view current full list of artists')
    })
    .then(function displayAll() {
        queryArtists();
        return prompt.multiline('Enter album name: ')
    })
    .then(function startAlbum(val) {
        albumObj.name = val;
        return prompt.multiline('Enter artist-ID: ')
    })
    .then(function addID(val) {
        albumObj.artID = val;
        return prompt.multiline('Enter album release year: ')
    })
    .then(function addYr(val) {
        albumObj.year = val;
        addAlbum();
        prompt.done();
    })
    .catch((err) => {
        console.error('Oopsie-Woopsie, there was an error: ' + err.stack);
        prompt.finish();
    });    



// Using sequelize objects, a function to enter the artist name into the database    
function addArtist() {
    Artist.create({ artist_name: artistObj.name })
        .then((res) => {
            console.log(`You entered ${res} into the artist database`)
        })
        .catch((err) => {
            console.error(`You screwed the proverbial pooch somehow ${err.stack}`)
        });
}    
// Function to return the list of names in the artist table
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
function addAlbum() {
    Album.create( { album_name: albumObj.name, artist_id: albumObj.artID, release_year: albumObj.year })
        .then((res) => {
            console.log('You successfully updated the album table' + res)
        })
        .catch((err) => {
            console.error('You screwed the puppy! ' + err.stack)
        });
}