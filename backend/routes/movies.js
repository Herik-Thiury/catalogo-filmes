const express = require('express');
const router = express.Router(); // ESTA LINHA É CRÍTICA: ELA DEFINE O 'router'

const {
  cadastrarFilme,
  obterFilmes,
  obterFilmesPorID,
  editarFilme,
  excluirFilme
} = require('../controllers/movieController');

// Rota para cadastrar um novo filme
router.post('/', cadastrarFilme);
router.get('/', obterFilmes);
router.get('/:id', obterFilmesPorID);
router.put('/:id', editarFilme);
router.delete('/:id', excluirFilme);

module.exports = router;