const mongoose = require('mongoose');
const reviewSchema = require('./Review');
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cover_image: {
        type: String
    },
    genres: {
        type: [String],
        required: true
    },
    num_of_pages: {
        type: Number,
        min: 0,
        required: true
    },
    publish_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
    },
    reviews: {
        type: [
            {
                user: {
                    userId: {
                        type: Schema.Types.ObjectId,
                        required: true
                    },
                    username: {
                        type: String,
                        required: true
                    },
                    avatar: {
                        type: String
                    }
                },
                score: {
                    type: Number,
                    min: 0,
                    max: 5
                },
                comment: {
                    body: {
                        type: String,
                        maxLength: 10000
                    },
                    spoilers: {
                        type: Boolean
                    }
                },
                date: {
                    type: Date,
                    required: true,
                    default: new Date()
                }
            }
        ],
        default: []
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book