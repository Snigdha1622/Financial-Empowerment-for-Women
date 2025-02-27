import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ marginLeft: "16px" }}>Financial Empowerment for Women</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            Home
          </Link>
          <Link to="/budgeting" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            Budgeting
          </Link>
          <Link to="/expensetracker" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            Expense Tracker
          </Link>
          <Link to="/sipcalculator" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            SIP Calculator
          </Link>
          <Link to="/financialplanning" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            Financial Planning
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content with full width */}
      <Container
        maxWidth="xl"
        sx={{
          flex: 1, // Pushes footer to the bottom
          padding: "20px",
          width: "100%",
          marginX: "auto", // Ensures content expands fully
        }}
      >
        {children}
      </Container>

      {/* Footer (Fixed at Bottom) */}
      <Box
        component="footer"
        sx={{
          padding: "10px",
          backgroundColor: "#282c34",
          color: "white",
          textAlign: "center",
          width: "100%",
          marginTop: "auto", // Ensures footer stays at the bottom
        }}
      >
        <Typography variant="body2">&copy; 2025 Financial Empowerment for Women. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
