import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import PokemonCard from './components/PokemonCard'
import './App.css'
import PokemonList from './components/PokemonList'


function App() {


  return (
    <>
      <Header />
      <Container>
        <PokemonList />

      </Container>

    </>
  )
}

export default App
