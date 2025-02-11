
let productos = 
`G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45€`;

const lineas = productos.trim().split('\n');
const resultado = [];

lineas.forEach(linea => {
    const parte = linea.split(' ');
    const nombre = parte[0];
    const precio = parseFloat(parte[1].replace(',','.').replace('€','').trim());
    resultado.push(nombre,precio);

});

console.log(resultado);