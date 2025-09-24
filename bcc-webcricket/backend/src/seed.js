const mongoose = require('mongoose')
require('dotenv').config()
const Player = require('./models/Player')
const Fixture = require('./models/Fixture')
const Match = require('./models/Match')
const News = require('./models/News')

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  await Promise.all([
    Player.deleteMany({}),
    Fixture.deleteMany({}),
    Match.deleteMany({}),
    News.deleteMany({}),
  ])

  await Player.create([
    { name: 'John Dlamini', team: '1st XI', role: 'Batsman', stats: { matches: 12, runs: 420, wickets: 0 } },
    { name: 'Peter Nkosi', team: '1st XI', role: 'Bowler', stats: { matches: 15, runs: 110, wickets: 28 } },
    { name: 'Sipho Khumalo', team: '2nd XI', role: 'All-Rounder', stats: { matches: 8, runs: 210, wickets: 10 } },
  ])

  const now = new Date()
  await Fixture.create([
    { title: 'BCC vs Rivals', date: new Date(now.getTime() + 7*24*3600*1000), venue: 'BCC Oval' },
    { title: 'BCC vs Lions', date: new Date(now.getTime() + 14*24*3600*1000), venue: 'Lions Park' },
  ])

  await Match.create([
    { title: 'BCC vs Tigers', date: new Date(now.getTime() - 10*24*3600*1000), summary: 'BCC won by 5 wickets', players: [ { name: 'John Dlamini', runs: 85, wickets: 0 }, { name: 'Peter Nkosi', runs: 12, wickets: 4 } ] },
  ])

  await News.create([
    { title: 'Pre-season training announced', content: 'Training starts next Monday at 5pm.', date: now },
  ])

  console.log('Seeded sample data')
  await mongoose.disconnect()
}

run().catch(e => { console.error(e); process.exit(1) })

