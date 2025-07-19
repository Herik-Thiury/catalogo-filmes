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

module.exports = {
  CriarFilme,
};
