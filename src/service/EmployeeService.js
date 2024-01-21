import axios from 'axios';

const EMPLOYEE_BASE_URL = 'http://localhost:8080/employees/';

const EmployeeService = axios.create({
    baseURL: EMPLOYEE_BASE_URL,
});

export const fetchAllEmployees = async (endpoint) => {
    try {
        const response = await EmployeeService.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const deleteEmployeeById = async (employeeId) => {
    try {
        const response = await EmployeeService.delete(`${EMPLOYEE_BASE_URL}${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}

export const saveOrUpdateEmployee = async (employee) => {
    try {
        const response = await EmployeeService.post(`${EMPLOYEE_BASE_URL}`,employee);
        return response.data;
    } catch (error) {
        console.error('Error saving or updating employee:', error);
        throw error;
    }
}