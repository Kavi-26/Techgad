const express = require('express');
const { registerUser, testAPI } = require('../controllers/userController');

const router = express.Router();

router.get('/test', testAPI);
router.post('/register', registerUser);

module.exports = router;
