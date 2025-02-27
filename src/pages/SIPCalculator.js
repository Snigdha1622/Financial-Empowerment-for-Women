import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [duration, setDuration] = useState('');
  const [targetCorpus, setTargetCorpus] = useState('');
  const [estimatedCorpus, setEstimatedCorpus] = useState(null);
  const [extraInvestmentNeeded, setExtraInvestmentNeeded] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const calculateSIP = () => {
    const p = parseFloat(monthlyInvestment);
    const r = parseFloat(rateOfReturn) / 100 / 12;
    const n = parseInt(duration) * 12;

    if (!p || !r || !n || isNaN(p) || isNaN(r) || isNaN(n)) {
      alert('Please enter valid values.');
      return;
    }

    const corpus = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setEstimatedCorpus(corpus.toFixed(2));

    const yearlyData = Array.from({ length: parseInt(duration) }, (_, i) => {
      return p * ((Math.pow(1 + r, (i + 1) * 12) - 1) / r) * (1 + r);
    }).map(value => parseFloat(value.toFixed(2))); 
    setHistoricalData(yearlyData);

    if (targetCorpus) {
      const target = parseFloat(targetCorpus);
      if (!isNaN(target) && target > corpus) {
        const extraNeeded = (target - corpus) / ((Math.pow(1 + r, n) - 1) / r * (1 + r));
        setExtraInvestmentNeeded(extraNeeded.toFixed(2));
      } else {
        setExtraInvestmentNeeded(null);
      }
    }
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        SIP Calculator
      </Typography>
      <Typography variant="body1" paragraph>
        Calculate the estimated returns from your SIP investment and visualize its growth over time.
      </Typography>
      
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Monthly Investment (₹)"
            variant="outlined"
            fullWidth
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Rate of Return (%)"
            variant="outlined"
            fullWidth
            value={rateOfReturn}
            onChange={(e) => setRateOfReturn(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Investment Duration (Years)"
            variant="outlined"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Target Corpus (₹)"
            variant="outlined"
            fullWidth
            value={targetCorpus}
            onChange={(e) => setTargetCorpus(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={calculateSIP} sx={{ marginTop: '20px' }}>
        Calculate
      </Button>

      {estimatedCorpus && (
        <Card sx={{ marginTop: '30px', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Estimated Corpus:
            </Typography>
            <Typography variant="h4" color="primary">
              ₹{estimatedCorpus}
            </Typography>
          </CardContent>
        </Card>
      )}

      {extraInvestmentNeeded && (
        <Card sx={{ marginTop: '20px', maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#ffeb3b' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Extra Monthly Investment Needed:
            </Typography>
            <Typography variant="h4" color="secondary">
              ₹{extraInvestmentNeeded}
            </Typography>
          </CardContent>
        </Card>
      )}

      {historicalData.length > 0 && (
        <Box sx={{ marginTop: '30px', maxWidth: '600px', margin: 'auto', height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Investment Growth Over Time
          </Typography>
          <Line
            data={{
              labels: historicalData.map((_, i) => `Year ${i + 1}`),
              datasets: [
                {
                  label: 'SIP Value Over Time',
                  data: historicalData,
                  borderColor: 'blue',
                  backgroundColor: 'rgba(0, 0, 255, 0.2)',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  suggestedMax: historicalData.length > 0 ? Math.max(...historicalData) * 1.2 : undefined,
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default SIPCalculator;
