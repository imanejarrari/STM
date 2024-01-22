import './order.css';
import Sidebar from '../../side-bar/Sidebar';
import NewOrderPage from '../NewOrder/NewOrderpage';

const  MainOrder = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <NewOrderPage/>
        
        </div>
    );
}

export default MainOrder; 