import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

        // Generate random colors for each category
        const backgroundColor = labels.map(() => getRandomColor());

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
              plugins: {
                title: {
                  display: true,
                  text: 'Stock Level',
                  fontSize: 8,
                },
                datalabels: {
                  formatter: (value, context) => {
                    const { dataIndex } = context.data;
                    return `${value}\n${labels[dataIndex]}`; // Display quantity and category
                  },
                  color: 'blue', // Label text color
                  anchor: 'end', // Position of the label relative to the data point
                  align: 'end', // Alignment of the label text
                  offset: 8, // Offset from the data point
                },
              },
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
