$(document).ready(()=>{
    montarBlocos($('.page-body .body-principal'));

    $('.page-body').on('click', function () {
       //fechar as possiveis lista do bloco de cima que podem estar abertos
       $('body').find('.btn-list.active').removeClass('active');
    });

    $('.btn-list').on('click', function (e) {
        if($(e.target).closest('.btn-list-bloco').length === 0){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $('body').find('.btn-list.active').removeClass('active');
                $(this).addClass('active');
            }
        }
    });
    $('body').on('click', '.btn-voltar', function(){
        $('.page-body').removeClass('produto');
    });

    $('.btn-list-bloco').on('click', '.card-mini-btn', function (e) {
        $(this).closest('.card-mini-produto').css('display','none');
    });

    /* 
        Salvar as informações de carrinho no sessionStorage
        criar uma obj para disponibilizar as informações do usuario 
        sem precisar consultar o storage ou o session e ainda verificar
        se o usuario esta logado para usar o storage e nao o session
        caso contrario usar o session

        ex:
        var obj = {
            cli:{
                user:false,
                password:false,
                hash:false,
                car:[]
            },
            update: ()=>{
                let currentCli = obj.cli;

                if(currentCli.hash && currentCli.hash != ''){
                    //salvar no storage
                }else{
                    //salvar no session
                }
                return true;
            }
        }

    */
})