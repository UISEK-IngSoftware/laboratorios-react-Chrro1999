import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}
