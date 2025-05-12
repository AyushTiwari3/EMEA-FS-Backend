// Import required modules
const express = require('express');
const { connectToMongoDB } = require('./utils/db');
const authRoutes = require('./routes/route'); // Auth routes
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
