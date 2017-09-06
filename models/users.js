var mongoose = require( 'mongoose' );


var concursosSchema = new mongoose.Schema({
	"data": {type: Date},
	"nome": {type: String},
	"status": {type: String}
})

var rpaSchema = new mongoose.Schema({
	"cpf": {type: String, unique: true, required: true},
	"pispasep": {type: String, unique: true, required: true},
	"nome": {type: String},
	"nomeMae": {type: String},
	"nascimento": {type: Date},
	"idt": {type: String},
	"emissor": {type: String},
	"ufEmissor": {type: String},
	"dataEmissao": {type: Date},
	"sexo": {type: Boolean},
	"estadoCivil": {type: String},
	"tipoLogradouro": {type: String},
	"endereco": {type: String},
	"numero": {type: String},
	"complemento": {type: String},
	"bairro": {type: String},
	"cep": {type: String},
	"uf": {type: String},
	"municipio": {type: String},
	"contato": {type: String},
	"email": {type: String},
	"dataEscalado": {type: String},
	"concursos": [concursosSchema]
});

var nomesConcursosSchema = new mongoose.Schema({
	"nome": {type: String},
	"data": {type: String},
	"periodo": {type: String}
})

mongoose.model('Concurso', concursosSchema);
mongoose.model('Rpa', rpaSchema, 'rpa');
mongoose.model('nomesConcursos', nomesConcursosSchema, 'nomesConcursos');


