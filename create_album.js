
const prompt = require('prompt-promise');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

class Album extends Model {}

Album.init({

    album_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artist_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Artist,
            key: 'id'
        }
    },
    release_year: {
        type: Sequelize.INTEGER
    }

}, {
    sequelize,
    modelName: 'Album',
    tableName: 'album',
    timestamps: false
});

let respObj = {
  albumName: '',
  albumYear: '',
  albumArtist: ''
};

prompt(`Welcome to the music database. Press enter to begin entering new album data`)
    .then(function goToInput() {
        return prompt.multiline('Enter album name: ');
    })
    .then(function albumName(val) {
        respObj.albumName = val;
        return prompt.multiline('Enter album release year: ');
    })
    .then(function albumYear(val) {
        respObj.albumYear = val;
        return prompt.multiline('Enter artist reference ID: ');
    })
    .then(function albumArtist(val) {
        respObj.albumArtist = val;
        addAlbum();
        prompt.done();
    })
    .catch((err) => {
        console.error('There was a problem encountered in adding the album: ' + err.stack);
        prompt.finish();
    });

function addAlbum () {

    Album.create( {album_name: respObj.albumName, release_year: respObj.albumYear, artist_id: respObj.albumArtist})
        .then((album) => {
            console.log('Album successfully created!')
        })
        .catch((err) => {
            console.error('Whoa homie.. slow ur dang roll: ' + err.stack);
        });

};