const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema =
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
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
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
        date_changed: {
            type: Date
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


module.exports = reviewSchema