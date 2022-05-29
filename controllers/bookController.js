const Book = require('../models/Book')

exports.book_list = async (req, res) => {
    const books = await Book.find({})
    res.status(200).json(books)
}

exports.book_detail = async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)
    res.status(200).json(book)
}

exports.book_create = async (req, res) => {
    const newBook = new Book(req.body)
    await newBook.save()
    res.status(201).json(newBook)
}