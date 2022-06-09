const express = require('express');
const router = express.Router();
const { user_list, user_detail, user_create, user_authenticate, user_books, user_add_book } = require('../controllers/userController')

router.get('/', user_list)

router.get('/:id', user_detail)

router.post('/', user_create)

router.post('/authenticate', user_authenticate)

router.get('/:id/books', user_books)

router.post('/:id/books/add', user_add_book)

module.exports = router