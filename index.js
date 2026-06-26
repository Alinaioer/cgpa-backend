require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/semesters', require('./routes/semester'));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));