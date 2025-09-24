const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  matches: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  catches: { type: Number, default: 0 },
}, { _id: false });

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'], required: true },
  stats: { type: statsSchema, default: () => ({}) },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);

