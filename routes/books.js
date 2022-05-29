const express = require('express')
const router = express.Router()
const { book_list, book_detail, book_create } = require('../controllers/bookController')

router.get('/', book_list)

router.get('/:id', book_detail)

router.post('/', book_create)

module.exports = router;