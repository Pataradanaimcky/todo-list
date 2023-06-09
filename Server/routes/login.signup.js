const express = require("express");
const router = express.Router();

const signup = require('../loginregister/signup.post');
const login = require('../loginregister/login.post');

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

module.exports = router;