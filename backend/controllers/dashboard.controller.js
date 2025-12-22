const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/response");
const Dashboard = require("../models/dashboard.model");

exports.getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const reportsCount = await Dashboard.getReportsCount(userId);
  const vitalsCount = await Dashboard.getVitalsCount(userId);
  const recentReports = await Dashboard.getRecentReports(userId);
  const recentActivity = await Dashboard.getRecentActivity(userId);

  success(res, {
    totalReports: reportsCount.count,
    vitalsCount: vitalsCount.count,
    status: vitalsCount.count > 0 ? "Good" : "No Data",
    recentReports,
    recentActivity,
  });
});
