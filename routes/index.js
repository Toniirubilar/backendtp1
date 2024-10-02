const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const paymentRouter = require('./payments');

router.use('/users', userRouter);
router.use('/payments', paymentRouter);

module.exports = router;