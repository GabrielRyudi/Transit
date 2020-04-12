var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose');
var ServicosModel = require('../model/ServicosModel')(mongoose);
var ServicosController = require('../controller/ServicosController')(ServicosModel);

var {ensureAuthenticate} = require('../config/auth');

router.get('/', (req, res, next) => {
    res.render('home');
});

/* Painel do usuario */
router.get('/painel', ensureAuthenticate, ServicosController.getInTransit.bind(ServicosController));

/* Teste de serviços */
router.get('/servicos', ensureAuthenticate, ServicosController.getAll.bind(ServicosController));

/* Mudar situacao do serviço Em andamento*/
router.get('/updateAceito/:_id', ensureAuthenticate, ServicosController.updateServico.bind(ServicosController));

/* Mudar situacao do serviço Finalizado*/
router.get('/updateFinaliza/:_id', ensureAuthenticate, ServicosController.finalizaServico.bind(ServicosController));

/* Pedidos finalizados do usuario logado */
router.get('/finalizados', ensureAuthenticate, ServicosController.getAllServicesById.bind(ServicosController));

/* Pedidos Para confirmar do usuario logado */
router.get('/caixa', ensureAuthenticate, ServicosController.getUnconfirmedServices.bind(ServicosController));

/* Pedidos em andamento do usuario logado */
router.get('/ordenado', ensureAuthenticate, ServicosController.getInTransit.bind(ServicosController));

/* Pedidos finalizados do usuario logado usuario normal */
router.get('/completos', ensureAuthenticate, ServicosController.getAllServicesByIdUser.bind(ServicosController));

/* Pedidos Para confirmar do usuario logado normal */
router.get('/espera', ensureAuthenticate, ServicosController.getUnconfirmedServicesUser.bind(ServicosController));

/* Pedidos em andamento do usuario logado normal */
router.get('/transitando', ensureAuthenticate, ServicosController.getInTransitUser.bind(ServicosController));

/* Pedido */
router.get('/:_id', ensureAuthenticate, ServicosController.getById.bind(ServicosController));

/* Realizar o pedido */
router.post('/pedido', ensureAuthenticate, ServicosController.create.bind(ServicosController));

/* Update do pedido*/
router.put('/update', ensureAuthenticate, ServicosController.update.bind(ServicosController));

/* Mudar status do serviço */
router.put('/updateStatus', ensureAuthenticate, ServicosController.updateStatus.bind(ServicosController));

/* Mudar status do serviço */
router.put('/updatePrevision', ensureAuthenticate, ServicosController.updatePrevisao.bind(ServicosController));

router.delete('/delete/:_id', ensureAuthenticate, ServicosController.remove.bind(ServicosController));

module.exports = router;
