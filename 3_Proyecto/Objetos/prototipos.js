/*
    1. Crear un objeto que sea burgosEnero
    2. Propiedades Mes y fecha de salida
    3. Heredar propiedades de viaje 
*/
// CONTRUCTORES VIAJE - CLIENTE - BURGOSENERO

    function Viaje(origen, destino, duracion, pais, precio) {
    this.origen = origen;
    this.destino = destino;
    this.duracion = duracion;
    this.pais = pais;
    this.precio = precio;
}


function BurgosEnero(mes, fecha){
    this.fecha = fecha;
    this.mes = mes;
}

function Cliente(nombre, apellido, ciudad, telefono, miViaje) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.ciudad = ciudad;
    this.telefono = telefono;
    this.miViaje = miViaje;
    this.contratado = function() {
        if(miViaje == ""){
            return "No tienes viaje asignado";
        }else{
            return miViaje;
        }
    };
}


// Objetos almacenados ena array

    const irlanda = new Viaje("Madrid", "irlanda","10 dias", "irlanda", 60);
    const berlin = new Viaje("Madrid", "berlin", "16 días", "Alemania", 70);
    const mallorca = new Viaje("Madrid", "mallorca", "8 días", "España", 80);
    const francia = new Viaje("Madrid", "francia", "7 días", "francia", 90);
    
    
    const javier = new Cliente("javier", "Pedrosa", "Madrid", "666666666", irlanda);
    const daniel = new Cliente("daniel", "Perez", "Madrid", "777777777", berlin);
    const ruben = new Cliente("ruben", "Vivar", "Madrid", "888888888", mallorca);
    const iker = new Cliente("iker", "Merino", "Madrid", "999999999", francia);
    const patricia = new Cliente("iker", "Merino", "Madrid", "999999999", null);

    
// NUEVOS OBJETOS
const roma = new Viaje("Madrid", "Roma", "5 dias", "roma", 56);
const pepe = new Cliente("Pepe", "Rodriguez", "Madrid", "222222222", roma);

    
    // ARRAY CLIENTES
    const clientes = [javier, daniel, ruben, iker, patricia, pepe];
    // ARRAY - VIAJES
    const viajes = [irlanda, berlin, mallorca, francia, roma];



// AGENCIA - DIRECCION
const direction2 = {
    calle: "Calle Gran Via",
    numero: 2,
    piso: 1
}

const agencia = {
    nif: "45925646s",
    telefono: 666666666,
    direccion: direction2,
    dirCompleta: function(){
        return `La calle ${this.direccion.calle}, numero ${this.direccion.numero} y con piso ${this.direccion.piso}`;
    }
}




// HEREDAR PROPIEDADES 
// burgosEnero.__proto__=burgos;
roma.__proto__=agencia;

viajes.forEach(viaje => {
    viaje.__proto__=agencia;
    console.log("El viaje " + viaje.destino + " tiene la agencia como telefono " +viaje.telefono);
});

console.log("---------");

clientes.forEach(cliente => { 
    
        viajes.forEach(viaje => {
    
        if(cliente.miViaje === viaje ){
            cliente.__proto__=viaje;
            console.log(cliente);
        } 
    });
});

console.log("---------");

// PRUEBAS
console.log(roma.telefono);
console.log(roma.dirCompleta());

// FACTURA

// 1 Prototipar ARRAY cliente con viajes (ASEGURARE QUE TENGAN VIAJES)
clientes.forEach(cliente => { 
 
    viajes.forEach(viaje => {

    if(cliente.miViaje === viaje ){
        cliente.__proto__=viaje;
        console.log(cliente);
    } 
});
});
// 2 Prototipar ARRAY viaje con agencia

viajes.forEach(viaje => {
    viaje.__proto__=agencia;
    
});

// Imprimri
viajes.forEach(viaje => {
    
 clientes.forEach(cliente => {
    
        if(cliente.miViaje===viaje){
            console.log("Cliente: " + cliente.nombre + "\nViaje: " + cliente.destino + 
                        "\nNIF: " + viaje.nif + "\nTelefono: " + viaje.telefono + 
                        "\nDireccion: " + viaje.direccion + "\nPrecio: " + cliente.precio +
                        "\nOrigen: " + cliente.destino + "\nDestino: " + cliente.origen);
        }
    });
});



