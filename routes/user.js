var express = require('express');
var mongoose = require('../db/mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var User = require('../model/User');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

/* Pagina de login */
router.get('/login', (req, res, next) =>{
    res.render('login');
});

/* Pagina de registro */
router.get('/register', (req, res, next)=>{
    res.render('register');
});

/* Pagina de buscas */
router.get('/buscas', ensureAuthenticate, (req, res, next) => {
    res.render('buscar', {users: [], logado: req.user});
});

/* Rota para buscar por nome */
router.post('/buscas', ensureAuthenticate, (req, res, next) => {
    var name = req.body.name;
    User.find({name: /name$/, disponible: 'Sim'}, {password: 0, cpf: 0})
        .then(user =>{
            res.render('buscar', {users: user, logado: req.user});
        })
        .catch(next);
});

/* Rota para buscar por categoria */
router.post('/disponiveis', ensureAuthenticate, (req, res, next) => {
    var cidade = req.body.city;
    User.find({city: cidade, disponible: 'Sim'}, {password: 0, cpf:0})
        .then(user =>{
            res.render('buscar', {users: user, logado: req.user});
        })
        .catch(next);
});

/* Rota para pagina do usuário */
router.get('/perfil', ensureAuthenticate, (req, res, next) => {
    var _id = req.user._id;
    User.findOne({_id:_id}, {password: 0})
        .then(user => {
            res.render('editar',{user: user, logado: req.user});
        })
        .catch(next);
});

/* Rota para perfil de outros usuarios */
router.get('/usuario/:_id', ensureAuthenticate, (req, res, next) => {
    var _id = req.params._id;
    User.findOne({_id:_id})
        .then(user => {
            if(_id == req.user._id){
                if(user.disponible == 'Sim'){
                    var desativado = 'desativo';
                }
                res.render('perfil_log', {user: user, logado: req.user, dec: desativado})
            }else{
                res.render('perfil',{user: user, logado: req.user});    
            }
        })
        .catch(next);
});

/* Rota para pedido */
router.get('/pedido/:_id', ensureAuthenticate, (req, res, next) => {
    var _id = req.params._id;
    User.findOne({_id:_id})
        .then(user => {
            res.render('pedido', {user: user, logado: req.user});
        })
        .catch(next);
});

router.post('/register', (req, res, next) => {
    var {name, email, password, age, typo, disponible, rate, eula, cpf} = req.body;
    let errors = [];
    if(!eula || eula != 'concordo'){
        errors.push({msg: 'Por favor aceite os termos de uso!'});
    }
    if(!name || !email || !password || !age || !typo || !disponible || !rate || !cpf){
        errors.push({msg: 'Please fill in all fields'});
    }
    if(password.length < 9){
        errors.push({msg: 'Password should be at least 9 characters'});
    }
    if(errors.length > 0){
        res.render('register', {errors,name, email, password});
    }else{
        User.findOne({email:email})
            .then(user => {
                if(user){
                    errors.push({msg:'Email is already registred'});
                    res.render('register', {errors});
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password,
                        age,
                        typo,
                        disponible,
                        rate,
                        eula,
                        cpf
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser. password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are registered into the system');
                                    res.redirect('/user/login');
                                })
                                .catch(err => console.log(err));
                        })
                    );
                }
            });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('sucess_msg', 'You are logged out');
    res.redirect('/user/login');
});

router.put('/update', ensureAuthenticate, (req, res, next) => {
    var _id = req.body._id;
    var {name, email, age, typo, city, price, description, curriculum, phone, facebook, linkedin} = req.body;
    User.updateOne({_id:_id},{name:name, email:email, age:age, typo:typo, city:city, price:price, description:description, curriculum:curriculum, phone: phone, facebook: facebook, linkedin: linkedin})
        .then(user => {
            req.flash('success_msg', 'Perfil atualizado com sucesso');
            res.redirect('/user/usuario/'+_id);
        })
        .catch(next);
});

router.get('/passwordEdit', ensureAuthenticate, (req, res, next) => {
    res.render('senha', {logado: req.user});
});

/* Editar a senha */
router.put('/passwordEdit', (req, res, next) => {
    var senha = req.body.senha;
    var _id = req.user._id;
    let errors = [];
    if(senha.length < 9){
        errors.push({msg: 'Password should be at least 9 characters'});
    }
    if(errors.length > 0){
        res.render('senha', {errors});
    }else{
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(senha, salt, (err, hash) => {
                if(err) throw err;
                senha = hash;
                User.updateOne({_id:_id},{password:senha})
                    .then(user => {
                        req.flash('success_msg', 'Perfil atualizado com sucesso');
                        res.redirect('/user/usuario/'+_id);
                    })
                    .catch(err => console.log(err));
            })
        );
    }
});

router.put('/rate', ensureAuthenticate, (req, res, next) => {
    var _id = req.body._id;
    var rate = req.body.rating;
    User.updateOne({_id:_id}, {rate: rate})
        .then(user => {
            res.redirect('/#');
        })
});

router.get('/active', ensureAuthenticate, (req, res, next) => {
    var _id = req.user._id;
    User.updateOne({_id:_id}, {disponible: 'Sim'})
        .then(user => {
            res.redirect('/#');
        })
});

router.delete('/:_id', ensureAuthenticate, (req, res, next) => {
    var _id = req.params._id;
    User.remove({_id:_id})
        .then(user => {
            res.send('deleted');
        })
        .catch(next);
});

module.exports = router;