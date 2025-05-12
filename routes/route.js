// Import required modules
const express = require('express');
const { register, login } = require('../controllers/authController');
const { createItem, searchItems, getPdf } = require('../controllers/itemsController');

const router = express.Router();

// Auth routes
router.post('/auth/register', register); // Register
router.post('/auth/login', login);       // Login

// Item-related routes
router.post('/items', createItem);       // Item creation
router.get('/items/search', searchItems); // Search items by query
router.get('/items/pdf/:id', getPdf);   // Get PDF by item ID

module.exports = router;
