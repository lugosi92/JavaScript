// Array con los precios
let array = ["12,56€", "7,25€", "38,73€", "45,67€", "23,56€", "90,40€"]; 
let precio_total = 0;  
let precios = [];     

// Recorremos el array para modificar los precios
array.forEach(element => {
    let value = element.replace('€', '');  
    value = value.replace(',', '.');        
    let valorNumerico = parseFloat(value); 
    precios.push(valorNumerico);            
    precio_total += valorNumerico;          
});

// Función que calcula el descuento si hay 5 o más productos
function aplicarDescuento(precios) {
    let descuento = 0; // Variable para el descuento
    if (precios.length >= 5)  {
        let precioMasBarato = Math.min(...precios); 
        descuento = precioMasBarato;                
        precio_total -= descuento;            
        document.getElementById("descuento").innerHTML = "Descuento de: " + precioMasBarato.toFixed(2).replace(".", ",") + "€ por el artículo más barato.";
    } else {
        document.getElementById("descuento").innerHTML = "No hay descuento aplicable.";
    }
    return descuento; // Retorna el descuento para futuras referencias si es necesario
}

// La fecha y hora actual
let fechaHora = new Date().toLocaleString();
// Mostrar la fecha y hora 
document.getElementById("fecha_actual").innerHTML = fechaHora;
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



