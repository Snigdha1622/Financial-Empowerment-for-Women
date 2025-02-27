import React, { useState } from "react";
import Layout from "../components/Layout";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const defaultAllocation = {
  Necessities: 50,
  Healthcare: 10,
  "Debt Payments": 10,
  Savings: 20,
  "Discretionary Spending": 10,
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const categoryDetails = {
  Necessities: ["Housing (rent/mortgage)", "Utilities (electricity, water, gas)", "Groceries", "Transportation (car payments, gas, public transit)", "Insurance (health, life, home)"],
  Healthcare: ["Medical bills", "Prescriptions"],
  "Debt Payments": ["Credit card payments", "Personal loan payments"],
  Savings: ["Emergency fund", "Retirement savings"],
  "Discretionary Spending": ["Entertainment (movies, dining out)", "Hobbies", "Clothing", "Gifts", "Personal care"],
};

function Budgeting() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [customAllocation, setCustomAllocation] = useState(defaultAllocation);
  const [showCharts, setShowCharts] = useState(false);

  const handleCustomChange = (category, value) => {
    setCustomAllocation({ ...customAllocation, [category]: value });
  };

  const calculateBudget = () => {
    if (!income || !savings || parseFloat(savings) >= parseFloat(income)) {
      alert("Please enter valid income and savings values.");
      return;
    }
    setShowCharts(true);
  };

  const generateChartData = (allocation) => {
    return Object.entries(allocation).map(([key, value], index) => ({
      name: key,
      value: ((parseFloat(income) - parseFloat(savings)) * value) / 100,
      percentage: value,
      color: COLORS[index % COLORS.length],
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        {/* Sidebar with category dropdowns */}
        <Box sx={{ width: "20%", padding: "10px" }}>
          <Typography variant="h6" gutterBottom>
            Expense Categories
          </Typography>
          {Object.keys(categoryDetails).map((category) => (
            <Accordion key={category}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {categoryDetails[category].map((item, index) => (
                    <li key={index}>
                      <Typography variant="body2">{item}</Typography>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Budgeting Tool
          </Typography>
          <Typography variant="body1" paragraph>
            Enter your income and desired savings to get spending suggestions.
          </Typography>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Monthly Income (₹)"
                variant="outlined"
                fullWidth
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Desired Savings (₹)"
                variant="outlined"
                fullWidth
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={calculateBudget}
            sx={{ marginTop: "20px" }}
          >
            Generate Budget
          </Button>

          {showCharts && (
            <Grid container spacing={3} sx={{ marginTop: "30px" }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ padding: "20px" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Suggested Allocation
                    </Typography>
                    <PieChart width={450} height={350}>
                      <Pie
                        data={generateChartData(defaultAllocation)}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                      >
                        {generateChartData(defaultAllocation).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ padding: "20px" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Your Custom Allocation
                    </Typography>
                    {Object.keys(customAllocation).map((category) => (
                      <TextField
                        key={category}
                        label={`${category} (%)`}
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={customAllocation[category]}
                        onChange={(e) => handleCustomChange(category, parseFloat(e.target.value) || 0)}
                        sx={{ marginBottom: "10px" }}
                      />
                    ))}
                  </CardContent>
                </Card>
                <PieChart width={450} height={350}>
                  <Pie
                    data={generateChartData(customAllocation)}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {generateChartData(customAllocation).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Budgeting;
