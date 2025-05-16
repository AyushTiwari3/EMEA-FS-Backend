const express = require('express');
const { register, login } = require('../controllers/authController');
const {
  getAllItems,
  createItem,
  searchItems,
  getPdf
} = require('../controllers/itemsController');

const router = express.Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login',    login);

// Items
router.get( '/items',         getAllItems);       // ← GET /api/items
router.get( '/items/search',  searchItems);       // ← GET /api/items/search?query=…
router.get( '/items/pdf/:id', getPdf);            // ← GET /api/items/pdf/:id
router.post('/item',         createItem);        // ← POST /api/items

module.exports = router;
