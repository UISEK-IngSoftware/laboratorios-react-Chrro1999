import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import './App.css'
import PokemonList from './components/PokemonList'
import PokemonForm from './components/PokemonForm'


function App() {


  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          {/*Rutas */}
          <Routes>
            <Route path='/' element={<PokemonList />} />
            <Route path="add-pokemon" element={<PokemonForm />} />
          </Routes>
        </BrowserRouter>

      </Container>

    </>
  )
}

export default App
