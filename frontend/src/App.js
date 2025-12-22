import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/header/header";
import Home from "./home/home";
import Login from "./components/registerLogin/login";
import Register from "./components/registerLogin/register";
import Reports from "./components/Reports/reports";
import Dashboard from "./components/Dashboard/dashboard";
import Vitals from "./components/vitals/vitals";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vitals"
            element={
              <ProtectedRoute>
                <Vitals />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
