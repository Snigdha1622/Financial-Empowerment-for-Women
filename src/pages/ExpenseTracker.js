import React, { useState } from "react";
import Layout from "../components/Layout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Box, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"; 
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const categories = ["Necessities", "Healthcare", "Debt Payments", "Savings", "Discretionary Spending"];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const addExpense = () => {
    if (!amount || !category || !description) {
      alert("Please enter a valid amount, category, and description.");
      return;
    }
    setExpenses([...expenses, { amount: parseFloat(amount), category, date, description }]);
    setAmount("");
    setCategory(null);
    setDescription("");
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const filteredExpenses = [...expenses]
    .filter(expense => {
      const inDateRange = (!dateRange[0] || new Date(expense.date) >= dateRange[0]) &&
                          (!dateRange[1] || new Date(expense.date) <= dateRange[1]);
      const inCategory = selectedCategories.length === 0 || selectedCategories.includes(expense.category);
      return inDateRange && inCategory;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const expenseData = categories.map(cat => ({
    category: cat,
    total: filteredExpenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0),
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">Expense Tracker</Typography>
        <Typography variant="body1">Record your expenses and track your balance.</Typography>

        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Amount (₹)"
              type="number"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category || ""} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker label="Date" value={date} onChange={setDate} sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={addExpense} sx={{ marginTop: "20px" }}>
          Add Expense
        </Button>

        {/* Filters */}
        <Box sx={{ marginTop: "30px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(newDate) => setDateRange([newDate, dateRange[1]])}
            sx={{ width: "200px" }}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(newDate) => setDateRange([dateRange[0], newDate])}
            sx={{ width: "200px" }}
          />
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel>Filter by Category</InputLabel>
            <Select multiple value={selectedCategories} onChange={(e) => setSelectedCategories(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Expense List */}
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="h6">Expense List</Typography>
          {filteredExpenses.map((expense, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <Typography>{expense.date.toLocaleDateString()}</Typography>
              <Typography>{expense.category}</Typography>
              <Typography>₹{expense.amount}</Typography>
              <Typography>{expense.description}</Typography>
              <Button variant="outlined" color="secondary" onClick={() => deleteExpense(index)}>
                Delete
              </Button>
            </Box>
          ))}
        </Box>

        {/* Spending Trends Chart */}
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="h6">Spending Trends</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ExpenseTracker;
