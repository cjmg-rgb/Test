require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Running on port ${PORT}`)))
  .catch(err => console.log(err))