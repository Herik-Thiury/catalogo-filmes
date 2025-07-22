const express = require('express');
const router = express.Router();

const { cadastrarFilme, obterFilmes } = require('../controllers/movieController');


// Rota para cadastrar um novo filme
router.post('/', cadastrarFilme);
router.get('/', obterFilmes);


module.exports = router;
