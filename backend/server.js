const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");

require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:3000 http://localhost:5000"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", require("./routes/users.routes"));
app.use("/reports", require("./routes/report.routes"));
app.use("/vitals", require("./routes/vital.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
