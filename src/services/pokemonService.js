import axios from "axios";
import { pokemons as localPokemons } from "../data/pokemons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Validar que API_BASE_URL está definido
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

export async function fetchPokemons() {
    try {
        const response = await axiosInstance.get(`/api/pokemon/`);
        return response.data.results || response.data;
    } catch (error) {
        console.warn('Error fetching pokemons from API, using local data:', error.message);
        return localPokemons;
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function createPokemon(pokemonData) {
    let pictureBase64 = "";
    if (pokemonData.picture) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }
    
    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    };

    const response = await axiosInstance.post(`/api/pokemon/`, payload);
    return response.data;
}

export async function updatePokemon(id, pokemonData) {
    const response = await axiosInstance.put(`/api/pokemon/${id}/`, pokemonData);
    return response.data;
}

export async function deletePokemon(id) {
    const response = await axiosInstance.delete(`/api/pokemon/${id}/`);
    return response.data;
}