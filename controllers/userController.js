const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.user_list = async (req, res) => {
    const users = await User.find({}, '-password')
    res.status(200).json(users)
}

exports.user_detail = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, '-shelves')
    res.status(200).json(user)
}

exports.user_create = async (req, res) => {
    const { username, email, password } = req.body
    //Proteger as senhas com um algoritmo de hash
    const hash = await bcrypt.hash(password, 12)
    const newUser = new User({ username, email, password: hash })
    //Adicionar as 'shelves' padrões para todos os usuários
    newUser.shelves = [
        { name: 'Read', custom: false, books: [] },
        { name: 'To Read', custom: false, books: [] },
        { name: 'Currently Reading', custom: false, books: [] }
    ]
    await newUser.save()
    res.status(201).json(newUser)
}

exports.user_authenticate = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const match = await bcrypt.compare(password, user._doc.password)
        if (match) res.status(200).json({ id: user._id, username: user.username, avatar: user.avatar})
        else {
            res.status(401).end()
        }
    } else {
        res.status(401).end()
    }
}

exports.user_books = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, 'books -_id').populate('books.book')
    res.status(200).json(user.books)
}

exports.user_add_book = async (req, res) => {
    const { id } = req.params
    const { status, book } = req.body
    const user = await User.findById(id)
    const bookIndex = user.books.findIndex(bookObject => String(bookObject.book) === book)

    //Se o livro já estiver na lista do usuário só é preciso mudar o status
    if (bookIndex > -1) {
        user.books[bookIndex].status = status
        user.books[bookIndex].date_added = new Date()
    } else {
        //Se não estiver é adicionado à lista
        user.books.push({ book, status })
    }
    await user.save()
    res.status(201).json(user)
}