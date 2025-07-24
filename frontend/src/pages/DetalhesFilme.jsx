// src/pages/DetalhesFilme.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';


function DetalhesFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieApi.getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError('Filme não encontrado ou erro ao carregar.');
        console.error(`Erro ao buscar filme com ID ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar este filme?')) {
      try {
        await movieApi.deleteMovie(id);
        alert('Filme deletado com sucesso!');
        navigate('/');
      } catch (err) {
        alert('Erro ao deletar filme.');
        console.error('Erro ao deletar:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading-message">Carregando detalhes do filme...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="no-data-message">Filme não encontrado.</div>;
  }

  return (
    <div className="container movie-detail-container">
      <Link to="/" className="back-link">← Voltar para a Lista</Link>
      {/* Correções aqui: usando movie.titulo e movie.ano */}
      <h1>{movie.titulo} ({movie.ano})</h1>
      <div className="detail-content"> 
        {/* Correções aqui: usando movie.poster_url e movie.titulo */}
        <img src={movie.poster_url} alt={movie.titulo} className="detail-poster" />
        <div className="detail-info">
          {/* Correções aqui: usando movie.descricao, movie.genero, movie.ano */}
          <p><strong>Descrição:</strong> {movie.descricao}</p>
          <p><strong>Gênero:</strong> {movie.genero}</p>
          <p><strong>Ano de Lançamento:</strong> {movie.ano}</p>
          <div className="button-group">
            <Link to={`/editar/${movie.id}`} className="button primary-button">
              Editar
            </Link>
            <button onClick={handleDelete} className="button danger-button">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesFilme;