const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const connectToDB = require('./config/db');
connectToDB();

app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
