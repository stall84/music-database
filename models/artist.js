
// Main model for Artist table 

// export the model being created. Once again passing in instance of sequelize and Sequelize library as well
// using an anonymous arrow function that will return a Model instance for this

module.exports = (sequelize, type) => {
    // using sequelize.define method which is same as init where you have to extend the class first param 'artist' is name of table
    return sequelize.define('artist', {
        // attributes (colums) of table
        artist_name: {
            type: type.STRING,
        }
    }, {
        //OPTIONS : First define the table and models name & We want to turn off the automatic creation of 'created-at' columns
        sequelize,
        modelName: 'Artist',
        tableName: 'artist',
        timestamps: false
    })
    
};