import axios from 'axios';

const ADMIN_BASE_URL = 'http://localhost:8080/admins/';

const AdminService = axios.create({
    baseURL: ADMIN_BASE_URL,
});

export const fetchAllAdmins = async () => {
    try {
        const response = await AdminService.get(`${ADMIN_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};