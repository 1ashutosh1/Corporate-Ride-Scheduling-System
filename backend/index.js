const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 
const connectToDB = require('./config/db');
connectToDB();

app.use(express.json());
// app.get('/', (req,res) => {
//   console.log("Backend is running");
//   res.status(200).json({message: 'Running Fine'});
// })
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use('/rides', rideRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
