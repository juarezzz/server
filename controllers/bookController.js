const Book = require('../models/Book')
const User = require('../models/User')
const { findBookById, findBooksByTitle } = require('../queries/bookQueries')
const catchAsync = require('../utils/catchAsync')

exports.book_list = catchAsync(async (req, res) => {
    const { search } = req.query
    const books = search ? await findBooksByTitle(search) : await Book.find({})
    res.status(200).json(books)
})

exports.book_detail = catchAsync(async (req, res) => {
    const { bookId } = req.params
    const book = await findBookById(bookId)
    res.status(200).json(book[0])
})

exports.book_create = catchAsync(async (req, res) => {
    const newBook = new Book(req.body)
    await newBook.save()
    res.status(201).json(newBook)
})

exports.book_create_review = catchAsync(async (req, res) => {
    const { bookId } = req.params
    const { user, score, comment } = req.body
    const book = await Book.findById(bookId)
    const userDoc = await User.findById(user.userId)

    //Verificar se o livro está na biblioteca do usuário
    const userBook = userDoc.books.find(bookObject => String(bookObject.book._id) === bookId)
    if (userBook) {
        userBook.review = { score, comment }
        await userDoc.save()
    }

    //Verificar se o usuário já possui uma review
    const userReview = book.reviews.find(review => String(review.user.userId) === user.userId)

    if (userReview) {
        if (score) userReview.score = score
        if (comment) userReview.comment = comment

    } else {
        const newReview = {
            user,
            score,
            comment
        }
        book.reviews.push(newReview)
    }

    await book.save()
    res.status(201).end()
})