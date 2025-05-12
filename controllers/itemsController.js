const Item = require('../models/itemsModel');

exports.searchItems = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Item.find({
      title: { $regex: query, $options: 'i' },
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching items' });
  }
};

exports.getPdf = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item || !item.pdfUrl) return res.status(404).send('PDF not found');
    res.redirect(item.pdfUrl);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching PDF' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, pdfUrl } = req.body;

    if (!title || !description || !pdfUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = await Item.create({ title, description, pdfUrl });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item' });
  }
};
