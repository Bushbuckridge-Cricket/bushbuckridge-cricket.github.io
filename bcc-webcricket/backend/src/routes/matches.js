const express = require('express');
const Match = require('../models/Match');
const { basicAdminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const matches = await Match.find().sort({ date: -1 });
  res.json(matches);
});

router.post('/', basicAdminAuth, async (req, res) => {
  try {
    const created = await Match.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', basicAdminAuth, async (req, res) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', basicAdminAuth, async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;

