const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
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
            max: 5,
            required: true
        },
        comment: {
            body: {
                type: String,
                maxLength: 10000
            },
            date_changed: {
                type: Date
            }
        },
        date: {
            type: Date,
            required: true,
            default: new Date()
        }
    }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review