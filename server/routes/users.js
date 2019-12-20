const express = require('express');
const User = require('../controllers/user');
const router = express.Router();
const validator = require('../validators/validator');

/////////////////////////////////////////////////////////////////////////////////////////
                                    // AUTH ROUTE
/////////////////////////////////////////////////////////////////////////////////////////
router.post('/auth', validator.auth, User.auth);
/////////////////////////////////////////////////////////////////////////////////////////
                                    // REGISTER AUTH
/////////////////////////////////////////////////////////////////////////////////////////
router.post('/register', validator.register, User.register);

module.exports = router;