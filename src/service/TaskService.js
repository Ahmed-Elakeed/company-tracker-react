import AuthInterceptor from "../security/AuthInterceptor";

const TASK_BASE_URL = 'http://localhost:8080/tasks/';


export const fetchAllTasks = async () => {
    try {
        const response = await AuthInterceptor.get(`${TASK_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const deleteTaskById = async (taskId) => {
    try {
        const response = await AuthInterceptor.delete(`${TASK_BASE_URL}${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}
export const saveOrUpdateTask = async (task) => {
    try {
        const response = await AuthInterceptor.post(`${TASK_BASE_URL}`, task);
        return response.data;
    } catch (error) {
        console.error('Error saving or updating task:', error);
        throw error;
    }
}
export const sendTaskReports = async (selectedStatus) => {
    try {
        const response = await AuthInterceptor.get(`${TASK_BASE_URL}report`,{
            params:{
                taskStatus: selectedStatus
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending tasks report:', error);
        throw error;
    }
}