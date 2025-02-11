//----------------------------------CONSTRUCTOR------------------------------
// VIAJE
function Viaje(origen, destino, duracion, pais, precio) {
    this.origen = origen;
    this.destino = destino;
    this.duracion = duracion;
    this.pais = pais;
    this.precio = precio;
}

const Burgos = new Viaje("Madrid", "Burgos", "10 días", "España");

// CLIENTE
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


//----------------------------------INSTANCIAR------------------------------
const irlanda = new Viaje("Madrid", "irlanda","10 dias", "irlanda", 60);
const berlin = new Viaje("Madrid", "berlin", "16 días", "Alemania", 70);
const mallorca = new Viaje("Madrid", "mallorca", "8 días", "España", 80);
const francia = new Viaje("Madrid", "francia", "7 días", "francia", 90);
    
    
const javier = new Cliente("javier", "Pedrosa", "Madrid", "666666666", irlanda);
const daniel = new Cliente("daniel", "Perez", "Madrid", "777777777", berlin);
const ruben = new Cliente("ruben", "Vivar", "Madrid", "888888888", mallorca);
const iker = new Cliente("iker", "Merino", "Madrid", "999999999", francia);

 // ARRAY CLIENTES
 const clientes = [javier, daniel, ruben, iker];
 // ARRAY - VIAJES
 const viajes = [irlanda, berlin, mallorca, francia];

 // FACTURA

// 1 Prototipar ARRAY cliente con viajes (ASEGURARE QUE TENGAN VIAJES)
//javier.__proto__=irlanda;
//daniel.__proto__=berlin;
//.....
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