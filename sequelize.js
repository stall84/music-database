
// This is an attempt at a 'bootstrap' file which will configure and export everything we need for the main js file (music_server.js)

// First bring in dependencies and require the models
const Sequelize = require('sequelize');
const ArtistModel = require('./models/artist');
const AlbumModel = require('./models/album');
const SongModel = require('./models/song');
const TrackModel = require('./models/track');

// instantiate sequelize and pass in connection info
const sequelize = new Sequelize('music_db','postgres','postgres', {
    host: 'localhost',
    dialect: 'postgres'
});


// instantiate your models (being imported in from models folder) passing in first an instance of sequelize and then the Sequelize library 
const Artist = ArtistModel(sequelize, Sequelize);

const Album = AlbumModel(sequelize, Sequelize);
/*
const Song = SongModel(sequelize, Sequelize);
const Track = TrackModel(sequelize, Sequelize);
*/

module.exports = {
    Artist,
    Album
};