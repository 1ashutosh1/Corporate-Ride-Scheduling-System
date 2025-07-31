const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectToDB = require('./config/db');
connectToDB();

app.use(express.json());

app.use('/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
