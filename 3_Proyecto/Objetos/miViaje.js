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


//----------------------------------INSTANCIAR------------------------------

    
const irlanda = new Viaje("Madrid", "irlanda","10 dias", "irlanda", 60);
const berlin = new Viaje("Madrid", "berlin", "16 días", "Alemania", 70);
const mallorca = new Viaje("Madrid", "mallorca", "8 días", "España", 80);
const francia = new Viaje("Madrid", "francia", "7 días", "francia", 90);

const javier = new Cliente("javier", "Pedrosa", "Madrid", "666666666", irlanda);
const daniel = new Cliente("daniel", "Perez", "Madrid", "777777777", berlin);
const ruben = new Cliente("ruben", "Vivar", "Madrid", "888888888", mallorca);
const iker = new Cliente("iker", "Merino", "Madrid", "999999999", francia);
const patricia = new Cliente("iker", "Merino", "Madrid", "999999999", null);
    
// Imprimir propiedades
for (const key in javier) {
    if (typeof javier[key] !== "function" && typeof javier[key] != "object") {
        console.log(key+ " es " + javier[key]);
    }
}

console.log("Viaje: " + javier.contratado());  
console.log("Duracion: " + javier.miViaje.duracion);



console.log("-----6------");

// ACAPON - DESCUENTO
Burgos.precio=(70);
Burgos.descuento=(0.2);
Burgos.precioFinal=(Burgos.precio - (Burgos.precio*Burgos.descuento));

console.log(Burgos.precioFinal);

// ARRAY CLIENTES
const clientes = [javier, daniel, ruben, iker, patricia];
console.log(clientes);
// ARRAY - VIAJES
const viajes = [irlanda, berlin, mallorca, francia];
console.log(viajes);

// QUE CLIENTES NO HAN CONTRATADO NINGUN VIAJE

clientes.forEach(cliente => {
    if(cliente.miViaje == null){
       console.log(cliente);
    }
});



// CANTIDAD TOTAL GASTADA EN VIAJES LOS CLIENTES


console.log(javier.miViaje.precio);
console.log(daniel.miViaje.precio);
console.log(ruben.miViaje.precio);
console.log(iker.miViaje.precio);

let precioTotal = 0;
clientes.forEach(cliente =>{

    if(cliente.miViaje == null){
        return "El cliente " + cliente + "no tiene viaje."
    }else{
        precioTotal += cliente.miViaje.precio;
    }
   
});

console.log("El precio total es " + precioTotal);

