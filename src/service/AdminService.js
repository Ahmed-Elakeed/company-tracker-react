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