$(document).ready(function () {
    $('#cpf').cpfcnpj({
        validate: 'cpfcnpj',
        event: 'blur',
        handler: '#cpf',
        ifValid: function (input) {
            input.removeClass("errinho");
            $('.btn-login').prop('disabled', false)
        },
        ifInvalid: function (input) { 
            input.addClass("errinho");
            alert('Cpf inválido!');
            $('.btn-login').prop('disabled', true)
        }
    });

    $('.cellphone').mask('(00) 00000-0000');

    $('#senha2').keyup(function () { 
        var senha = $('#senha ').val();
        var senha2 = $('#senha2').val();
        if(senha2 != senha){
            $('#senha2').addClass('errinho');
            $('#aviso').empty();
            $('#aviso').append('As senhas não são correspondem!');
            $('#aviso').addClass('avisoErro');
        }else if(senha2 == senha){
            $('#senha2').addClass('certo');
            $('#aviso').empty();
            $('#aviso').append('As senhas são iguais');
            $('#aviso').addClass('avisoCerto');
            $('.btn-senha').prop('disabled', false);
        }
    });

    $('#password2').keyup(function () { 
        var ps = $('#password').val();
        var ps2 = $('#password2').val();
        if(ps2 != ps){
            $('#password2').addClass('errinho');
            $('#aviso').empty();
            $('#aviso').append('As senhas não são correspondem!');
            $('#aviso').addClass('avisoErro');
        }else if(ps2 == ps){
            $('#password2').addClass('certo');
            $('#aviso').empty();
            $('#aviso').append('As senhas são iguais');
            $('#aviso').addClass('avisoCerto');
        }
    });

    var lista = $('#pendente tbody tr').length;
});

function eula(){
    $('.eula').toggle('clip');
}

function eulaFecha(){
    $('.eula').toggle('clip');
}

function pesquisas(){
    $('.pesquisa').toggle('slide');
}

function cidadebox(){
    $('#cidade-box').toggle('slide');
}

function nomebox(){
    $('#nome-box').toggle('slide');
}