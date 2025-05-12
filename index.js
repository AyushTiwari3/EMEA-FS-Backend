// Import required modules
const express = require('express');
const { connectToMongoDB } = require('./utils/db');
const routes = require('./routes/route'); // Use a single route file for all routes
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

// Use the routes defined in route.js
app.use('/api', routes); // All routes will now be under `/api` (e.g., `/api/auth`, `/api/items`)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
