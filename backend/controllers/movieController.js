const {
  criarFilme,
  listarFilmes,
  buscarFilmePorId,
  atualizarFilme,
  deletarFilme
} = require("../models/movieModel");

// Função para lidar com a requisição POST /movies
function cadastrarFilme(req, res) {
  const { titulo, descricao, ano, genero, poster_url } = req.body;

  // Validação simples: título e ano são obrigatórios
  if (!titulo || !ano) {
    return res.status(400).json({ mensagem: "Título e ano são obrigatórios." });
  }

  const novoFilme = {
    titulo,
    descricao,
    ano,
    genero,
    poster_url,
  };

  criarFilme(novoFilme, (err, resultado) => {
    if (err) {
      console.error("Erro ao cadastrar filme:", err);
      return res.status(500).json({ mensagem: "Erro ao cadastrar o filme." });
    }

    res
      .status(201)
      .json({
        mensagem: "Filme cadastrado com sucesso!",
        id: resultado.insertId,
      });
  });
}



function obterFilmes(req, res) {
  listarFilmes((err, filmes) => {
    if (err) {
      console.error("Erro ao listar filmes:", err);
      return res.status(500).json({ mensagem: "Erro ao buscar os filmes." });
    }

    res.status(200).json(filmes);
  });
}

function obterFilmesPorID(req, res) {
  const id = req.params.id;
  const { buscarFilmePorId } = require("../models/movieModel");
  buscarFilmePorId(id, (err, filme) => {
    if (err) {
      console.error("Erro ao buscar filme:", err);
      return res.status(404).json({ mensagem: "Filme não encontrado." });
    }
    res.status(200).json(filme);
  });
}

function editarFilme(req, res) {
  const id = req.params.id;
  const { titulo, descricao, ano, genero, poster_url } = req.body;

  if (!titulo || !ano) {
    return res.status(400).json({ mensagem: 'Título e ano são obrigatórios.' });
  }

  const filmeAtualizado = {
    titulo,
    descricao,
    ano,
    genero,
    poster_url
  };

  atualizarFilme(id, filmeAtualizado, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar filme:', err);
      return res.status(500).json({ mensagem: 'Erro ao atualizar o filme.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Filme não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Filme atualizado com sucesso!' });
  });
}

function excluirFilme(req, res) {
  const id = req.params.id;

  deletarFilme(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao deletar filme:', err);
      return res.status(500).json({ mensagem: 'Erro ao deletar o filme.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Filme não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Filme deletado com sucesso!' });
  });
}

module.exports = {
  cadastrarFilme,
  obterFilmes,
  obterFilmesPorID,
  editarFilme,
  excluirFilme
};

