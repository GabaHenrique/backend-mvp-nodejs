const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/dashboard', authMiddleware, adminController.getDashboard);
router.post('/register', authMiddleware, adminController.register);
router.post('/login', adminController.login);

module.exports = router;