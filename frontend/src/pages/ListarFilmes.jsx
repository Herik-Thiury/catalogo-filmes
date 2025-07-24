"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import movieApi from "../api/filmes"
import Navbar from "../components/navbar"
import "../styles/global.css"

function ListarFilmes() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieApi.getAllMovies()
        setMovies(data)
      } catch (err) {
        setError("Erro ao carregar filmes. Por favor, tente novamente.")
        console.error("Erro ao buscar filmes:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="loading-message">Carregando filmes...</div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="list-header-section">
          <h1>Catálogo de Filmes</h1>
           <Link to="/cadastro" className="button primary-button">
        Cadastrar Novo Filme
      </Link>
        </div>

        {movies.length === 0 ? (
          <div className="no-movies-container">
            <p className="no-movies-message">Nenhum filme cadastrado ainda.</p>
            <Link to="/cadastro" className="button primary-button">
              Cadastrar Primeiro Filme
            </Link>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster_url || "/placeholder.svg"} alt={movie.titulo} className="movie-poster" />
                <h3>
                  {movie.titulo} ({movie.ano})
                </h3>
                <p>{movie.genero}</p>
                <Link to={`/filmes/${movie.id}`} className="button secondary-button">
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ListarFilmes
