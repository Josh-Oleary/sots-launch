const express = require('express');
const router = express.Router();
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(users.registerUser);

router.route('/login')
    .get(users.renderLogin)
    .post(users.loginUser)

router.route('/logout')
    .get(users.logout)

module.exports = router;