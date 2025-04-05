import React, { useEffect, useState } from 'react'
import { CreateEmployee } from '../api'
import { notify } from '../utils'

function AddEmployee({showModal , setShowModal,fetchEmployees,updateEmpObj}) {
    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        phone:'',
        department:'',
        salary:'',
        position:''
    })
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>
    {
        if(updateEmpObj)
        {
            setUpdateMode(true);

        }
    },[updateEmpObj])
    const resetEmployeeStates = ()=>
    {
        setEmployee({
            name:'',
            email:'',
            phone:'',
            department:'',
            salary:'',
            position:''
        })
    }
    const handleClose = ()=>
    {
        setShowModal(false)
    }
    const handleChange =  (e)=>
    {   
        const {name,value} = e.target;
        setEmployee({...employee,[name]: value})
    }
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        console.log(employee)
        try{
            const {success,message} = await CreateEmployee(employee);
            if(success)
            {
                notify(message,'Success')
            }
            else{
                notify(message,'Fail')
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees()
        }
        catch(err)
        {
            notify('Fail to create employee, try Again','Error')
        }
    }
  return (
    <div className={`modal ${showModal ? 'd-block' : ''}`}
    tabIndex={-1} role='dialog' style={{
        display:showModal ? 'block' : 'none'
    }}
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h5>{updateMode ? 'update Employee':'Add Employee'}</h5>
                <button type='button' className='btn-close' onClick={()=>handleClose()}></button>
            </div>
            <div className='modal-body'>
                <form onSubmit= {handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' name="name" value={employee.name} onChange={handleChange} required></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' name="email" value={employee.email} onChange={handleChange} required></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone</label>
                        <input type='text' className='form-control' name="phone" value={employee.phone} onChange={handleChange} required></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Department</label>
                        <input type='text' className='form-control' name="department" value={employee.department} onChange={handleChange} required></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Salary</label>
                        <input type='text' className='form-control' name="salary" value={employee.salary} onChange={handleChange} required></input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>position</label>
                        <input type='text' className='form-control' name="position" value={employee.position} onChange={handleChange} required></input>
                    </div>
                    <button className='btn btn-primary' type='submit'>
                        {
                            updateMode ? 'Update' : 'Save'
                        }</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee



 