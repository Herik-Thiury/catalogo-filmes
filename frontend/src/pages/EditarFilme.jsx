// src/pages/EditarFilme.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';

function EditarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    posterUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await movieApi.getMovieById(id);
        setFormData(data);
      } catch (err) {
        setError('Filme não encontrado ou erro ao carregar para edição.');
        console.error('Erro ao carregar filme para edição:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!formData.title || !formData.description || !formData.releaseYear || !formData.genre || !formData.posterUrl) {
        throw new Error("Por favor, preencha todos os campos.");
      }
      
      await movieApi.updateMovie(id, formData);
      alert('Filme atualizado com sucesso!');
      navigate(`/filmes/${id}`);
    } catch (err) {
      setError(err.message || 'Erro ao atualizar filme.');
      console.error('Erro na atualização:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Carregando dados do filme para edição...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Editar Filme</h1>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="releaseYear">Ano de Lançamento:</label>
          <input type="number" id="releaseYear" name="releaseYear" value={formData.releaseYear} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Gênero:</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="posterUrl">URL do Pôster:</label>
          <input type="url" id="posterUrl" name="posterUrl" value={formData.posterUrl} onChange={handleChange} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="submit" disabled={submitting} className="button primary-button">
            {submitting ? 'Atualizando...' : 'Atualizar Filme'}
          </button>
          <Link to={`/filmes/${id}`} className="button secondary-button">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default EditarFilme;