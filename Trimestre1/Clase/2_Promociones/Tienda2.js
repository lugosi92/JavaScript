/*
1. 6 productos en 1 array
2. Mostrar fecha
3. Mostrar los 6 productos en una tabla
4. Si son mas de 5, se le regala el mas barato 

EXTRA
1. Meter DNI 
2. Calcular la letra del DNI si la tiene y sino ponersela
*/

//Mostrar fecha
let fecha = new Date(); 
let fechaTexto = fecha.toLocaleDateString(); 
document.getElementById("fechaTexto").innerHTML = fechaTexto;

//Mostrar productos
let productos = ["13,45€", "15,67€", "11,65€", "34,67€", "25,56€", "28,67€"];


//Sustituir por .  y pasar a numeros
function comasNumeros(producto){
    let prodLimpio = producto.replace(',','.').replace('€', '');
    return prodLimpio = parseFloat(prodLimpio);
}

// Convertir todos los productos a números
let precios = productos.map(comasNumeros);

//Total
let total = prod1N + prod2N + prod3N + prod4N + prod5N + prod6N;
total = total.toFixed(2);
total = total.replace('.',',') + "€";

//Funcion mas barato
function ObtenerDescuentos(total){
    if(precios.length > 5){
        let minPrecio = Math.min(...precio);
        return minPrecio;
    }
    return 0;
}
let descuento = ObtenerDescuentos(precios);




//Obtener en tabla
document.getElementById("producto1").innerHTML = producto1[0];
document.getElementById("producto2").innerHTML = producto2[1];
document.getElementById("producto3").innerHTML = producto3[2];
document.getElementById("producto4").innerHTML = producto4[3];
document.getElementById("producto5").innerHTML = producto5[4];
document.getElementById("producto6").innerHTML = producto6[5];
document.getElementById("total").innerHTML = total;
document.getElementById("descuento").innerHTML = descuento;