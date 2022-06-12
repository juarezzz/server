const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = require('./Review')

const userSchema = new Schema({
    username: {
        type: String,
        maxLength: 50,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        maxLength: 10000
    },
    books: [
        {
            _id: false,
            book: {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            },
            status: {
                type: String,
                enum: ['To Read', 'Read', 'Currently Reading']
            },
            date_added: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User