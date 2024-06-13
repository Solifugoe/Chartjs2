import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PesoDolarChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const baseUrl = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_6TwPRrrheEGv2wS8adWipBXbsOL1vJoXGqxiAGED&currencies=MXN%2CUSD'; // Replace 'YOUR_API_KEY' with your Currencylayer API key

  useEffect(() => {
    const fetchExchangeRate = async () => {
        try {
          const response = await fetch(baseUrl);
          const json = await response.json();
      
          // Check for successful API call
          if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
          }
      
          // Check for a different key containing rates (replace 'data' with the appropriate key if necessary)
          const exchangeRates = json.data?.rates;
          if (!exchangeRates) {
            throw new Error('Missing "rates" object in API response');
          }
      
          const rates = exchangeRates.MXN; // Assuming MXN rate is nested within 'data.rates'
          const labels = ['Paridad Peso/Dólar'];
          const datasets = [{
            label: 'Tipo de cambio',
            data: [rates],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }];
      
          setData({ labels, datasets });
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
          // Handle error gracefully (e.g., display an error message)
        }
      };

    fetchExchangeRate();
  }, [baseUrl]);

  return (
    <div className="chart-container">
      <Line data={data} height={400} options={{
        title: {
          display: true,
          text: 'Paridad Peso/Dólar'
        },
        scales: {
          y: {
            display: true,
            label: 'Tipo de cambio'
          }
        }
      }} />
    </div>
  );
};

export default PesoDolarChart;
