import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../utils/api";
import "./vitals.css";

const formatVitals = (rows) => {
  const map = {};

  rows.forEach((v) => {
    const date = v.recorded_at.split("T")[0];

    if (!map[date]) map[date] = { date };

    if (v.type === "blood_sugar") {
      map[date].sugar = Number(v.value);
    }

    if (v.type === "blood_pressure") {
      map[date].bp = Number(v.value);
    }

    if (v.type === "heart_rate") {
      map[date].heartRate = Number(v.value);
    }
  });

  return Object.values(map);
};

const Vitals = () => {
  const [vitals, setVitals] = useState([]);
  const [metric, setMetric] = useState("sugar");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* -------------------------------
     Fetch vitals from backend
  -------------------------------- */
  useEffect(() => {
    loadVitals();
  }, []);

  const loadVitals = async () => {
    try {
      const res = await api.get("/vitals/getvitals");
      const formatted = formatVitals(res.data.data || []);
      setVitals(formatted);
    } catch (err) {
      console.error("Failed to load vitals", err);
    }
  };

  /* -------------------------------
     Date filter
  -------------------------------- */
  const filteredVitals = useMemo(() => {
    return vitals.filter((v) => {
      const d = new Date(v.date);
      if (fromDate && d < new Date(fromDate)) return false;
      if (toDate && d > new Date(toDate)) return false;
      return true;
    });
  }, [vitals, fromDate, toDate]);

  return (
    <div className="vitals-page">
      <div className="vitals-header">
        <div>
          <h1>Vitals Tracking</h1>
          <p>Monitor your health trends over time</p>
        </div>
      </div>

      {/* Filters */}
      <div className="vitals-filters">
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="sugar">Blood Sugar</option>
          <option value="bp">Blood Pressure</option>
          <option value="heartRate">Heart Rate</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Chart */}
      <div className="vitals-card">
        {filteredVitals.length === 0 ? (
          <p className="no-data">No data for selected range</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filteredVitals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={metric}
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table */}
      <div className="vitals-card">
        <h2>Vitals History</h2>

        <table className="vitals-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sugar</th>
              <th>BP</th>
              <th>Heart Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredVitals.map((v) => (
              <tr key={v.date}>
                <td>{v.date}</td>
                <td>{v.sugar ?? "-"}</td>
                <td>{v.bp ?? "-"}</td>
                <td>{v.heartRate ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vitals;
