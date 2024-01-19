import axios from 'axios';

const PROJECT_BASE_URL = 'http://localhost:8080/projects/';

const ProjectService = axios.create({
    baseURL: PROJECT_BASE_URL,
});

export const fetchAllProjects = async (endpoint) => {
    try {
        const response = await ProjectService.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};