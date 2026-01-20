import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container,
  Paper,
  Grid
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createTrainer, updateTrainer, getTrainer } from '../services/trainerService';

function TrainerForm({ readOnly = false }) {
  const { id } = useParams(); // Para edición (si hay ID en la URL)
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = !!id && !readOnly;
  
  const [formData, setFormData] = useState({
    name: '',
    nivel: '',
    region: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar datos del entrenador si estamos en modo edición
  useEffect(() => {
    if (isEditMode) {
      loadTrainerData();
    }
  }, [id]);

  const loadTrainerData = async () => {
    try {
      setLoading(true);
      const trainer = location.state?.trainer || await getTrainer(id);
      setFormData({
        name: trainer.name || '',
        nivel: trainer.nivel || '',
        region: trainer.region || ''
      });
    } catch (error) {
      console.error('Error cargando entrenador:', error);
      alert('Error al cargar los datos del entrenador');
      navigate('/trainers');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (formData.nivel && (isNaN(formData.nivel) || formData.nivel < 1 || formData.nivel > 100)) {
      newErrors.nivel = 'El nivel debe ser un número entre 1 y 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (readOnly) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const trainerData = {
        ...formData,
        nivel: formData.nivel ? parseInt(formData.nivel) : null
      };

      if (isEditMode) {
        await updateTrainer(id, trainerData);
        alert('Entrenador actualizado exitosamente');
      } else {
        await createTrainer(trainerData);
        alert('Entrenador creado exitosamente');
      }
      
      navigate('/trainers');
    } catch (error) {
      console.error('Error guardando entrenador:', error);
      alert(`Error al ${isEditMode ? 'actualizar' : 'crear'} el entrenador`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/trainers');
  };

  if (loading && isEditMode) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography>Cargando...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {readOnly ? 'Ver Entrenador' : (isEditMode ? 'Editar Entrenador' : 'Nuevo Entrenador')}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Entrenador"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  disabled={loading || readOnly}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nivel"
                  name="nivel"
                  type="number"
                  value={formData.nivel}
                  onChange={handleChange}
                  error={!!errors.nivel}
                  helperText={errors.nivel}
                  disabled={loading || readOnly}
                  inputProps={{ min: 1, max: 100 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Región"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  disabled={loading || readOnly}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  {readOnly ? (
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Volver
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                      >
                        {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear')}
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default TrainerForm;