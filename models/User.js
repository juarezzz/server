const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        maxLength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

exports = User