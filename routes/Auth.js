const express = require('express');
const { register, login, requestPasswordReset, resetPassword, logout, authCheck } = require('../controllers/AuthController');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/:token', resetPassword);
router.get('/authCheck', authCheck);
router.post('/logout', logout);

module.exports = router;
