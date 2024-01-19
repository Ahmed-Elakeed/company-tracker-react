import axios from 'axios';

const DEPARTMENT_BASE_URL = 'http://localhost:8080/departments/';

const DepartmentService = axios.create({
    baseURL: DEPARTMENT_BASE_URL,
});

export const fetchAllDepartments = async () => {
    try {
        const response = await DepartmentService.get(`${DEPARTMENT_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const fetchDepartmentEmployees = async (departmentId) => {
    try {
        const response = await DepartmentService.get(`${DEPARTMENT_BASE_URL}${departmentId}/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department employees:', error);
        throw error;
    }
}

export const fetchDepartmentProjects = async (departmentId) => {
    try {
        const response = await DepartmentService.get(`${DEPARTMENT_BASE_URL}${departmentId}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department projects:', error);
        throw error;
    }
}
export const deleteDepartmentById = async (departmentId) => {
    try {
        const response = await DepartmentService.delete(`${DEPARTMENT_BASE_URL}${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
}
