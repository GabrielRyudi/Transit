function ServicosDAO(model){
    this.model = model;
}

ServicosDAO.prototype.find = function(query, callback){
    this.model.find(query).exec(callback);
};

ServicosDAO.prototype.findOne = function(_id, callback){
    var query = {_id: _id};
    this.model.findOne(query).exec(callback);
};

ServicosDAO.prototype.create = function(data, callback){
    var model = new this.model(data);
    model.save(function(err, result){
        callback(err, result);
    });
};

ServicosDAO.prototype.update = function(_id, data, callback){
    var query = {_id: _id};
    this.model.update(query, data).exec(function(err, result){
        callback(err, result);
    });
};

ServicosDAO.prototype.remove = function(_id, callback){
    var query = {_id: _id};
    this.model.remove(query).exec(function(err, result){
        callback(err, result);
    });
};

var mongoose = require('mongoose');
module.exports = function(){
    var Servicos = mongoose.model('Servicos',{
        cidadeorigem: String,
        pontobusca: String,
        rua: String,
        bairro:String,
        cidade: String,
        numero: Number,
        cep: String,
        contratante: String,
        nomecont : String,
        nomeusu: String,
        contratado: String,
        carga: String,
        medida: String,
        quantidade: Number,
        valor: Number,
        status: String,
        situacao: String,
        previsaoentrega: Date,
        nota: Number,
        comentario: String
    });
    return new ServicosDAO(Servicos);
};
