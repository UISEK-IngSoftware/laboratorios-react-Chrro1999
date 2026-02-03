import { Box, Button, TextField, Typography } from '@mui/material'
import Spinner from '../components/Spinner'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../services/pokemonService';

export default function PokemonForm() {

    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        picture: null
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "picture") {
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createPokemon(pokemonData);
            alert("Pokemon creado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error al crear el pokemon:", error);
            alert("Error al crear el pokemon. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            {loading && <Spinner loading={loading} message="Creando pokémon..." />}
            {!loading && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Formulario de Pokemon
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField 
                            label="Nombre" 
                            name="name"
                            variant='outlined' 
                            value={pokemonData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            label="Tipo" 
                            name="type"
                            variant='outlined' 
                            value={pokemonData.type}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            label="Peso" 
                            name="weight"
                            variant='outlined' 
                            type="number" 
                            value={pokemonData.weight}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            label="Altura" 
                            name="height"
                            variant='outlined' 
                            type="number" 
                            value={pokemonData.height}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="file" 
                            name="picture" 
                            accept="image/*" 
                            id="imagePokemon" 
                            onChange={handleChange} 
                        />
                        <Button type="submit" variant="contained" disabled={loading}>Guardar</Button>
                    </Box>
                </>
            )}
        </>
    )
}