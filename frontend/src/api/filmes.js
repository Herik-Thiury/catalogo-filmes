

const API_BASE_URL = 'http://localhost:3001/api/movies'; 

const movieApi = {
  /**
   * Obtém todos os filmes cadastrados.
   * @returns {Promise<Array>} 
   */
  getAllMovies: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar todos os filmes:', error);
      throw error;
    }
  },

  /**
   * Obtém um filme específico pelo ID.
   * @param {string} id O ID do filme.
   * @returns {Promise<Object>} 
   */
  getMovieById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        
        if (response.status === 404) {
          throw new Error(`Filme com ID ${id} não encontrado.`);
        }
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar o filme com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cadastra um novo filme.
   * @param {Object} movieData Os dados do novo filme (título, descrição, etc.).
   * @returns {Promise<Object>}
   */
  createMovie: async (movieData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao cadastrar novo filme:', error);
      throw error;
    }
  },

  /**
   * Atualiza as informações de um filme existente.
   * @param {string} id O ID do filme a ser atualizado.
   * @param {Object} movieData Os novos dados do filme.
   * @returns {Promise<Object>}
   */
  updateMovie: async (id, movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar o filme com ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Deleta um filme pelo ID.
   * @param {string} id O ID do filme a ser deletado.
   * @returns {Promise<void>} 
   */
  deleteMovie: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      } 
    } catch (error) {
      console.error(`Erro ao deletar o filme com ID ${id}:`, error);
      throw error;
    }
  },
};

export default movieApi;