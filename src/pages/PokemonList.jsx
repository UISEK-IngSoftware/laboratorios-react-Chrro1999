import { Grid } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import Spinner from '../components/Spinner'
import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/pokemonService'
import { useNavigate } from 'react-router-dom'

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = () => {
        setLoading(true);
        fetchPokemons()
            .then(data => {
                console.log('Pokémons cargados:', data);
                setPokemons(data);
            })
            .catch(error => {
                console.error('Error fetching pokemons:', error);
                alert('Error obteniendo los pokémons, intenta más tarde');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        setPokemons(pokemons.filter(p => p.id !== id));
    };

    const handleEdit = (pokemon) => {
        navigate('/edit-pokemon', { state: { pokemon } });
    };

    if (loading && pokemons.length === 0) {
        return <Spinner loading={loading} message="Cargando pokémons..." />
    }

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