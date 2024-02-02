import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const createBackgroundGradient = (ctx) => {
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
  gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
  return gradient;
};

const StockChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Stock Levels',
      data: [],
      backgroundColor:null ,
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/stockGraphData');
        const result = await response.json();
  
        const labels = result.map(product => product.name);
        const data = result.map(product => product.quantityInStock);
  
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
  
          // Destroy existing Chart instance
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
  
          // Create a new Chart instance
          const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: 'Stock Levels',
                data,
                backgroundColor: createBackgroundGradient(ctx),
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
