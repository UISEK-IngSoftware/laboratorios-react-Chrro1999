import { Box, Button, TextField, Typography } from '@mui/material'
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
        try {
            await createPokemon(pokemonData);
            alert("Pokemon creado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error al crear el pokemon:", error);
            alert("Error al crear el pokemon. Por favor, intenta de nuevo.");
            return;
        }
    }
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokemon
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" variant='outlined' onChange={handleChange} />
                <TextField label="Tipo" variant='outlined' onChange={handleChange} />
                <TextField label="Peso" variant='outlined' type="number" onChange={handleChange} />
                <TextField label="Altura" variant='outlined' type="number" onChange={handleChange} />
                <input type="file" name="picture" accept="image/*" id="imagePokemon" onChange={handleChange} />
                <Button type="submit" variant="contained">Guardar </Button>

            </Box>
        </>
    )
}