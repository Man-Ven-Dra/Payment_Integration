const express = require('express');
const { stripePayment } = require('../paymentController/payment');

const router = express.Router();


router.post('/payment-session', stripePayment);

module.exports = router;