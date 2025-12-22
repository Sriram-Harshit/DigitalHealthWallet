const path = require("path");
const mime = require("mime-types");
const Report = require("../models/report.model");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/response");

exports.uploadReport = asyncHandler(async (req, res) => {
  if (!req.file) {
    return error(res, "Report file is required", 400);
  }

  const { report_type, report_date } = req.body;

  const normalizedPath = req.file.path.replace(/\\/g, "/");

  await Report.createReport({
    userId: req.user.id,
    fileName: req.file.originalname,
    filePath: normalizedPath,
    reportType: report_type || null,
    reportDate: report_date || null,
  });

  success(res, {}, "Report uploaded successfully", 201);
});

exports.getReports = asyncHandler(async (req, res) => {
  const reports = await Report.getReportsByUser(req.user.id);

  success(res, reports, "Reports fetched");
});

exports.viewReport = asyncHandler(async (req, res) => {
  const reportId = req.params.id;
  const userId = req.user.id;

  const report = await Report.getReportById(reportId);

  if (!report) return error(res, "Report not found", 404);
  if (report.user_id !== userId) return error(res, "Access denied", 403);
  if (!report.file_path) return error(res, "File not available", 404);

  const filePath = path.resolve(report.file_path.replace(/\\/g, "/"));

  const contentType = mime.lookup(filePath);

  if (contentType) {
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "inline");
  }

  res.sendFile(filePath);
});
