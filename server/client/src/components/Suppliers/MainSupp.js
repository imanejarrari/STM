import Sidebar from "../side-bar/Sidebar";
import Supplier from "../Suppliers/Supplier";
import AddSupplier from "./NewSupplier/AddSupplier";



import './supplier.css'

const  MainSupp = () => {
    return (
        <div className="main-page">
            <Sidebar />
             <Supplier />
             <AddSupplier/>
            
        </div>

    );
}

export default MainSupp; 