import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { fetchTrainers, deleteTrainer } from '../services/trainerService';

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const navigate = useNavigate();

  // Verificar autenticación
  const isAuthenticated = !!localStorage.getItem('access_token');

  // Cargar entrenadores
  const loadTrainers = async () => {
    try {
      setLoading(true);
      const data = await fetchTrainers();
      setTrainers(data);
    } catch (error) {
      console.error('Error cargando entrenadores:', error);
      alert('Error al cargar los entrenadores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  // Manejar creación de nuevo entrenador
  const handleCreate = () => {
    navigate('/trainers/new');
  };

  // Manejar edición de entrenador
  const handleEdit = (trainer) => {
    navigate(`/trainers/edit/${trainer.id}`, { state: { trainer } });
  };

  // Manejar vista de entrenador
  const handleView = (trainer) => {
    navigate(`/trainers/view/${trainer.id}`, { state: { trainer } });
  };

  // Manejar eliminación de entrenador
  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTrainer(trainerToDelete.id);
      alert('Entrenador eliminado exitosamente');
      setDeleteDialogOpen(false);
      setTrainerToDelete(null);
      loadTrainers(); // Recargar la lista
    } catch (error) {
      console.error('Error eliminando entrenador:', error);
      alert('Error al eliminar el entrenador');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTrainerToDelete(null);
  };

  return (
    <>
      <Spinner loading={loading} message="Cargando entrenadores..." />
      {!loading && (
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1">
              Entrenadores Pokémon
            </Typography>
            
            {/* botón crear si está autenticado */}
            {isAuthenticated && (
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleCreate}
              >
                Nuevo Entrenador
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            {trainers.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No hay entrenadores registrados.</Typography>
              </Grid>
            ) : (
              trainers.map((trainer) => (
                <Grid item key={trainer.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div" gutterBottom>
                        {trainer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Nivel:</strong> {trainer.nivel || 'No especificado'}
                      </Typography>
                      {trainer.region && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Región:</strong> {trainer.region}
                        </Typography>
                      )}
                    </CardContent>
                    
                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton color="primary" onClick={() => handleView(trainer)}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      
                      {/*boton editar/eliminar si está autenticado */}
                      {isAuthenticated && (
                        <Box>
                          <Tooltip title="Editar">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleEdit(trainer)}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Eliminar">
                            <IconButton 
                              color="error" 
                              onClick={() => handleDeleteClick(trainer)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          {/* Diálogo de confirmación para eliminar */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <Typography>
                ¿Estás seguro de que deseas eliminar al entrenador{' '}
                <strong>{trainerToDelete?.name}</strong>? Esta acción no se puede deshacer.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancelar</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}