import { AppBar, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/Pokédex_3D.png";
import "./Header.css";
export default function Header() {
    return (
        <Container>
        <div className="pokedex-navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src={pokedexLogo} alt="Logo" height={300} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        </Container>
    );
} 