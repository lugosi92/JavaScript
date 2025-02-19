
function Cliente(nombre, apellido, origen, telefono, viaje){
    this.nombre = nombre;
    this.apellido = apellido;
    this.origen = origen;
    this.telefono = telefono;
    this.viaje = viaje;
}


function Viaje(origen, destino, duracion, pais, precio) {
    this.origen = origen;
    this.destino = destino;
    this.duracion = duracion;
    this.pais = pais;
    this.precio = precio;
}

const napoles = new Viaje("Madrid", "Napoles", "17 dias", "Italia", 87);
napoles.disponibilidad = true;
const tanger = new Viaje("Madrid", "Tanger", "45 dias", "Marruecos", 45);
tanger.disponibilidad = false;
const munich = new Viaje("Madrid", "Munich", "56 dias", "Alemania", 67);
munich.disponibilidad = true;
const dalaman = new Viaje("Madrid", "Dalaman", "34 dias", "Turquia", 123);
dalaman.disponibilidad = false;

const viajes = [napoles, tanger, munich, dalaman];

const javier = new Cliente("Javier", "Pedrosa", "Madrid", "666666666", napoles);
const daniel = new Cliente("Daniel", "Perez", "Madrid", "777777777", tanger);
const ruben = new Cliente("Ruben", "Vivar", "Madrid", "888888888", munich);
const iker = new Cliente("Iker", "Merino", "Madrid", "999999999", dalaman);
const mario = new Cliente("Mario", "Barrio", "Madrid", "999999999", null);
const juan = new Cliente("Juan", "Prieto", "Valencia", "123456789", null);

const clientes = [javier, daniel, ruben, iker, mario, juan];

//-------------------------------------EJERCICIO 1---------------------------------------------//

console.log("-----1------");
/*Crear un nuevo cliente y asignarle un viaje:

Crea un cliente llamado "Lucía Rodríguez" de "Valencia", con el número de teléfono "123456789".
Asigna el viaje a "Mallorca" a Lucía y muestra en consola sus datos completos.*/

const mallorca = new Viaje("Valencia", "Mallorca", "10 dias", "España", 68);
const lucia = new Cliente("Lucia", "Rodriguez", "Valencia", "123456789", mallorca);

console.log(lucia);

//-------------------------------------EJERCICIO 2---------------------------------------------//

console.log("-----2------");
/*Modificar precios de viajes con descuento:

Crea una función que reciba un array de viajes y un descuento (por ejemplo, 10%).
Aplica el descuento a todos los precios y devuelve un nuevo array con los precios actualizados*/

function descuentos(array, descuento){


    array.forEach(viaje => {
        let descuentoFinal = viaje.precio * descuento;
        let precioFinal = viaje.precio - descuentoFinal;
        viaje.precio = parseFloat(precioFinal.toFixed(2));
    });
    console.log(array);
    
}

descuentos(viajes, 0.1);

//-------------------------------------EJERCICIO 3---------------------------------------------//

console.log("-----3------");
/*Filtrar clientes sin viaje:

Usa el array clientes para filtrar y mostrar en consola solo los clientes que no tienen viaje asignado.*/

console.log(clientes.filter(cliente => cliente.viaje === null));


//-------------------------------------EJERCICIO 4---------------------------------------------//

console.log("-----4------");
/*Calcular el precio total de viajes con descuentos:

Calcula la cantidad total gastada por los clientes, incluyendo un 15% de descuento aplicado a los precios de los viajes.*/

descuentos(viajes, 0.05);

const canTotal = viajes.reduce((acumulador, viaje) => acumulador + viaje.precio, 0);
console.log(canTotal);

//-------------------------------------EJERCICIO 5---------------------------------------------//

console.log("-----5------");
/*Buscar un viaje por destino:

Escribe una función que reciba un array de viajes y un destino como parámetros.
Devuelve el objeto del viaje que coincida con ese destino o un mensaje si no existe.*/

function buscarViaje(array, destino){

    return  array.find(viaje => viaje.destino == destino);
     
}

console.log(buscarViaje(viajes,"Napoles"));

//-------------------------------------EJERCICIO 6---------------------------------------------//

console.log("-----6-----");
/*Añadir una propiedad "disponibilidad" a los viajes:

Agrega una propiedad disponibilidad (true/false) a cada viaje.
Crea una función que reciba un array de viajes y devuelva solo los que estén disponibles.*/


function disponibles(array){
    return array.filter(viaje => viaje.disponibilidad == true);
}

console.log(disponibles(viajes));



//-------------------------------------EJERCICIO 7---------------------------------------------//

console.log("-----7-----");
/*Ordenar los viajes por precio:

Crea una función que reciba un array de viajes y los ordene de menor a mayor precio.
*/
function ordPrecio(array){
    return array.sort((a, b) =>  a.precio - b.precio);
}

console.log(ordPrecio(viajes));

