import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/Pokédex_3D.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";

import "./Header.css";

export default function Header() {

    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <div className="pokedex-navbar">
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-container">
                            <img src={pokedexLogo} alt="Logo" height={300} />
                        </div>
                    </Toolbar>
                    <Toolbar gutterBottom>
                        <Button color="inherit" href="/">Inicio</Button>

                        {isLoggedIn && (
                            <>
                                <Button color="inherit" href="/add-pokemon">Agregar Pokemon</Button>
                                <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <Button color="inherit" href="/login">Iniciar sesión</Button>
                            </>
                        )}

                </Toolbar>
            </AppBar>
        </div>
        </>
    );
} 