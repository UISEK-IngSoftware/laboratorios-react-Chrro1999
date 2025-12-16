import { Card, CardMedia, Typography, CardActions, Button, CardContent } from "@mui/material";

// Vite exposes env vars as flat strings. Define `VITE_API_MEDIA_URL` in your `.env`.
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL || '';

export default function PokemonCard({ pokemon }) {
    const pokemonImageUrl = pokemon?.picture ? `${API_MEDIA_URL}/${pokemon.picture}` : (pokemon?.image || '');
    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pokemonImageUrl}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tipo: {pokemon.type}
        </Typography>
            </CardContent>
            <CardActions>
        <Button size="small">Ver detalles</Button>
      </CardActions>
        </Card>
    );    
}