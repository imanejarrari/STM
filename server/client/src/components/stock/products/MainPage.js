import Sidebar from "../../side-bar/Sidebar";
import ProductList from "./ProductList";
import "./MainPage.css";

const  MainPage = () => {       
    return (
        <div className="main-page">
            <Sidebar />
            <ProductList />
        </div>
    );
}

export default MainPage; 