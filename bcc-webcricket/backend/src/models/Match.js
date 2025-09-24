const mongoose = require('mongoose');

const matchPlayerStatsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
}, { _id: false });

const matchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String, default: '' },
  players: { type: [matchPlayerStatsSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);

