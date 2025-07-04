const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/db');
const apiLimiter = require('./middleware/rateLimiter');
const userRoute = require('./routes/userRoute');
const documentRoute = require('./routes/documentRoute');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
    res.send(' DOc API is running...');
});

app.use('/api/auth', userRoute)

// app.use('/api/documents',apiLimiter);

app.use('/api/documents', documentRoute);


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});