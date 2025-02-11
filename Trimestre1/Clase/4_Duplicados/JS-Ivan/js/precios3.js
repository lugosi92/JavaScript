// Array con los precios
let array = ["34,56€","78,90€","12,23€","89,23€","12,34€","3,99€"];
let precio_total = 0;
let precios = [];

// Solicitar nombre y dni
let nombre = prompt("Introduce tu nombre:");
document.getElementById("nombre").innerHTML = nombre;

let dni = prompt("Introduce el dni sin letra:");
document.getElementById("dni").innerHTML = dni + calcularLetraDNI(dni);

let cantProd = 0; //Declaramos variable para el conteo 
// Recorremos el array para modificar los precios
array.forEach(element => {
    let value = element.replace('€', '');   
    value = value.replace(',', '.');        
    let valorNumerico = parseFloat(value);  
    precios.push(valorNumerico);           
    precio_total += valorNumerico;          
    cantProd++;

});
console.log(cantProd);

// Función que calcula el descuento si hay 5 o más productos
function aplicarDescuento(precios) {
    let descuento = 0; // Variable para el descuento
    if (precios.length >= 5) {
        let precioMasBarato = Math.min(...precios); // Precio más barato
        descuento = precioMasBarato;
        precio_total -= descuento;  // Restar el descuento al total
        document.getElementById("descuento").innerHTML = "Descuento de: " + precioMasBarato.toFixed(2).replace(".", ",") + "€ por el artículo más barato.";
    } else {
        document.getElementById("descuento").innerHTML = "No hay descuento aplicable.";
    }
    return descuento; // Retorna el descuento si es necesario
}

// Función para calcular la letra del DNI
function calcularLetraDNI(dni) {
    // Tabla de letras asociadas al resto de la división por 23
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    // Comprobar que el DNI es un string de 8 o 9 caracteres
    if (dni.length !== 8 && dni.length !== 9) {
        return "DNI inválido. Debe tener 8 dígitos o 8 dígitos más una letra.";
    }

    // Si tiene 8 caracteres, calcular la letra
    if (dni.length === 8) {
        let numeroDNI = parseInt(dni);  
        let resto = numeroDNI % 23;
        let letra = letras[resto];
        return letra;  
    }

    // Si tiene 9 caracteres, verificamos
    if (dni.length === 9) {
        let numeroDNI = parseInt(dni);  
        let letraDNI = dni[8]; 
        let resto = numeroDNI % 23;
        let letraCorrecta = letras[resto];

        // Comparamos la letra calculada con la proporcionada
        if (letraDNI === letraCorrecta) {
            return "DNI Correcto";
        } else {
            return "DNI Incorrecto";
        }
    }
}


// La fecha y hora actual
let fechaHora = new Date().toLocaleString();
// Mostrar la fecha y hora
document.getElementById("fecha_actual").innerHTML = fechaHora;

// Mostrar los precios
document.getElementById("p1").innerHTML = array[0];
document.getElementById("p2").innerHTML = array[1];
document.getElementById("p3").innerHTML = array[2];
document.getElementById("p4").innerHTML = array[3];
document.getElementById("p5").innerHTML = array[4];
document.getElementById("p6").innerHTML = array[5];

// Aplicamos el descuento
aplicarDescuento(precios);

// Redondear el precio total
precio_total = precio_total.toFixed(2); // Esto convierte a cadena con 2 decimales

// Convertir a cadena y reemplazar punto por coma
const precioTotalComa = precio_total.toString().replace(".", ",");
// Mostrar el precio total en el elemento correspondiente
document.getElementById("total").innerHTML = precioTotalComa + "€";
if(cantProd == 0){
    document.getElementById("carrito").innerHTML="Carrito vacio, Articulos: "+ cantProd;
}else{
    document.getElementById("carrito").innerHTML="El carrito tiene "+ cantProd+" productos";
}
