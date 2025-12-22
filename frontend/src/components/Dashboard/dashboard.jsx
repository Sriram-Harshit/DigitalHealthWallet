import { useEffect, useState } from "react";
import "./dashboard.css";
import Button from "../../reusableUi/buttons/button";
import api from "../../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    vitalsCount: 0,
    status: "Good",
    recentReports: [],
    recentActivity: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard/details");
      setStats(res.data.data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your health reports and activity</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <span>{stats.totalReports}</span>
        </div>

        <div className="stat-card">
          <h3>Vitals Logged</h3>
          <span>{stats.vitalsCount}</span>
        </div>

        <div className="stat-card">
          <h3>Status</h3>
          <span className="status-good">{stats.status}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Recent Reports</h2>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>

          <table className="reports-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentReports.length === 0 ? (
                <tr>
                  <td colSpan="3">No reports</td>
                </tr>
              ) : (
                stats.recentReports.map((r, i) => (
                  <tr key={i}>
                    <td>{r.report_type}</td>
                    <td>{r.report_date || "-"}</td>
                    <td>
                      <span className="badge success">Uploaded</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Recent Activity</h2>
          </div>

          <ul className="activity-list">
            {stats.recentActivity.length === 0 ? (
              <li>No activity yet</li>
            ) : (
              stats.recentActivity.map((a, i) => (
                <li key={i}>
                  ❤️ {a.activity} ({new Date(a.date).toLocaleDateString()})
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
