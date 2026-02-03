import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


if (!API_BASE_URL) {
    console.error('VITE_API_BASE_URL no está definido en .env');
}

// Crear instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor para agregar token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function fetchTrainers() {
    const response = await axiosInstance.get(`/trainers/`);
    if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
    } else if (Array.isArray(response.data)) {
        return response.data;
    } else {
        return [];
    }
}

export async function createTrainer(trainerData) {
    const response = await axiosInstance.post(`/trainers/`, trainerData);
    return response.data;
}

export async function updateTrainer(id, trainerData) {
    const response = await axiosInstance.put(`/trainers/${id}/`, trainerData);
    return response.data;
}

export async function deleteTrainer(id) {
    const response = await axiosInstance.delete(`/trainers/${id}/`);
    return response.data;
}

export async function getTrainer(id) {
    const response = await axiosInstance.get(`/trainers/${id}/`);
    return response.data;
}