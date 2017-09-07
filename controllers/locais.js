var mongoose = require('mongoose');
var Rpa	= mongoose.model('Rpa');
var nomesConcursos = mongoose.model('nomesConcursos');


	var sendJsonResponse = function(res, status, content){
		res.status(status);
		res.json(content);
	}



	module.exports.criarCadastro = function(req, res){

		if(!req.body.cpf || !req.body.pispasep){
			sendJsonResponse(res, 404, {
				'message': 'Dados essenciais faltando!'
			})

			return;
		}

		var rpa = new Rpa();
		
	rpa.cpf = req.body.cpf;
	rpa.dataEscalado = '';
	rpa.manha = 0;
	rpa.tarde = 0;
	rpa.pispasep = req.body.pispasep;
	rpa.nome = req.body.nome;
	rpa.nomeMae = req.body.nomeMae;
	rpa.nascimento = req.body.nascimento;
	rpa.idt = req.body.idt;
	rpa.emissor = req.body.emissor;
	rpa.ufEmissor = req.body.ufEmissor;
	rpa.dataEmissao = req.body.dataEmissao;
	rpa.sexo = req.body.sexo;
	rpa.estadoCivil = req.body.estadoCivil;
	rpa.tipoLogradouro = req.body.tipoLogradouro;
	rpa.endereco = req.body.endereco;
	rpa.numero = req.body.numero;
	rpa.complemento = req.body.complemento;
	rpa.bairro = req.body.bairro;
	rpa.cep = req.body.cep;
	rpa.uf = req.body.uf;
	rpa.municipio = req.body.municipio;
	rpa.contato = req.body.contato;
	rpa.email = req.body.email;
	
	rpa.save(function(err, data){
			if(err){
					sendJsonResponse(res, 404, err)
			}else{
					sendJsonResponse(res, 200, data);	
			}
		})	
	
	}

	module.exports.criarConcurso = function(req, res){

		if(!req.body.cpf){
			sendJsonResponse(res, 404, {
				'message': 'Dados essenciais faltando!'
			})

			return;
		}

		var query = Rpa.find({'cpf': req.body.cpf});
		query.exec(function(err, data){
			if(!data){
				sendJsonResponse(res, 404, {
					'message': 'problemas para acessar o arquivo.'
				})

				return;

			}else if(err){
				sendJsonResponse(res, 400, err);

				return;
			}else{


				var concurso = new nomesConcursos();
				//var d = new Date();			
				concurso.data = req.body.data;
				concurso.nome = req.body.nome;
				concurso.status = req.body.periodo;
				
				data[0].concursos.push(concurso);
				data[0].save(function(err, data){
					if(err){
						sendJsonResponse(res, 404, err)
					}else{
						sendJsonResponse(res, 200, data);	
					}
				})
				
			}
		})		
	}

	
	module.exports.listarCadastro = function(req, res){

		var query = Rpa.find({});
		query.exec(function(err, data){
			if(!data){
				sendJsonResponse(res, 404, {
					'message': 'problemas para acessar o arquivo.'
				})

				return;

			}else if(err){
				sendJsonResponse(res, 400, err);

				return;
			}else{
				sendJsonResponse(res, 200, data);	
			}
				
		})	
	}

		
	module.exports.removerCadastro = function(req, res){

	
	var cadastroId = req.body.cadastroId;

	if(cadastroId){
		Rpa
		.findByIdAndRemove(cadastroId)
		.exec(function(err, data){
			if(err){
				sendJsonResponse(res, 404, err);
			}else{
				sendJsonResponse(res, 204, null)
			}
		})
	}else{
		sendJsonResponse(res, 404, {'message': 'No cadastroId'})
	}
		
}


	module.exports.atualizarConcurso = function(req, res){

	if(!req.body.cadastroId || !req.body.concursosId || !req.body.status){
			sendJsonResponse(res, 404, {
				'message': 'Informe todos os dados!'
			})

			return;
		}


	Rpa

	.findById(req.body.cadastroId)
	.select('concursos')
	.exec(function(err, cadastro){
		var thisConcurso;
		if(!cadastro){
			sendJsonResponse(res, 404, {
				'message': 'Cadastro não localizado'
			})

			return;
		}else if (err){
			sendJsonResponse(res, 400, err)
			return;
		}

		if(cadastro.concursos && cadastro.concursos.length > 0){
			thisConcurso = cadastro.concursos.id(req.body.concursosId);
			if(!thisConcurso){
				sendJsonResponse(res, 404, {'message': 'concurso não localizado'})
			}else{
				thisConcurso.status = req.body.status;
				cadastro.save(function(err, cadastro){
					if(err){
						sendJsonResponse(res, 404, err)
					}else{
						sendJsonResponse(res, 200, cadastro)
					}

				})
			}
		}else{
			sendJsonResponse(res, 404, {'message': 'Atualização não realizada'})
		}

	})
	
		
}





//cria um novo concurso para ser consumido como lista dos concursos na app
module.exports.criarNomeConcurso = function(req, res){


		if(!req.body.nome || !req.body.data){
			sendJsonResponse(res, 404, {
				'message': 'Dados essenciais faltando!'
			})

			return;
		}

	var nomesconcursos = new nomesConcursos();
		
	console.log(nomesConcursos);

	nomesconcursos.nome = req.body.nome;
	nomesconcursos.data = req.body.data;
	nomesconcursos.periodo = req.body.periodo;
	
	nomesconcursos.save(function(err, data){
			if(err){
					sendJsonResponse(res, 404, err)
			}else{
					sendJsonResponse(res, 200, data);	
			}
		})	
	
	}

	
	module.exports.listarNomeConcursos = function(req, res){

		var query = nomesConcursos.find({});
		query.exec(function(err, data){
			if(!data){
				sendJsonResponse(res, 404, {
					'message': 'problemas para acessar o arquivo.'
				})

				return;

			}else if(err){
				sendJsonResponse(res, 400, err);

				return;
			}else{
				sendJsonResponse(res, 200, data);	
			}
				
		})	
	}

	module.exports.removerNomeConcurso = function(req, res){

	
	var nomeConcursoId = req.body.nomeConcursoId;

	if(nomeConcursoId){
		nomesConcursos
		.findByIdAndRemove(nomeConcursoId)
		.exec(function(err, data){
			if(err){
				sendJsonResponse(res, 404, err);
			}else{
				sendJsonResponse(res, 204, null)
			}
		})
	}else{
		sendJsonResponse(res, 404, {'message': 'No cadastroId'})
	}
		
}

