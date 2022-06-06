const express = require('express')
const router = express.Router()
const { book_list, book_detail, book_create, book_create_review } = require('../controllers/bookController')

router.get('/', book_list)

router.get('/:id', book_detail)

router.post('/', book_create)

router.post('/:id/reviews', book_create_review)

module.exports = router;