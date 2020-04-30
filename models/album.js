
module.exports = (sequelize, type) => {
    return sequelize.define('album', {
        album_name: {
            type: type.STRING
        },
        artist_id: {
            type: type.INTEGER,
            references: {
                model: 'Artist',
                key: 'id'
            }
        },
        release_year: {
            type: type.INTEGER
        }
    }, {
        //options
        sequelize,
        modelName: 'Album',
        tableName: 'album',
        timestamps: false
    })
};