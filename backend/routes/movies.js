const express = require('express');
const router = express.Router();

const { cadastrarFilme, obterFilmes, obterFilmesPorID, editarFilme } = require('../controllers/movieController');
const { excluirFilme } = require('../controllers/movieController');




// Rota para cadastrar um novo filme
router.post('/', cadastrarFilme);
router.get('/', obterFilmes);
router.get('/:id', obterFilmesPorID);
router.put('/:id', editarFilme);
router.delete('/:id', excluirFilme);

module.exports = router;
