const express = require('express');
const router = express.Router();
const { user_list, user_detail, user_create, user_authenticate } = require('../controllers/userController')

router.get('/', user_list)

router.get('/:id', user_detail)

router.post('/', user_create)

router.post('/authenticate', user_authenticate)

module.exports = router