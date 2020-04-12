var express = require('express');
var expressLayout = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var helmet = require('helmet');
var methodOverride = require('method-override');
require('./config/passport')(passport);
var app = express();

app.use(cors());
app.use(helmet());
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'Kublakan',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/service', require('./routes/servico'));

module.exports = app;