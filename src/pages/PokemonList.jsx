import { Grid } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/pokemonService'
import { useNavigate } from 'react-router-dom'

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = () => {
        fetchPokemons()
            .then(data => {
                console.log('Pokémons cargados:', data);
                setPokemons(data);
            })
            .catch(error => {
                console.error('Error fetching pokemons:', error);
                alert('Error obteniendo los pokémons, intenta más tarde');
            });
    };

    const handleDelete = (id) => {
        setPokemons(pokemons.filter(p => p.id !== id));
    };

    const handleEdit = (pokemon) => {
        navigate('/edit-pokemon', { state: { pokemon } });
    };

    return (
        <Grid container spacing={2} sx={{ py: 2 }}>
            {pokemons.map((pokemon) => (
                <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
                    <PokemonCard 
                        pokemon={pokemon} 
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </Grid>
            ))}
        </Grid>
    )
}