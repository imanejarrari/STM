import React, { createContext, useContext, useReducer } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const initialState = {
    earnings: 0,
    sales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    stockGraphData: [],
    latestOrders: [],
    latestCustomers: [],
  };

  const reducer = (state, action) => {
    switch (action.typxe) {
      case 'UPDATE_DASHBOARD':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};