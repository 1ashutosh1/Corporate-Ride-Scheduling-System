const express = require('express');
const app = express();
require('dotenv').config();
const connectToDB = require('./config/db');
connectToDB();

app.use(express.json());

app.get('/', (req,res) => {
  console.log('Test API for basic setup');
  res.status(200).json({message: "Get request made"});
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
})
