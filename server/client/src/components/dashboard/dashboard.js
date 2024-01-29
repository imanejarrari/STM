import React, { useEffect } from 'react';
import { useDashboard } from './context';
import StockChart from './stockChart';

const Dashboard = () => {
  const { state, dispatch } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dashboard/dashboardData');
        const data = await response.json();

        dispatch({ type: 'UPDATE_DASHBOARD', payload: data });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2>Earnings: {state.earnings}</h2>
      <h2>Sales: {state.sales}</h2>
      {/* Display other data as needed */}
      <StockChart stockData={state.stockGraphData} />
    </div>
  );
};

export default Dashboard;
