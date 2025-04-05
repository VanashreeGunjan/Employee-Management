 import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { GetAllEmployees } from '../api'
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
 
 function EmployeeManagementApp() {
  const [showModal,setShowModal] = useState(false)
  const [employeeData, setEmployeeData] = useState({
    "employees":[],
    "pagination":{
   "totalPages": 1,
    "currentPage": 1
    }
  })
  const fetchEmployees = async (search = '', page = 1, limit = 5) => {
    try {
      console.log("Fetching employees...");
      
      const response = await GetAllEmployees(search, page, limit);
      
      console.log("Raw API Response:", response);
  
      if (!response || !response.employees) {
        throw new Error("Invalid API response structure");
      }
  
      setEmployeeData(response);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployeeData({ employees: [], pagination: { totalPages: 1, currentPage: 1 } });
    }
  };
  
  
 
  useEffect(()=>{
    fetchEmployees();
  },[])
  const handleAddEmployee = () =>
  {
    setShowModal(true)
  }
 
   return (
     <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
        <h1>Employee Management App</h1>
        <div className='w-100 d-flex justify-content-center'>
        <div className='w-80 border bg-ligth p3' style={{width: '80%'}}>
          <div className='d-flex justify-content-between mb-3'>
            <button className='btn btn-primary' onClick={()=> handleAddEmployee()}>Add</button>
            <input type='text' placeholder='Search Employees...' className='form-control w-50'></input>
          </div>
          <EmployeeTable  fetchEmployees = {fetchEmployees} employees = {employeeData.employees} pagination ={employeeData.pagination}/>
          <AddEmployee
          fetchEmployees = {fetchEmployees}
          showModal={showModal}
          setShowModal={setShowModal}
          />
        </div>
        </div>
        <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false}/>
     </div>
   )
 }
 
 export default EmployeeManagementApp



 