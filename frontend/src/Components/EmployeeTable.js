import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteEmployee } from '../api';  

function EmployeeTable({
    employees = [], 
    pagination = { totalPages: 1, currentPage: 1 }, 
    fetchEmployees, 
    handleUpdateEmployee
}) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Salary', 'Position', 'Tax', 'Action'];
    const { totalPages, currentPage } = pagination;

    const calculateTax = (salary) => {
        if (salary <= 500000) return 0; 
        if (salary <= 1000000) return salary * 0.10; 
        return salary * 0.20;
    };

    const handleDeleteEmployee = async (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await DeleteEmployee(employeeId);
                if (response.success) {
                    alert('Employee deleted successfully');
                    fetchEmployees(); 
                } else {
                    alert(`Error: ${response.error}`);
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee');
            }
        }
    };

    const TableRow = ({ employee }) => {
        return (
            <tr>
                <td>
                    <Link to={`/employee/${employee._id}`} className='text-decoration-none'>{employee.name}</Link>
                </td> 
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>₹{employee.salary.toLocaleString()}</td>
                <td>{employee.position}</td>
                <td>₹{calculateTax(employee.salary).toLocaleString()}</td>
                <td>
                    <i 
                        className='bi bi-pencil-fill text-warning me-3' 
                        role='button' 
                        data-bs-toggle='tooltip' 
                        data-bs-placement='top' 
                        onClick={() => handleUpdateEmployee(employee)} 
                        title='Edit'>
                    </i>

                    <i 
                        className='bi bi-trash-fill text-danger' 
                        role='button' 
                        data-bs-toggle='tooltip' 
                        data-bs-placement='top' 
                        onClick={() => handleDeleteEmployee(employee._id)} 
                        title='Delete'>
                    </i>
                </td>
            </tr>
        );
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePagination = (currPage) => {
        fetchEmployees('', currPage, 5);
    };

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <TableRow key={emp._id} employee={emp} />
                    ))}
                </tbody>
            </table>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <span className='badge bg-primary'>Page {pagination.currentPage} of {pagination.totalPages}</span>
                <div>
                    <button 
                        className='btn btn-outline-primary me-2' 
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    {pageNumbers.map((page) => (
                        <button 
                            key={page} 
                            onClick={() => handlePagination(page)} 
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}>
                            {page}
                        </button>
                    ))}
                    <button  
                        onClick={() => handlePagination(currentPage + 1)} 
                        className='btn btn-outline-primary ms-2'
                        disabled={totalPages === currentPage}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default EmployeeTable;
