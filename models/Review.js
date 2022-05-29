const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        score: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            maxlength: 10000
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