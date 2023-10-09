import React, { useState, useEffect } from "react";
import { GetAxiosData } from "../api/ApiMethods";
import TanTable from "../components/TanTable";
const TanstackTable = () =>{
    const[ details, setDetails] = useState();
    const [searchName, setSearchName] = useState('');
    const [searchDepartment, setSearchDepartment ]= useState('');
  // api fetch 
  const fetchData = async (sortParam) => {
    try {
      const response = await GetAxiosData('/employees', {
        sortBy: sortParam.columnId,
        order: "asc",
        filter: searchName, // passing the filtered data as params
        page:1,
        limit:5,
     
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData({ columnId: 'id', isSortedDesc: true });
  }, [searchName, searchDepartment]); // Added search parameters as dependencies

  const handleSort = (column) => {
    fetchData({ columnId: column.id, isSortedDesc: column.isSortedDesc });
  };// passing parameters to the api params

    return(
        <>
  <div className='container my-3'>
        <h3 className=' text-center text-warning'>Search by field</h3>
        <div className='row'>
          <div className='col-lg-12'>
            <input
              type="text"
              className="form-control"
              placeholder="Global search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          {/* <div className='col-lg-6'>
            <input
              type="text"
              className="form-control"
              placeholder="Department"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
            />
          </div> */}
        </div>
      </div>

        <div className=" container">
            {console.log(details)}
            <h1 className=" text-center">Tanstack basic table</h1>
            <div className=" d-flex justify-content-center">
            <TanTable details = {details} handleSort={handleSort} />

            </div>
        </div>
        </>
    )
}
export default TanstackTable;