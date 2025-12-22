import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../reusableUi/buttons/button";
import api from "../../utils/api";

import "./reports.css";
import "./reportsUpload.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [reportType, setReportType] = useState("");
  const [reportDate, setReportDate] = useState("");

  const token = localStorage.getItem("TOKEN");

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/getreports");

      setReports(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("report_type", reportType);
    formData.append("report_date", reportDate);

    try {
      await api.post("/reports/upload", formData);

      setShowUpload(false);
      setFile(null);
      setReportType("");
      setReportDate("");
      fetchReports();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="reports-page">
      <Button className="upload-btn" onClick={() => setShowUpload(true)}>
        + Upload Report
      </Button>

      <div className="grid-auto">
        {reports.length === 0 && <p>No reports found</p>}

        {reports.map((r) => (
          <div className="report-card" key={r.id}>
            <div className="report-content">
              <h4>{r.report_type || "Medical Report"}</h4>
              <p className="report-date">
                {r.report_date
                  ? new Date(r.report_date).toLocaleDateString()
                  : "No date"}
              </p>
            </div>

            <div className="report-actions">
              <a
                href={`http://localhost:5000/reports/${
                  r.id
                }/view?token=${localStorage.getItem("TOKEN")}`}
                target="_blank"
                rel="noreferrer"
                className="report-link"
              >
                View Report →
              </a>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="upload-overlay">
          <div className="upload-modal">
            <h3>Upload Report</h3>

            <form onSubmit={handleUpload}>
              <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />

              <input
                type="text"
                placeholder="Report Type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              />

              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />

              <div className="upload-actions">
                <Button type="submit">Upload</Button>
                <Button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowUpload(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
