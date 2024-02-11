import './AddOrder.css';
import Sidebar from '../../side-bar/Sidebar';
import NewOrderPage from './NewOrderpage';

const  NewOrder = () => {
    return (
        <div className="form">
            <Sidebar />
            <NewOrderPage/>  
        </div>
    );
}

export default NewOrder; 