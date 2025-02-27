import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ArcElement);

function FinancialPlanning() {
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [expectedReturns, setExpectedReturns] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const calculateFutureSavings = () => {
    const p = parseFloat(currentSavings) || 0;
    const m = parseFloat(monthlySavings) || 0;
    const r = parseFloat(expectedReturns) / 100 / 12 || 0;
    const n = parseInt(years) * 12 || 0;

    if (n <= 0) {
      alert('Please enter valid values.');
      return;
    }

    const futureValue = p * Math.pow(1 + r, n) + (m * ((Math.pow(1 + r, n) - 1) / r)) * (1 + r);
    setFutureValue(futureValue.toFixed(2));

    const yearlyData = Array.from({ length: parseInt(years) }, (_, i) => {
      return p * Math.pow(1 + r, (i + 1) * 12) + (m * ((Math.pow(1 + r, (i + 1) * 12) - 1) / r)) * (1 + r);
    }).map(value => parseFloat(value.toFixed(2))).slice(0, years);

    setHistoricalData(yearlyData);
  };

  const investmentData = futureValue ? {
    stocks: futureValue * 0.5,
    bonds: futureValue * 0.25,
    realEstate: futureValue * 0.15,
    cash: futureValue * 0.1,
  } : null;

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <AccountBalanceIcon fontSize="large" sx={{ marginRight: 1 }} />
        <Typography variant="h4" gutterBottom>
          Financial Empowerment for Women
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        Plan your financial future based on your current savings and monthly investments.
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Current Savings (₹)"
            variant="outlined"
            fullWidth
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Monthly Savings (₹)"
            variant="outlined"
            fullWidth
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Expected Returns (%)"
            variant="outlined"
            fullWidth
            value={expectedReturns}
            onChange={(e) => setExpectedReturns(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Years"
            variant="outlined"
            fullWidth
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={calculateFutureSavings} sx={{ marginTop: '20px' }}>
        Calculate
      </Button>

      {futureValue && (
        <Card sx={{ marginTop: '30px', maxWidth: '400px', margin: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Estimated Future Value:
            </Typography>
            <Typography variant="h4" color="primary">
              ₹{futureValue}
            </Typography>
          </CardContent>
        </Card>
      )}

      {historicalData.length > 0 && (
        <Box sx={{ marginTop: '30px', maxWidth: '600px', margin: 'auto', height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Savings Growth Over Time
          </Typography>
          <Line
            data={{
              labels: historicalData.map((_, i) => `Year ${i + 1}`),
              datasets: [
                {
                  label: 'Savings Value Over Time',
                  data: historicalData,
                  borderColor: 'green',
                  backgroundColor: 'rgba(0, 128, 0, 0.2)',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  suggestedMax: Math.max(...historicalData) * 1.2,
                },
              },
            }}
          />
        </Box>
      )}

      {investmentData && (
        <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Investment Portfolio Tracker
          </Typography>
          <Typography variant="body1" paragraph>
            Track your investments, monitor growth, and manage asset allocation effectively.
          </Typography>
          <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Pie
              data={{
                labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
                datasets: [
                  {
                    data: Object.values(investmentData),
                    backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
                  },
                ],
              }}
            />
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default FinancialPlanning;
