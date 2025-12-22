const db = require("../config/db");

const createReport = async ({
  userId,
  fileName,
  filePath,
  reportType,
  reportDate,
}) => {
  return db.run(
    `INSERT INTO reports (
      user_id,
      file_name,
      file_path,
      report_type,
      report_date
    ) VALUES (?, ?, ?, ?, ?)`,
    [userId, fileName, filePath, reportType, reportDate]
  );
};

const getReportsByUser = async (userId) => {
  return db.all(
    `SELECT id, file_name, report_type, report_date, uploaded_at
     FROM reports
     WHERE user_id = ?
     ORDER BY uploaded_at DESC`,
    [userId]
  );
};

const getReportById = async (reportId) => {
  return db.get(`SELECT * FROM reports WHERE id = ?`, [reportId]);
};

module.exports = {
  createReport,
  getReportsByUser,
  getReportById,
};
