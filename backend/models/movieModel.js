const e = require('express');
const db = require('../database/db');

function CriarFilme(dados, callback) {
    const sql = 'INSERT INTO filmes (titulo, descricao, ano, genero, poster_url) VALUES (?, ?, ?, ?)';
    const valores = [dados.titulo, dados.descricao, dados.ano, dados.genero, dados.poster_url];

    db.query(sql, valores, (err, resultado) => {
        if (err) {
            console.error('Erro ao inserir filme:', err);
            return callback(err);
        }
        callback(null, resultado);
});
}

module.exports = {
    CriarFilme
};