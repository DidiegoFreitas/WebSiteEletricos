$(document).ready(()=>{
    $('#btn_logar').on('click', ()=>{
        let user = $('#usuario').val();
        let password = $('#password').val();
        let bloco = $('#usuario').closest('.bloco');

        bloco.removeClass('warn');
        $('.login .form .item-form.warn').removeClass('warn');

        if(user.length == 0 || password.length == 0){
            let msg = 'Este campo não pode estar vazio!';
            if(user.length == 0)
                formInputError($('#usuario').closest('.item-form'),msg);
            if(password.length == 0)
                formInputError($('#password').closest('.item-form'),msg);
            return false;
        }

        let valid = verificarUserLogin(user, password);
        if(valid.status){
            valid.user.hash = gerarHash(user);
            let res = updateStorageUserByUser(user,valid.user);

            if(res.status) acessPage('index', valid.user.hash);
            else blocoError(bloco,valid.msg);
        } else blocoError(bloco,valid.msg);
    });
});
