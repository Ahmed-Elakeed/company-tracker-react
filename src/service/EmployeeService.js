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