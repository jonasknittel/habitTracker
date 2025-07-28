import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, '../../habitTracker.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('DB connection error:', err.message);
    } else {
        console.log('DB connection successful');
    }
})

db.serialize(() => {
    db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,     -- optional now, but useful later
    name TEXT              -- display name
    -- no password field yet if you're not doing login
  )
`),
    db.run(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,     -- optional now, but useful later
    name TEXT NOT NULL,              -- display name
    frequency TEXT,
    streak INTEGER DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )
`),
    db.run(`
  CREATE TABLE IF NOT EXISTS habitEntries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitId INTEGER NOT NULL,
    completedAt TEXT,
    comment TEXT,
    FOREIGN KEY (habitId) REFERENCES habits(id) ON DELETE CASCADE
  )
`)
})

export default db;