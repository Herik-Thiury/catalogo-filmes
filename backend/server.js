// 1. Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// 2. Importar os pacotes necessários
const express = require('express');
const cors = require('cors');

// 3. Criar a aplicação Express
const app = express();

// 4. Configurar middlewares
app.use(cors());               // Permite chamadas do frontend
app.use(express.json());       // Permite receber JSON no corpo das requisições

// 5. Rota de teste (GET /)
app.get('/', (req, res) => {
  res.send('Servidor rodando com sucesso!');
});

// 6. Pegar a porta do arquivo .env ou usar 3001 como padrão
const PORT = process.env.PORT || 3001;

// 7. Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
