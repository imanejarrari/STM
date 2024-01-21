import './order.css';
import Ordr from '../allOrders/order';
import Sidebar from '../../side-bar/Sidebar';


const  MainOrder = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <Ordr/>
        
        </div>
    );
}

export default MainOrder; 