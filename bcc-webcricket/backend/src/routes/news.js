const express = require('express');
const News = require('../models/News');
const { basicAdminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await News.find().sort({ date: -1 });
  res.json(items);
});

router.post('/', basicAdminAuth, async (req, res) => {
  try {
    const created = await News.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', basicAdminAuth, async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', basicAdminAuth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;

