import './order.css';
import Sidebar from '../../side-bar/Sidebar';
import OrdersList from './order';

const  MainOrder = () => {
    return (
        <div className="main-page">
            <Sidebar />
            
            <OrdersList/>
            
        
        </div>
    );
}

export default MainOrder; 