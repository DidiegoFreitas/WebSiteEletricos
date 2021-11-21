let dicWindows = {
    login:'/login.html',
    cadUser:'/cadastroUsuario.html',
    index:'/index.html',
};

verifySession();

window.onstorage = () => verifySession();

const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

function gerarHash(user) {
    return cyrb53(`${user}-${Date.now()}`);
}

function verifySession() {
    let url = new URL(window.location.href);
    let currentHash = url.searchParams.get("h");
    let pathname = window.location.pathname;
    let page = pathname.substring(pathname.lastIndexOf('/'));
    if(currentHash !== null){
        //SE O HASH EXISTIR
        if(Object.keys(getStorageUserByHash(currentHash)).length > 0){
            //SE O HASH É IGUAL O DA SESSAO
            if(currentHash == getHashSession()){
                //SE O PATHNAME É DIFERENTE DO INDEX
                if(page != `${dicWindows.index}`)
                    window.location = `.${dicWindows.index}?h=${currentHash}`;
            }
            else window.location = `.${dicWindows.login}`;
        }
        else window.location = `.${dicWindows.login}`;
    }else{
        //LIMITA O ACESSO SEM O HASH
        switch (page) {
            case `${dicWindows.login}`:
            case `${dicWindows.cadUser}`:
            break;
            default:
                window.location = `.${dicWindows.login}`;
            break;
        }
    }
}

function acessPage(page, hash = false) {
    if(hash) window.location = `./${page}.html?h=${hash}`;
    else{
        let url = new URL(window.location.href);
        let currentHash = url.searchParams.get("h");
        if(currentHash !== null){
            if(Object.keys(getStorageUserByHash(currentHash)).length > 0){
                window.location = `./${page}.html?h=${currentHash}`;
                return true;
            }
        }
        window.location = `.${dicWindows.login}`;
    }
}

function verificarUser(user) {
    let res = { status:true, msg:'Nenhum usuário cadastrado!' };
    let currentUsers = getStorageUser();
    if(currentUsers){
        let nEncontrado = true;
        $.each(currentUsers, (i,currentUser)=>{
            if(currentUser.user == user){
                nEncontrado = false;
                res.msg = 'Usuário já cadastrado!';
            }
        });
        if(nEncontrado){
            res.status = true;
            res.msg = '';
        } else res.status = nEncontrado;
    }
    return res;
}

function verificarUserLogin(user, password) {
    let res = { status:false, msg:'Nenhum usuário cadastrado!', user:{} };
    let currentUsers = getStorageUser();
    if(currentUsers){
        let nEncontrado = true;
        $.each(currentUsers, (i,currentUser)=>{
            if(currentUser.user == user){
                nEncontrado = false;
                if(currentUser.password == password){
                    res.status = true;
                    res.msg = '';
                    res.user = currentUser;
                }
                else res.msg = 'Usuário ou senha incorretos!';
            }
        });

        if(nEncontrado)
            res.msg = 'Usuário não encontrado!';
    }
    return res;
}