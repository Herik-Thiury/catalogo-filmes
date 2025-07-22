const { CriarFilme } = require('../models/movieModel');

// Função para lidar com a requisição POST /movies
function cadastrarFilme(req, res) {
  const { titulo, descricao, ano, genero, poster_url } = req.body;

  // Validação simples: título e ano são obrigatórios
  if (!titulo || !ano) {
    return res.status(400).json({ mensagem: 'Título e ano são obrigatórios.' });
  }

  const novoFilme = {
    titulo,
    descricao,
    ano,
    genero,
    poster_url
  };

  CriarFilme(novoFilme, (err, resultado) => {
    if (err) {
      console.error('Erro ao cadastrar filme:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar o filme.' });
    }

    res.status(201).json({ mensagem: 'Filme cadastrado com sucesso!', id: resultado.insertId });
  });
}

const { listarFilmes } = require('../models/movieModel');

function obterFilmes(req, res) {
  listarFilmes((err, filmes) => {
    if (err) {
      console.error('Erro ao listar filmes:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar os filmes.' });
    }

    res.status(200).json(filmes);
  });
}


module.exports = {
  cadastrarFilme,
  obterFilmes
};

