require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authApi');
const userApi = require('./routes/userApi');
const connectDB = require('./database/connectDB');
const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);
app.use('/user', userApi);

connectDB();
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Running on port ${PORT}`))
})