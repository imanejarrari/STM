import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ExportToExcel = () => {
  const [exportedData, setExportedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromDatabase = async () => {
    try {
      setLoading(true); 
      const response = await axios.get('http://localhost:5000/api/products/productlist');
      const sanitizedData = response.data.map(({ _id, __v, ...rest }) => rest);
      setExportedData(sanitizedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); 
    }
  };

  const exportToExcel = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const fileName = `products_${dateString}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="ayman">
      <div className='elfadl border-top' style={{height:"325px"}}>
        <div className='hamid'>
          <FontAwesomeIcon icon={faDownload}  style={{ fontSize:"95px" }} onClick={fetchProductsFromDatabase}/>
          {loading ? (
            <p style={{ fontSize:"11px" }}>
              Loading... <FontAwesomeIcon icon={faSpinner} spin style={{ marginLeft: "8px" }} />
            </p>
          ) : (
            <p style={{ fontSize:"11px" }}>
              NOTE: Click the download icon to fetch data and export it to an Excel file.
              {exportedData.length > 0 ? (
                <span> After fetching data, the <b>"Export to Excel"</b> button will be available for download.</span>
                ) : (
                <span> Once data is fetched, click the <b>"Export to Excel"</b> button to download the file.</span>
              )}
            </p>
          )}
          {exportedData.length > 0 && (
            <button className="btn btn-primary p-2 w-100" onClick={exportToExcel}>
              <i className="fa fa-download" style={{ marginRight:"16px" }}></i> Export to Excel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportToExcel;
