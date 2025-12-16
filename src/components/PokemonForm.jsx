import { Box, Button, TextField, Typography } from '@mui/material'

export default function PokemonForm(){
    return(
        <>
        <Typography variant="h4" gutterBottom>
            Formulario de Pokemon
            </Typography>
            <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <TextField label="Nombre" variant='outlined' />
                <TextField label="Tipo" variant='outlined' />
                <TextField label="Peso" variant='outlined' type="number" />
                <TextField label="Altura" variant='outlined' type="number" />
                <input type="file" name="picture" accept="image/*" id="imagePokemon" />
                
                <Button type="submit" variant="contained">Guardar </Button>

            </Box>
            </>
    )

}