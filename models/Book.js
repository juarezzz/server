const mongoose = require('mongoose')
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book