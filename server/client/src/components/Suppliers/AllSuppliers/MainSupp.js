import Sidebar from "../../side-bar/Sidebar";
import Supplier from "../AllSuppliers/Supplier";
import AddSupplier from "../NewSupplier/AddSupplier";



import './supplier.css'

const  MainSupp = () => {
    return (
        <div className="main-page">
            <Sidebar />
           
             <main>
        {/* Render the SuppliersList component if the current route is "/suppliers" */}
        {window.location.pathname === '/suppliers' && <Supplier />}

        {/* Render the AddSupplier component if the current route is "/suppliers/add" */}
        {window.location.pathname === '/newsupplier' && <AddSupplier />}
      </main>
            
        </div>

    );
}

export default MainSupp; 