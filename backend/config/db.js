const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const logger = require("../utils/logger");

const dbPath = path.join(__dirname, "../database.sqlite");

const initializeTables = (db) => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'owner',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => err && logger.error("Users table error", err)
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        file_name TEXT,
        file_path TEXT,
        report_type TEXT,
        report_date TEXT,
        uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => err && logger.error("Reports table error", err)
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS vitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        value TEXT,
        unit TEXT,
        recorded_at DATETIME
      )
    `,
      (err) => err && logger.error("Vitals table error", err)
    );
  });
};

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error("❌ DB connection failed", err);
  } else {
    logger.info("✅ SQLite connected");
    initializeTables(db);
  }
});

const run = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });

const get = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

const all = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

module.exports = { run, get, all };
