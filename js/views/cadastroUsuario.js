$(document).ready(()=>{
    $('#btn_criar_usuario').on('click', ()=>{
        let user = $('#usuario').val();
        let password = $('#password').val();
        let conf_password = $('#conf_password').val();
        let bloco = $('#usuario').closest('.bloco');

        bloco.removeClass('warn');
        $('.cadastro .form .item-form.warn').removeClass('warn');

        let msg = 'Este campo não pode estar vazio!';
        if(user.length == 0 || password.length == 0 || conf_password.length == 0){
            if(user.length == 0)
                formInputError($('#usuario').closest('.item-form'),msg);
            if(password.length == 0)
                formInputError($('#password').closest('.item-form'),msg);
            if(conf_password.length == 0)
                formInputError($('#conf_password').closest('.item-form'),msg);
            return false;
        }else if(password != conf_password){
            msg = 'As senhas precisam ser iguais';
            formInputError($('#password').closest('.item-form'),msg);
            formInputError($('#conf_password').closest('.item-form'),msg);
            return false;
        }

        let valid = verificarUser(user);
        if(valid.status) adicionarUsuario(user,password);
        else blocoError(bloco,valid.msg);
    });
});

function adicionarUsuario(user,password) {
    let users = getStorageUser();
    let newUser = { user:user, password:password, hash:'' };
    if(!users) users = [];

    users.push(newUser);
    setStorageUser(users);
    $('#usuario').val('');
    $('#password').val('');
    $('#conf_password').val('');
    blocoError($('#usuario').closest('.bloco'),'Usuário cadastrado com sucesso!')
}