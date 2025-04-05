import { BASE_URL } from './config';

 
export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}?search=${search}&page=${page}&limit=${limit}`;
    
    try {
        console.log("Fetching employees from:", url);

        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error fetching employees:", err);
        return { employees: [], pagination: { totalPages: 1, currentPage: 1 }, error: err.message };
    }
};

 
export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/createEmployee`;

    try {
        const formData = new FormData();
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }

        const result = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error creating employee:", err);
        return { success: false, error: err.message };
    }
};

 
export const UpdateEmployee = async (employeeId, updatedData) => {
    const url = `${BASE_URL}/updateEmployee/${employeeId}`;

    try {
        const formData = new FormData();
        for (const key in updatedData) {
            formData.append(key, updatedData[key]);
        }

        const result = await fetch(url, {
            method: 'PUT',
            body: formData
        });

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error updating employee:", err);
        return { success: false, error: err.message };
    }
};

 
export const DeleteEmployee = async (employeeId) => {
    const url = `${BASE_URL}/deleteEmployee/${employeeId}`;

    try {
        const result = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error deleting employee:", err);
        return { success: false, error: err.message };
    }
};