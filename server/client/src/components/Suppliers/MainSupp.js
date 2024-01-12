import Sidebar from "../side-bar/Sidebar";
import Supplier from "../Suppliers/Supplier";
import './order.css'

const  MainSupp = () => {
    return (
        <div className="main-page">
            <Sidebar />
            <Supplier/>
        
        </div>
    );
}

export default MainSupp; 