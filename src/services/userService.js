import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    const response = await axios.post(`${API_BASE_URL}/o/token/`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
}

export async function logout() {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        await axios.post(`${API_BASE_URL}/o/revoke_token/`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    } catch (error) {
        console.error("Error al revocar token:", error);
    } finally {
        localStorage.removeItem('access_token');
    }
}