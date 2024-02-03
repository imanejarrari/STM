// BarChart.js
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const [salesPerCategory, setSalesPerCategory] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales per category data
        const salesPerCategoryResponse = await fetch('http://localhost:5000/api/dashboard/salesPerCategory');
        
        if (!salesPerCategoryResponse.ok) {
          throw new Error(`HTTP error! Status: ${salesPerCategoryResponse.status}`);
        }
  
        const salesPerCategoryData = await salesPerCategoryResponse.json();
        setSalesPerCategory(salesPerCategoryData);
      } catch (error) {
        console.error('Error fetching sales per category data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing Chart instance
      chartRef.current.destroy();
    }

    // Extract labels (category names) and values (total sales) from data
    const labels = salesPerCategory.map((category) => category.category);
    const values = salesPerCategory.map((category) => category.totalSales);

    // Create a bar chart
    const ctx = document.getElementById('barChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Sales per Category',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [salesPerCategory]);

  return <canvas id="barChart" />;
};

export default BarChart;
