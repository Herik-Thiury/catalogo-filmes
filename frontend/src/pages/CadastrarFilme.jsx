// src/pages/CadastrarFilme.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';


function CadastrarFilme() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',       
    descricao: '',    
    ano: '',          
    genero: '',       
    poster_url: '',   
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
      // Validação no frontend com os nomes de chaves corrigidos
      if (!formData.titulo || !formData.descricao || !formData.ano || !formData.genero || !formData.poster_url) {
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
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="ano">Ano de Lançamento:</label>
          <input type="number" id="ano" name="ano" value={formData.ano} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Gênero:</label>
          <input type="text" id="genero" name="genero" value={formData.genero} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="poster_url">URL do Pôster:</label>
          <input type="url" id="poster_url" name="poster_url" value={formData.poster_url} onChange={handleChange} required />
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