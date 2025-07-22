const db = require("../database/db");

// Função que insere um novo filme no banco
function CriarFilme(dados, callback) {
  const sql =
    "INSERT INTO movies (titulo, descricao, ano, genero, poster_url) VALUES (?, ?, ?, ?, ?)";
  const valores = [
    dados.titulo,
    dados.descricao,
    dados.ano,
    dados.genero,
    dados.poster_url,
  ];

  db.query(sql, valores, (err, resultado) => {
    if (err) {
      return callback(err); // Em caso de erro, retorna o erro
    }
    callback(null, resultado); // Caso contrário, retorna o resultado
  });
}

function listarFilmes(callback) {
  const sql = 'SELECT * FROM movies';

  db.query(sql, (err, resultados) => {
    if (err) {
      return callback(err);
    }
    callback(null, resultados);
  });
}

function buscarFilmePorId(id, callback){
  const sql = 'SELECT * FROM movies WHERE id = ?';
  
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      return callback(err);
    }
    if (resultados.length === 0) {
      return callback(new Error('Filme não encontrado'));
    }
    callback(null, resultados[0]);
  });
}

function atualizarFilme(id, dados, callback) {
  const sql = `
    UPDATE movies 
    SET titulo = ?, descricao = ?, ano = ?, genero = ?, poster_url = ? 
    WHERE id = ?
  `;

  const valores = [
    dados.titulo,
    dados.descricao,
    dados.ano,
    dados.genero,
    dados.poster_url,
    id
  ];

  db.query(sql, valores, (err, resultado) => {
    if (err) {
      return callback(err);
    }
    callback(null, resultado);
  });
}

function deletarFilme(id, callback) {
  const sql = 'DELETE FROM movies WHERE id = ?';

  db.query(sql, [id], (err, resultado) => {
    if (err) {
      return callback(err);
    }
    callback(null, resultado);
  });
}

module.exports = {
  CriarFilme,
  listarFilmes,
  buscarFilmePorId,
  atualizarFilme,
  deletarFilme
};

