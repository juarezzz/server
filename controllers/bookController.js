const Book = require('../models/Book')
const Review = require('../models/Review')
const { findBookById, findBooksByTitle } = require('../queries/bookQueries')

exports.book_list = async (req, res) => {
    const { search } = req.query
    const books = search ? await findBooksByTitle(search) : await Book.find({})
    res.status(200).json(books)
}

exports.book_detail = async (req, res) => {
    const { id } = req.params
    const book = await findBookById(id)
    res.status(200).json(book[0])
}

exports.book_create = async (req, res) => {
    const newBook = new Book(req.body)
    await newBook.save()
    res.status(201).json(newBook)
}

exports.book_create_review = async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id)
    const newReview = new Review(req.body)
    book.reviews.push(newReview)
    newReview.book = book
    await book.save()
    await newReview.save()
    res.status(201).json(newReview)
}