
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import movieApi from '../api/filmes';
import '../styles/global.css';

function EditarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',        
    descricao: '',     
    ano: '',           
    genero: '',        
    poster_url: '',    
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await movieApi.getMovieById(id);
        // Ao carregar, mapeia os dados do backend para o estado do formulário com as chaves corretas
        setFormData({
          titulo: data.titulo || '',
          descricao: data.descricao || '',
          ano: data.ano || '',
          genero: data.genero || '',
          poster_url: data.poster_url || '',
        });
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
      // Validação no frontend com os nomes de chaves corrigidos
      if (!formData.titulo || !formData.descricao || !formData.ano || !formData.genero || !formData.poster_url) {
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
            {submitting ? 'Atualizando...' : 'Atualizar Filme'}
          </button>
          <Link to={`/filmes/${id}`} className="button secondary-button">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default EditarFilme;