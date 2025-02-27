import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Card, CardContent, AppBar, Toolbar, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const motivationalQuotes = [
  "A budget is telling your money where to go instead of wondering where it went.",
  "Do not save what is left after spending, but spend what is left after saving.",
  "Financial freedom is available to those who learn about it and work for it."
];

const Login = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("Password must be 8+ characters with at least one uppercase letter, one number, and one special character.");
      return;
    }
    localStorage.setItem("isAuthenticated", "true"); // Store login status
    navigate("/home");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#e3f2fd" }}> {/* Lightest blue background */}
      
      {/* Header at the Top */}
      <AppBar position="sticky" sx={{ backgroundColor: "#1565c0" }}> {/* Deep blue header */}
        <Toolbar sx={{ justifyContent: "center" }}>
          <img src="/logo.png" alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            Financial Empowerment for Women
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Login Form */}
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 64px)" }}>
        <Card sx={{
          padding: "30px",
          maxWidth: "400px",
          boxShadow: 3,
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "white"
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", color: "#666", marginBottom: "20px" }}>
            "{motivationalQuotes[quoteIndex]}"
          </Typography>

          {errorMessage && <Typography color="error" sx={{ marginBottom: "10px" }}>{errorMessage}</Typography>}

          <TextField 
            label="Email ID" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: "20px",
              backgroundColor: "#007bff", // Blue button color
              "&:hover": { backgroundColor: "#0056b3" },
              transition: "0.3s",
            }}
          >
            Login
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
