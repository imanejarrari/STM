import Sidebar from '../side-bar/Sidebar';
import { DashboardProvider } from './context';
import Dashboard from './dashboard';
import StockChart from './stockChart';
const  MainDash = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <DashboardProvider>
      <div>
        <Dashboard />
       
      </div>
    </DashboardProvider>
           
            
        
        </div>
    );
}

export default MainDash; 