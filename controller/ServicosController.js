var promise = require('bluebird');

function ServicosController(ServicosModel){
    this.model = promise.promisifyAll(ServicosModel);
};

ServicosController.prototype.create = function(req, res, next){
    var body = req.body;
    this.model.createAsync(body)
        .then(function(data){
            res.render('painel', {logado: req.user});
        })
        .catch(next);
};

/* Teste de serviços */
ServicosController.prototype.getAll = function(req, res, next){
    this.model.findAsync({})
        .then(function(data){
            res.render('listPed', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos finalizados do usuario logado transportador */
ServicosController.prototype.getAllServicesById = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratado:_id, situacao: 'Finalizado'})
        .then(function(data){
            res.render('listPed', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos Para confirmar do usuario logado transportador*/
ServicosController.prototype.getUnconfirmedServices = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratado:_id, situacao: 'A confirmar'})
        .then(function(data){
            res.render('listPed', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos em andamento do usuario logado transportador*/
ServicosController.prototype.getInTransit = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratado:_id, situacao: 'Em andamento'})
        .then(function(data){
            res.render('listPedAnd', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos finalizados do usuario logado usuario */
ServicosController.prototype.getAllServicesByIdUser = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratante:_id, situacao: 'Finalizado'})
        .then(function(data){
            res.render('listPed', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos Para confirmar do usuario logado usuario*/
ServicosController.prototype.getUnconfirmedServicesUser = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratante:_id, situacao: 'A confirmar'})
        .then(function(data){
            res.render('listPed', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos em andamento do usuario logado usuario*/
ServicosController.prototype.getInTransitUser = function(req, res, next){
    var _id = req.user._id;
    this.model.findAsync({contratante:_id, situacao: 'Em andamento'})
        .then(function(data){
            res.render('listPedAnd', {pedidos: data, logado: req.user});
        })
        .catch(next);
};

/* Pedidos em detalhes */
ServicosController.prototype.getById = function(req, res, next){
    var _id = req.params._id;
    var usu = req.user._id;
    this.model.findOneAsync(_id)
        .then(function(data){
            if(data.contratado == usu){
                res.render('pedidoviewforusu', {pedido: data, logado: req.user});
            }else if(data.contratado != usu){
                res.render('pedidoview', {pedido: data, logado: req.user});
            }
        })
        .catch(next);
};

ServicosController.prototype.update = function(req, res, next){
    var _id = req.params._id;
    var body = req.body;
    this.model.updateAsync(_id, body)
        .then(function(data){
            res.json(data);
        })
        .catch(next);
};

/* Mudar status do serviço */
ServicosController.prototype.updateStatus = function(req, res, next){
    var _id = req.body._idP;
    var status = req.body.status;
    this.model.updateAsync(_id, {status: status})
        .then(function(data){
            res.redirect('/service/ordenado');
        })
        .catch(next);
};

/* Mudar situação do serviço */
ServicosController.prototype.updateServico = function(req, res, next){
    var _id = req.params._id;
    this.model.updateAsync(_id, {situacao: 'Em andamento'})
        .then(function(data){
            res.redirect('/service/ordenado');
        })
        .catch(next);
};

/* Mudar previsão de entrega */
ServicosController.prototype.updatePrevisao = function(req, res, next){
    var _id = req.body._id;
    var previsao = req.body.previsaoentrega;
    this.model.updateAsync(_id, {previsaoentrega: previsao})
        .then(function(data){
            res.json(data);
        })
        .catch(next);
};

ServicosController.prototype.finalizaServico = function(req, res, next){
    var _id = req.params._id;
    this.model.updateAsync(_id, {situacao: 'Finalizado'})
        .then(function(data){
            res.redirect('/service/ordenados');
        })
        .catch(next);
};

ServicosController.prototype.remove = function(req, res, next){
    var _id = req.body._id;
    this.model.removeAsync(_id)
        .then(function(data){
            res.json(data);
        })
        .catch(next);
};

module.exports = function(ServicosModel){
    return new ServicosController(ServicosModel);
};