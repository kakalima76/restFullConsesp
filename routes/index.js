var express = require('express');
var router = express.Router();
var controller = require('../controllers/locais');

router.get('/cadastro/listarCadastro', controller.listarCadastro);
router.post('/cadastro/criarCadastro', controller.criarCadastro);
router.post('/cadastro/criarConcurso', controller.criarConcurso);
router.post('/cadastro/atualizarEscalado', controller.atualizarEscalado);
router.post('/cadastro/removerCadastro', controller.removerCadastro);
router.post('/cadastro/atualizarConcurso', controller.atualizarConcurso);
router.post('/cadastro/criarNomeConcurso', controller.criarNomeConcurso);
router.get('/cadastro/listarNomeConcursos', controller.listarNomeConcursos);
router.post('/cadastro/removerNomeConcurso', controller.removerNomeConcurso);


module.exports = router;
