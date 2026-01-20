import { Card, CardMedia, Typography, CardActions, Button, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { deletePokemon } from "../services/pokemonService";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL || '';

export default function PokemonCard({ pokemon, onDelete, onEdit }) {
    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const pokemonImageUrl = pokemon?.picture ? `${API_MEDIA_URL}/${pokemon.picture}` : (pokemon?.image || '');
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleDeleteClick = () => setDeleteConfirmOpen(true);
    const handleDeleteCancel = () => setDeleteConfirmOpen(false);
    
    const handleDeleteConfirm = async () => {
        try {
            await deletePokemon(pokemon.id);
            alert("Pokémon eliminado exitosamente");
            setDeleteConfirmOpen(false);
            if (onDelete) onDelete(pokemon.id);
        } catch (error) {
            console.error("Error al eliminar el pokémon:", error);
            alert("Error al eliminar el pokémon. Por favor, intenta de nuevo.");
        }
    };
    
    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height={300}
                    image={pokemonImageUrl}
                    alt={pokemon.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Tipo: {pokemon.type}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    <Button variant="outlined" size="small" onClick={handleOpen}>
                        Ver detalles
                    </Button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="contained" size="small" color="primary" onClick={() => onEdit && onEdit(pokemon)}>
                            Editar
                        </Button>
                        <Button variant="contained" size="small" color="error" onClick={handleDeleteClick}>
                            Eliminar
                        </Button>
                    </div>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h4" component="div">
                        {pokemon.name}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <img 
                        src={pokemonImageUrl} 
                        alt={pokemon.name} 
                        style={{ 
                            width: '100%', 
                            maxHeight: '400px', 
                            objectFit: 'contain',
                            marginBottom: '16px' 
                        }} 
                    />
                    <Typography variant="body1" gutterBottom>
                        <strong>Tipo:</strong> {pokemon.type}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Peso:</strong> {pokemon.weight} kg
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Altura:</strong> {pokemon.height} cm
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
                <DialogTitle>¿Eliminar Pokémon?</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas eliminar a <strong>{pokemon.name}</strong>? 
                        Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancelar</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );    
}