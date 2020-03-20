const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: {
        type: String,
        required: true
    },
    newsId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

const Track = mongoose.model('Comments', CommentsSchema);

module.exports = Track;