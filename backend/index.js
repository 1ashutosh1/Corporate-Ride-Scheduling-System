const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req,res) => {
  console.log('Test API for basic setup');
  res.status(200).json({message: "Get request made"});
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
})