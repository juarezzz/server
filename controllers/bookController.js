const Book = require('../models/Book')
const User = require('../models/User')
const { findBookById, findBooksByTitle } = require('../queries/bookQueries')

exports.book_list = async (req, res) => {
    const { search } = req.query
    const books = search ? await findBooksByTitle(search) : await Book.find({})
    res.status(200).json(books)
}

exports.book_detail = async (req, res) => {
    const { bookId } = req.params
    const book = await findBookById(bookId)
    res.status(200).json(book[0])
}

exports.book_create = async (req, res) => {
    const newBook = new Book(req.body)
    await newBook.save()
    res.status(201).json(newBook)
}

exports.book_create_review = async (req, res) => {
    const { bookId } = req.params
    const { user, score, comment } = req.body
    const book = await Book.findById(bookId)
    const userDoc = await User.findById(user.userId)
    const newReview = {
        user,
        book: bookId,
        score,
        comment
    }
    book.reviews.push(newReview)
    console.log(newReview)
    console.log(book.reviews)
    await book.save()
    res.status(201).json(newReview)
}