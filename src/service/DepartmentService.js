import AuthInterceptor from "../security/AuthInterceptor";

const DEPARTMENT_BASE_URL = 'http://localhost:8080/departments/';

export const fetchAllDepartments = async () => {
    try {
        const response = await AuthInterceptor.get(`${DEPARTMENT_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const fetchDepartmentEmployees = async (departmentId) => {
    try {
        const response = await AuthInterceptor.get(`${DEPARTMENT_BASE_URL}${departmentId}/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department employees:', error);
        throw error;
    }
}

export const fetchDepartmentProjects = async (departmentId) => {
    try {
        const response = await AuthInterceptor.get(`${DEPARTMENT_BASE_URL}${departmentId}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department projects:', error);
        throw error;
    }
}
export const deleteDepartmentById = async (departmentId) => {
    try {
        const response = await AuthInterceptor.delete(`${DEPARTMENT_BASE_URL}${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
}
export const saveDepartment = async (department) => {
    try {
        const response = await AuthInterceptor.post(`${DEPARTMENT_BASE_URL}`,department);
        return response.data;
    } catch (error) {
        console.error('Error saving department:', error);
        throw error;
    }
}
