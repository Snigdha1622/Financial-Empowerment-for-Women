import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

const motivationalQuotes = [
  "A budget is telling your money where to go instead of wondering where it went.",
  "Do not save what is left after spending, but spend what is left after saving.",
  "Financial freedom is available to those who learn about it and work for it.",
];

const Home = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(60); // Example progress for savings

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
        Empowering Women Financially
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Track your expenses, budget wisely, and plan for a secure financial future.
      </Typography>
      
      {/* Motivational Quote */}
      <Typography variant="body1" sx={{ fontStyle: "italic", marginBottom: "20px" }}>
        "{motivationalQuotes[quoteIndex]}"
      </Typography>
      
      {/* Savings Progress */}
      <Box sx={{ width: "50%", margin: "auto", marginBottom: "20px" }}>
        <Typography variant="body2">Your Savings Goal Progress</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
        <Typography variant="caption">{progress}% achieved</Typography>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={3} justifyContent="center">
        {[{
          title: "Budgeting Tool",
          description: "Plan your monthly budget and manage expenses efficiently.",
          link: "/budgeting"
        }, {
          title: "Expense Tracker",
          description: "Keep track of all your spending in one place. Get insights and analytics to improve your financial habits!",
          link: "/expensetracker"
        }, {
          title: "SIP Calculator",
          description: "Calculate your SIP investments and future returns.",
          link: "/sipcalculator"
        }, {
          title: "Financial Planning",
          description: "Plan for a secure financial future with personalized insights.",
          link: "/financialplanning"
        }].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ transition: "0.3s", '&:hover': { transform: "scale(1.05)" }, height: "220px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "15px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>{feature.title}</Typography>
                <Typography variant="body2" sx={{ marginBottom: "15px" }}>{feature.description}</Typography>
              </CardContent>
              <Box sx={{ textAlign: "center", paddingBottom: "10px" }}>
                <Button component={Link} to={feature.link} variant="contained">Explore</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ marginTop: "30px" }}>
        <Button component={Link} to="/expensetracker" variant="contained" color="primary" size="large">
          Get Started Today!
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
