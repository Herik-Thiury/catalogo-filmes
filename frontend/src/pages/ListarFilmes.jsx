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
      <Link to="/cadastro" className="button primary-button"> {/* Rota corrigida para /cadastro */}
        Cadastrar Novo Filme
      </Link>

      {movies.length === 0 ? (
        <p className="no-movies-message">Nenhum filme cadastrado ainda.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {/* Correções aqui: usando movie.poster_url e movie.titulo */}
              <img src={movie.poster_url} alt={movie.titulo} className="movie-poster" />
              {/* Correções aqui: usando movie.titulo e movie.ano */}
              <h3>{movie.titulo} ({movie.ano})</h3>
              {/* Correção aqui: usando movie.genero */}
              <p>{movie.genero}</p>
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