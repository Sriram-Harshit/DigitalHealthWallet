const db = require("../config/db");

const addVital = async ({ userId, type, value, unit, recordedAt }) => {
  return db.run(
    `INSERT INTO vitals (
      user_id,
      type,
      value,
      unit,
      recorded_at
    ) VALUES (?, ?, ?, ?, ?)`,
    [userId, type, value, unit || null, recordedAt]
  );
};

const getVitalsByUser = async (userId) => {
  return db.all(
    `SELECT
        id,
        type,
        value,
        unit,
        recorded_at
     FROM vitals
     WHERE user_id = ?
     ORDER BY recorded_at ASC`,
    [userId]
  );
};

module.exports = {
  addVital,
  getVitalsByUser,
};
