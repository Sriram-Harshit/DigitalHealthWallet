const db = require("../config/db");

const createUser = async ({ name, email, password }) => {
  return db.run(
    `INSERT INTO users (name, email, password)
     VALUES (?, ?, ?)`,
    [name, email, password]
  );
};

const findUserByEmail = async (email) => {
  return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
};

const getReportById = async (reportId) => {
  return db.get(
    `SELECT *
     FROM reports
     WHERE id = ?`,
    [reportId]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  getReportById,
};
