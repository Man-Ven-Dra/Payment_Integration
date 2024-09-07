const express = require('express');
const connectDB = require('./config/database');
const router = require('./routes/paymentRoute');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', router)

connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost/${PORT}`)
})