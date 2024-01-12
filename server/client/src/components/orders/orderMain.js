import Sidebar from "../side-bar/Sidebar";
import Ordr from "../orders/order";
import './order.css'

const  MainOrder = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <Ordr/>
        
        </div>
    );
}

export default MainOrder; 