import { Grid } from '@mui/material'
import PokemonCard from './PokemonCard'
import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/pokemonService'

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons()
        .then(data => setPokemons(data))
        .catch(error => console.error('Error fetching pokemons:', error));
        alert('Error obteniendo los pokemos, intenta mas tarde');
    }, []);

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemon) => (
                    <Grid item={{ xs: 12, sm: 6, md: 4 }}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                )
            )}
        </Grid>
    )
}