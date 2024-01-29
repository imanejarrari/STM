import Sidebar from '../side-bar/Sidebar';
import { DashboardProvider } from './context';
import Dashboard from './dashboard';

const  MainDash = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <DashboardProvider>
      <div>
        <h1>My Dashboard App</h1>
        <Dashboard />
      </div>
    </DashboardProvider>
           
            
        
        </div>
    );
}

export default MainDash; 