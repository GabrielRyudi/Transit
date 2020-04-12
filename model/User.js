var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    typo: {
        type:String,
        require: true
    },
    disponible: {
        type:String,
        require: true
    },
    city: {
        type:String
    },
    price: {
        type: Number
    },
    description: {
        type:String
    },
    curriculum: {
        type:String
    },
    rate: {
        type: Number,
        require: true
    },
    eula: {
        type: String
    },
    cpf: {
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedin: {
        type: String
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;