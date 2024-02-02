import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const determineBackgroundColor = (quantity) => {
  if (quantity > 20) {
    return '#86B6F6'; // Blue
  } else if (quantity > 10) {
    return '#B4D4FF'; // Yellow (bg-warning)
  } else {
    return '#EEF5FF'; // Red (bg-danger)
  }
};

const StockChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Stock Levels',
      data: [],
      backgroundColor: [],
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/stockGraphData');
        const result = await response.json();

        const labels = result.map(product => product.category);
        const data = result.map(product => product.quantityInStock);
        const backgroundColor = data.map(determineBackgroundColor);

        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');

          // Destroy existing Chart instance
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }

          // Create a new Chart instance with 'doughnut' type
          const newChart = new Chart(ctx, {
            type: 'doughnut', // Set chart type to 'doughnut'
            data: {
              labels,
              datasets: [{
                label: 'Stock Levels',
                data,
                backgroundColor,
              }],
            },
            options: {
              maintainAspectRatio: false,
            },
          });

          // Store the new Chart instance in the ref
          chartRef.current.chart = newChart;
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return <canvas ref={chartRef} />;
};

export default StockChart;
