import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { Container } from '@mui/material'
import './App.css'
import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import PokemonEdit from './pages/PokemonEdit' 
import Login from './pages/Login'
import TrainerList from './pages/TrainerList'
import TrainerForm from './pages/TrainerForm'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Container>
                <Routes>
                    {/* Rutas de Pokémon */}
                    <Route path='/' element={<PokemonList />} />
                    
                    <Route 
                        path="/add-pokemon" 
                        element={
                            <PrivateRoute>
                                <PokemonForm />
                            </PrivateRoute>
                        } 
                    />
                    
                    <Route 
                        path="/edit-pokemon" 
                        element={
                            <PrivateRoute>
                                <PokemonEdit />
                            </PrivateRoute>
                        } 
                    />
                    
                    {/* Ruta para entrenadores */}
                    <Route path='/trainers' element={<TrainerList />} />
                    
                    <Route 
                        path="/trainers/new" 
                        element={
                            <PrivateRoute>
                                <TrainerForm />
                            </PrivateRoute>
                        } 
                    />
                    
                    <Route 
                        path="/trainers/edit/:id" 
                        element={
                            <PrivateRoute>
                                <TrainerForm />
                            </PrivateRoute>
                        } 
                    />
                    
                    <Route 
                        path="/trainers/view/:id" 
                        element={
                            <TrainerForm readOnly={true} />
                        } 
                    />
                    
                    {/* Ruta de login */}
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App