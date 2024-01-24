import AuthInterceptor from "../security/AuthInterceptor";

const ADMIN_BASE_URL = 'http://localhost:8080/admins/';

export const fetchAllAdmins = async () => {
    try {
        const response = await AuthInterceptor.get(`${ADMIN_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const adminLogin = async (loginDTO) => {
    try {
        const response = await AuthInterceptor.post(`${ADMIN_BASE_URL}login`, loginDTO);
        return response.data;
    } catch (error) {
        console.error('Error logging admin:', error);
        throw error;
    }
}

export const deleteAdminById = async (adminId) => {
    try {
        const response = await AuthInterceptor.delete(`${ADMIN_BASE_URL}${adminId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw error;
    }
}

export const saveOrUpdateAdmin = async (admin) => {
    try {
        const response = await AuthInterceptor.post(`${ADMIN_BASE_URL}`,admin);
        return response.data;
    } catch (error) {
        console.error('Error saving or updating admin:', error);
        throw error;
    }
}