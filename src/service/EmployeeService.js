import AuthInterceptor from "../security/AuthInterceptor";

const EMPLOYEE_BASE_URL = 'http://localhost:8080/employees/';

export const fetchAllEmployees = async () => {
    try {
        const response = await AuthInterceptor.get(`${EMPLOYEE_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const deleteEmployeeById = async (employeeId) => {
    try {
        const response = await AuthInterceptor.delete(`${EMPLOYEE_BASE_URL}${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}

export const saveOrUpdateEmployee = async (employee) => {
    try {
        const response = await AuthInterceptor.post(`${EMPLOYEE_BASE_URL}`,employee);
        return response.data;
    } catch (error) {
        console.error('Error saving or updating employee:', error);
        throw error;
    }
}