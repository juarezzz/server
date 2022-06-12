const express = require('express');
const router = express.Router();
const { user_list, user_detail, user_create, user_authenticate, user_books, user_add_book, user_remove_book, user_get_book_lists, user_update } = require('../controllers/userController')

router.get('/', user_list)

router.get('/:id', user_detail)

router.post('/', user_create)

router.post('/authenticate', user_authenticate)

router.get('/:id/books', user_books)

router.post('/:id/books', user_add_book)

router.delete('/:userId/books/:bookId', user_remove_book)

router.patch('/:id', user_update)

module.exports = router