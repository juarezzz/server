const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.user_list = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

exports.user_detail = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
}

exports.user_create = async (req, res) => {
    const { username, email, password } = req.body
    const hash = await bcrypt.hash(password, 12)
    const newUser = new User({ username, email, password: hash })
    await newUser.save()
    res.status(201).json(newUser)
}

exports.user_authenticate = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const match = await bcrypt.compare(password, user._doc.password)
        if (match) res.status(200).json()
        else {
            res.status(401).json({ error: 'Wrong password' })
        }
    } else {
        res.status(401).json({ error: 'User not found' })
    }
}