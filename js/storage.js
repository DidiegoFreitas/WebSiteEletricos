let dicTables = {
    user:'users',
    carrinho:'car',
    hash:'currentHash',
};
let templateCar = {
    idCar: 0,
    cliente: '',
    idProd: 0,
    qtd: 0,
    status: '',
}

function setStorageUser(newData) {
    window.localStorage.setItem('users', JSON.stringify(newData));
}

function addItemCarrinho(cliente,idProd) {
    let car = getStorageCarByCliente(cliente);
    let addNewCar = ()=>{
        let newCar = JSON.parse( JSON.stringify(templateCar) );
        newCar.idCar = getLastIdCar();
        newCar.cliente = cliente;
        newCar.idProd = idProd;
        newCar.qtd = 1;
        newCar.status = 'aberto';
        addStorageCar(newCar);
    }

    if(Object.keys(car).length > 0){
        if(car.status == 'aberto'){
            if(car.idProd == idProd){
                //somar qtd
                car.qtd += 1;
                updateStorageCarById(car.idCar,car);
            }else{
                console.warn('Falta implementar esta logica')
                //add new prod
                // let newCar = JSON.parse( JSON.stringify(templateCar) );
                // newCar.idCar = getLastIdCar();
                // newCar.cliente = cliente;
                // newCar.idProd = idProd;
                // newCar.qtd = 1;
                // newCar.status = 'aberto';
                // addStorageCar(newCar);
            }
        }else{
            //add new car
            addNewCar();
        }
    }else{
        addNewCar();
    }
}
function removeItemCarrinho(idCar, idProd, cliente) {
    //verificar o status do carrinho
}

function getStorageCar() {
    return JSON.parse(window.localStorage.getItem(dicTables.carrinho));
}

function addStorageCar(newCar) {
    let cars = getStorageCar();
    if(cars) cars.push(newCar);
    else cars = [newCar];

    window.localStorage.setItem(dicTables.carrinho, JSON.stringify(auxStorage));
}

function updateStorageCarById(idCar, updateCar) {
    let res = { status:false, msg:'Carrinho não encontrado!' };
    let cars = getStorageCar();
    let auxStorage = [];
    if(cars){
        $.each(cars, (i,car)=>{
            if(car.idCar == idCar){
                res.status = true;
                res.msg = '';
                auxStorage.push(updateCar);
            } else auxStorage.push(car);
        });
    }
    window.localStorage.setItem(dicTables.carrinho, JSON.stringify(auxStorage));
    return res;
}

function getStorageCarById(idCar) {
    let res = {};
    let car = getStorageCar();
    if(car){
        $.each(car, (i,item)=>{
            if(item.idCar == idCar)
                res = item;
        });
    }
    return res;
}

function getStorageCarByCliente(cliente) {
    let res = {};
    let cars = getStorageCar();
    if(cars){
        $.each(cars, (i,car)=>{
            if(car.cliente == cliente)
                res = car;
        });
    }
    return res;
}
function getLastIdCar() {
    let lastId = 0;
    let cars = getStorageCar();
    if(cars){
        $.each(cars, (i,car)=>{
            if(car.idCar > lastId)
                lastId = car.idCar;
        });
    }
    return (lastId + 1);
}

function updateStorageUserByUser(user, updateUser) {
    let res = { status:false, msg:'Usuário não encontrado!' };
    let currentUsers = getStorageUser();
    let auxStorage = [];
    if(currentUsers){
        $.each(currentUsers, (i,currentUser)=>{
            if(currentUser.user == user){
                res.status = true;
                res.msg = '';
                auxStorage.push(updateUser);
            } else auxStorage.push(currentUser);
        });
    }
    window.localStorage.setItem('users', JSON.stringify(auxStorage));
    setHashSession(updateUser.hash);
    return res;
}

function getStorageUser() {
    return JSON.parse(window.localStorage.getItem(dicTables.user));
}

function getStorageUserByUser(user) {
    let res = {};
    let currentUsers = getStorageUser();
    if(currentUsers){
        $.each(currentUsers, (i,currentUser)=>{
            if(currentUser.user == user)
                res = currentUser;
        });
    }
    return res;
}

function getStorageUserByHash(hash) {
    let res = {};
    let currentUsers = getStorageUser();
    if(currentUsers){
        $.each(currentUsers, (i,currentUser)=>{
            if(currentUser.hash == hash)
                res = currentUser;
        });
    }
    return res;
}

function setHashSession(currentHash) {
    window.sessionStorage.setItem(dicTables.hash, currentHash);
}

function getHashSession() {
    return window.sessionStorage.getItem(dicTables.hash);
}
