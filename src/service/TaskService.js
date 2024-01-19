import axios from 'axios';

const TASK_BASE_URL = 'http://localhost:8080/tasks/';

const TaskService = axios.create({
    baseURL: TASK_BASE_URL,
});

export const fetchAllTasks = async (endpoint) => {
    try {
        const response = await TaskService.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};