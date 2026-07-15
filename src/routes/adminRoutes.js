const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');
const { RedisStore}  = require('rate-limit-redis');
const redisClient = require('../config/redis');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args)
  })
});

router.get('/dashboard', authMiddleware, adminController.getDashboard);
router.post('/register', authMiddleware, adminController.register);
router.post('/login', loginLimiter, adminController.login);

module.exports = router;