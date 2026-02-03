import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/Pokédex_3D.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";

import "./Header.css";

export default function Header() {

    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <div className="pokedex-navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src={pokedexLogo} alt="Logo" height={60} />
                    </div>
                </Toolbar>
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate('/')}>Inicio</Button>
                    
                    {/* Botón para Entrenadores */}
                    <Button color="inherit" onClick={() => navigate('/trainers')}>
                        Entrenadores
                    </Button>

                    {isLoggedIn && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/add-pokemon')}>
                                Agregar Pokemon
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}