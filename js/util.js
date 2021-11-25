console.log('aqui util');

function notifyUser(msg, title = 'Titulo', type = 'warn') {
    console.error(msg);
    // Swal.fire({
    //     title: title,
    //     text: msg,
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Save',
    //     denyButtonText: `Don't save`,
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         Swal.fire('Saved!', '', 'success')
    //     } else if (result.isDenied) {
    //         Swal.fire('Changes are not saved', '', 'info')
    //     }
    // });
}

function formInputError(element, msg) {
    element.addClass('warn');
    element.find('.form-input-error').text(msg);
}

function montarBlocos(element) {
    $.each(lists, (i,v)=>{
        let listCard = createListCard(v.class, v.info);
        let callbackUtil = (obj)=>{
            listCard.find('.list-cards').append(
                createCardMiniProduto(obj)
            )
        };
        $.each(listProduto,(j,e)=>{
            if(v.class != 'all'){
                if(e.status && e.status == v.class){
                    callbackUtil(e);
                }
            }else{
                if(e.status){
                    switch (e.status) {
                        case 'novo':
                        case 'promo':
                        break;
                        default:
                            callbackUtil(e);
                        break;
                    }
                }else{
                    callbackUtil(e);
                }
            }
        });
        element.append( listCard );
    });
}

function blocoError(element, msg) {
    blocoMsg(element, msg, 'warn');
}

function blocoSuccess(element, msg) {
    blocoMsg(element, msg, 'success');
}

function blocoMsg(element, msg, className) {
    element.addClass(className);
    element.children('.bloco-msg').text(msg);
}

function createListCard(className = '', info = false) {
    let html = $('<div>', {class:`list-card ${className}`});
    if(info){
        html.append(
            $('<div>', {class:'list-card-info not-sel'}).append( info )
        );
    }

    html.append(
        $('<div>', {class:'list-card-overflow'}).append(
            $('<div>', {class:'list-cards'})    
        )
    );
    return html;
}

function createCardMiniProduto(obj) {
    let aux = {
        tag: ( obj.tag ? obj.tag : false ),
        img: ( obj.img ? obj.img : '../img/caloi_eletrica.png' ),
        preco: ( obj.preco ? obj.preco : 'R$ 100,00' ),
        precoParcelado: ( obj.precoParcelado ? obj.precoParcelado : 'x10 R$ 10,00 sem juros' ),
        info: ( obj.info ? obj.info : 'Bicicleta Aro 26" com freio a disco hidraulico e suspenção a ar' ),
        titleBtn: ( obj.titleBtn ? obj.titleBtn : false ),
        textBtn: ( obj.textBtn ? obj.textBtn : 'Adicionar ao carrinho' ),
    };
    console.log(obj);
    return $('<div>', {class:'card-mini-produto bloco'}).append(
        $('<div>', {class:'card-mini-tag not-sel', text:aux.tag})
    ).append(
        $('<div>', {class:'card-mini-img not-sel'}).append(
            $('<img>', {src:aux.img})
        )
    ).append(
        $('<div>', {class:'card-mini-preco'}).append(
            $('<div>', {class:'card-mini-preco-total', text:aux.preco})
        ).append(
            'em'
        ).append(
            $('<div>', {class:'card-mini-preco-parcelado', text:aux.precoParcelado})
        )
    ).append(
        $('<div>', {class:'card-mini-info'}).append( aux.info )
    ).append(
        $('<div>', {class:'card-mini-btn not-sel', title:aux.titleBtn}).append(
            $('<button>').append(
                $('<i>', {class:'fa fa-cart-plus'})
            )
            .append( aux.textBtn )
            .on('click', function (e) {
                let currentUser = getStorageUserByHash(getHashSession());
                console.log('click do carrinho');
                // console.log(getStorageUserByHash(getHashSession()));
                addItemCarrinho(currentUser.user, obj.id_produto);
                // $(this).closest('.card-mini-produto').css('display','none');
            })
        )
    )
    .on('click', function (e) {
        //IGNORANDO CLICK DO BTN DO CARD
        if($(e.target).closest('.card-mini-btn').length === 0){
            // console.log('currentObj',obj);
            $('.page-body').removeClass('produto').addClass('load');
            //SIMULANDO O TEMPO DE UMA REQUISIÇÃO ASSINCRONA
            setTimeout(() => {
                exibirDetalheProduto(obj);
            }, 500);
        }
    });
}

function exibirDetalheProduto(produto) {
    console.log('createDetalheCardProduto',produto);
    // $('.page-body').text('');
    // $('.page-body').append(
    //     $('<div>',{class:''})
    // );

    $('.page-body')
    .removeClass('load')
    .addClass('produto');
}

/* 
Terminar o css do menu superior das paginas

1° Criar uma estrutura para salvar os produtos disponiveis
    1.1° Criar uma função para criar um produto 
    ( 
        id_produto, 
        nome, 
        img, 
        qtd, 
        precoUnitario,
        status ( novidade, promocao, comum ),
        descricao,
        expecificacoes ( salvar em obj para que possa ser customizado )
    )
2° Criar uma estrutura para vincular uma determinada quantidade de produtos a um cliente
    2.1° Criar uma função para criar um carrinho ( 
        id_carrinho, 
        id_cliente(pode ser indefinido), 
        id_produto, 
        qtd, 
        status ( aberto, fechado (Obrigatoriamente precisa de uma cliente) ) 
    )
3° Criar uma estrutura para salvar o carrinho de uma cliente com os produtos que o cliente ainda não comprou
4° Criar uma função que mostra a quantidade de produtos restantes. ( comparando a quantidade dos produtos com os carrinhos dos clientes )
5° Criar uma estrutura para salvar as compras de um cliente
    5.1° Criar funções para manipular o historio de compras dos clientes ( id_carrinho, data_compra, tipo_pagamento )
9° Criar uma função para criar o html do carrinho
10° Criar uma função para criar o html do produtos sepadados por seus status
11° Criar uma função que consulta o localstorage e retorna os produtos separados por status
12° Criar uma função para consultar o carrinho de um cliente e mostrar na tela

*/