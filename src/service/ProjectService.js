import AuthInterceptor from "../security/AuthInterceptor";

const PROJECT_BASE_URL = 'http://localhost:8080/projects/';

export const fetchAllProjects = async () => {
    try {
        const response = await AuthInterceptor.get(`${PROJECT_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const deleteProjectById = async (projectId) => {
    try {
        const response = await AuthInterceptor.delete(`${PROJECT_BASE_URL}${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}
export const saveOrUpdateProject = async (project) => {
    try {
        const response = await AuthInterceptor.post(`${PROJECT_BASE_URL}`,project);
        return response.data;
    } catch (error) {
        console.error('Error saving or updating project:', error);
        throw error;
    }
}

export const fetchApplicableProjectEmployees = async (projectId) =>{
    try {
        const response = await AuthInterceptor.get(`${PROJECT_BASE_URL}${projectId}/available-employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}