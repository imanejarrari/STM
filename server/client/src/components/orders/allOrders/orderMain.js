import './order.css';
import Sidebar from '../../side-bar/Sidebar';
import CustomerOrdersList from './order';

const  MainOrder = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <CustomerOrdersList/>
           
            
        
        </div>
    );
}

export default MainOrder; 