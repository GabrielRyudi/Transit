var express = require('express');
var router = express.Router();
var {ensureAuthenticate} = require('../config/auth');

router.get('/', (req, res, next) => {
    res.render('login');
});

router.get('/dashboard', ensureAuthenticate, (req, res, next) => {res.render('dashboard', {logado: req.user});});

router.get('/contact', ensureAuthenticate, (req, res, next) => {res.send('contact');});

module.exports = router;