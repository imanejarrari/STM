import Sidebar from "../side-bar/Sidebar";
import Supplier from "../Suppliers/Supplier";



import './supplier.css'

const  MainSupp = () => {
    return (
        <div className="main-page">
            <Sidebar />
             <Supplier />
             
        </div>

    );
}

export default MainSupp; 