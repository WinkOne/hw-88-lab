const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

const Artist = mongoose.model('News', NewsSchema);

module.exports = Artist;