let productos = `
   G27CQ4:         212,65€ 1920px  65W 27" 170Hz 1ms
 XG27ACS:    180hz  269.66$      27" 62w 2ms 
CQ32G2SE: 31"  165Hz 214,20€ 1ms       2560px 52W   
     G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"
`;

// 1. Dividir cada monitor en una línea
let lineas = productos.trim().split("\n");

// Crear un array para guardar los resultados
let resultado = [];

// 2. Recorrer cada línea
for (let i = 0; i < lineas.length; i++) {
    // Separar el nombre del resto
    let partes = lineas[i].split(":");
    let nombre = partes[0].trim();
    let detalles = partes[1];

    // Buscar el precio usando una expresión regular
    let precio = detalles.match(/\d+[,\.]\d+/);
    if (precio) {
        // Reemplazar la coma por un punto para convertirlo a número
        let precioNumero = parseFloat(precio[0].replace(",", "."));
        // Guardar el nombre y el precio
        resultado.push({ nombre: nombre, precio: precioNumero });
    }
}

// 3. Mostrar el resultado
console.log(resultado);
