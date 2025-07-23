
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';


function ListarFilmes() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieApi.getAllMovies();
        setMovies(data);
      } catch (err) {
        setError('Erro ao carregar filmes. Por favor, tente novamente.');
        console.error('Erro ao buscar filmes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading-message">Carregando filmes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Catálogo de Filmes</h1>
      <Link to="/cadastrar" className="button primary-button">
        Cadastrar Novo Filme
      </Link>

      {movies.length === 0 ? (
        <p className="no-movies-message">Nenhum filme cadastrado ainda.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
              <h3>{movie.title} ({movie.releaseYear})</h3>
              <p>{movie.genre}</p>
              <Link to={`/filmes/${movie.id}`} className="button secondary-button">
                Ver Detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListarFilmes;