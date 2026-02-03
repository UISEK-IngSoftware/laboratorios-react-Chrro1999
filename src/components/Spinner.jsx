import { Box, CircularProgress, Typography } from '@mui/material'

export default function Spinner({ loading, message = "Cargando..." }) {
    if (!loading) return null;
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                gap: 2
            }}
        >
            <CircularProgress />
            <Typography variant="body1" color="textSecondary">
                {message}
            </Typography>
        </Box>
    )
}
