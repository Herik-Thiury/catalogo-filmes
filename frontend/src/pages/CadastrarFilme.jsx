// src/pages/CadastrarFilme.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';

function CadastrarFilme() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    posterUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

      await movieApi.createMovie(formData);
      alert('Filme cadastrado com sucesso!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar filme.');
      console.error('Erro no cadastro:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Filme</h1>
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
            {submitting ? 'Cadastrando...' : 'Cadastrar Filme'}
          </button>
          <Link to="/" className="button secondary-button">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default CadastrarFilme;