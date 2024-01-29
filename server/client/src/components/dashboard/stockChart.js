import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StockChart = ({ stockData }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const processStockData = () => {
      // Extracting labels and values from stockData
      const chartLabels = stockData.map((product) => product.name);
      const chartDataValues = stockData.map((product) => product.quantityInStock);

      // Updating chartData state
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Stock Levels',
            data: chartDataValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    // Call the function to process stockData
    processStockData();
  }, [stockData]);

  return (
    <div>
      <h2>Stock Levels Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default StockChart;
