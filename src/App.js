import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Budgeting from "./pages/Budgeting";
import ExpenseTracker from "./pages/ExpenseTracker";
import SIPCalculator from "./pages/SIPCalculator";
import FinancialPlanning from "./pages/FinancialPlanning";
import Login from "./pages/Login";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <Layout>
              <Routes>
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/budgeting" element={<ProtectedRoute element={<Budgeting />} />} />
                <Route path="/expensetracker" element={<ProtectedRoute element={<ExpenseTracker />} />} />
                <Route path="/sipcalculator" element={<ProtectedRoute element={<SIPCalculator />} />} />
                <Route path="/financialplanning" element={<ProtectedRoute element={<FinancialPlanning />} />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
