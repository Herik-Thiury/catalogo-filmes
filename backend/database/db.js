// 1. Importar as bibliotecas
const mysql = require('mysql2');
require('dotenv').config();

// 2. Criar um pool de conexões com os dados do .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // exemplo: 'localhost'
  port: process.env.DB_PORT,         // exemplo: 3306
  user: process.env.DB_USER,         // exemplo: 'root'
  password: process.env.DB_PASSWORD, // exemplo: 'senha123' ou ''
  database: process.env.DB_NAME,     // exemplo: 'catalogo_filmes'
  waitForConnections: true,          // Permite que o pool espere por conexões disponíveis
  connectionLimit: 10,               // Limite máximo de conexões no pool
  queueLimit: 0                      // O número máximo de requisições em fila para conexões
});


pool.on('error', (err) => {
  console.error('Erro inesperado no pool de conexões do banco de dados:', err);
});


module.exports = pool;
