const Item = require('../models/itemsModel');

exports.getAllItems = async (req, res) => {
  try {
    const all = await Item.find({});
    return res.json(all);
  } catch (err) {
    console.error('getAllItems error:', err);
    return res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.searchItems = async (req, res) => {
  const { query } = req.query;
  if (!query || !query.trim()) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const results = await Item.find({
      title: { $regex: query, $options: 'i' },
    });
    return res.json(results);
  } catch (err) {
    console.error('searchItems error:', err);
    return res.status(500).json({ message: 'Error searching items' });
  }
};

exports.getPdf = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item || !item.pdfUrl) {
      return res.status(404).json({ message: 'PDF not found' });
    }
    return res.redirect(item.pdfUrl);
  } catch (err) {
    console.error('getPdf error:', err);
    return res.status(500).json({ message: 'Error fetching PDF' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, pdfUrl,type } = req.body;
    if (!title || !description || !pdfUrl || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = await Item.create({ title, description, pdfUrl,type });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error('createItem error:', err);
    return res.status(500).json({ message: 'Error creating item' });
  }
};
