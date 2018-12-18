let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let gameModel = new Schema({
    title: {type: String},
    developer: {type: String},
    genre: {type: String},
    played: {type: String, default:false},
    _links: {
        self: {href: {type: String}},
        collection: {href: {type: String}}
    }
});

module.exports = mongoose.model('Game', gameModel);