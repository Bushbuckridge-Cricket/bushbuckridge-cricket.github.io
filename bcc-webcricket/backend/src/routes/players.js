const express = require('express');
const Player = require('../models/Player');
const { basicAdminAuth } = require('../middleware/auth');

const router = express.Router();

// Public
router.get('/', async (req, res) => {
  const players = await Player.find().sort({ createdAt: -1 });
  res.json(players);
});

// Admin
router.post('/', basicAdminAuth, async (req, res) => {
  try {
    const created = await Player.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', basicAdminAuth, async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', basicAdminAuth, async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;

