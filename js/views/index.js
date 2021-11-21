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

    $('.btn-list-bloco').on('click', '.card-mini-btn', function (e) {
        $(this).closest('.card-mini-produto').css('display','none');
    })
})