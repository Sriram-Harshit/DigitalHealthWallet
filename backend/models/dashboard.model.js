const db = require("../config/db");

const getReportsCount = (userId) => {
  return db.get("SELECT COUNT(*) AS count FROM reports WHERE user_id = ?", [
    userId,
  ]);
};

const getVitalsCount = (userId) => {
  return db.get("SELECT COUNT(*) AS count FROM vitals WHERE user_id = ?", [
    userId,
  ]);
};

const getRecentReports = (userId) => {
  return db.all(
    `
    SELECT report_type, report_date
    FROM reports
    WHERE user_id = ?
    ORDER BY uploaded_at DESC
    LIMIT 5
    `,
    [userId]
  );
};

const getRecentActivity = (userId) => {
  return db.all(
    `
    SELECT 'Vitals updated' AS activity, recorded_at AS date
    FROM vitals
    WHERE user_id = ?
    ORDER BY recorded_at DESC
    LIMIT 5
    `,
    [userId]
  );
};

module.exports = {
  getReportsCount,
  getVitalsCount,
  getRecentReports,
  getRecentActivity,
};
