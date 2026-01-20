import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatePokemon } from '../services/pokemonService';

export default function PokemonEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const pokemon = location.state?.pokemon;

    const [formData, setFormData] = useState({
        name: pokemon?.name || "",
        type: pokemon?.type || "",
        weight: pokemon?.weight || "",
        height: pokemon?.height || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            
            await updatePokemon(pokemon.id, {
                ...formData,
                picture: ""  
            });
            alert("Pokémon actualizado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar el pokemon:", error);
            console.error("Respuesta del servidor:", error.response?.data);
            alert("Error al actualizar el pokemon.");
        }
    }
    
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Editar Pokémon
            </Typography>
            
            <TextField 
                fullWidth
                label="Nombre" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
            />
            
            <TextField 
                fullWidth
                label="Tipo" 
                name="type"
                value={formData.type}
                onChange={handleChange}
                margin="normal"
                required
            />
            
            <TextField 
                fullWidth
                label="Peso (kg)" 
                name="weight"
                type="number" 
                value={formData.weight}
                onChange={handleChange}
                margin="normal"
                required
            />
            
            <TextField 
                fullWidth
                label="Altura (cm)" 
                name="height"
                type="number" 
                value={formData.height}
                onChange={handleChange}
                margin="normal"
                required
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button type="submit" variant="contained" fullWidth>
                    Guardar Cambios
                </Button>
                <Button variant="outlined" fullWidth onClick={() => navigate('/')}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    )
}