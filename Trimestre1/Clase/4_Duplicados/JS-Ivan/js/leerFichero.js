const archivo = `
G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45€
`;


// const archivo = `
// G27CQ4 212,65€
// XG27ACS 269,66€
// CQ32G2SE 214,20€
// G27C4X 189,45€
// `;

const campos = [];
const lineas = archivo.trim().split('\n');

lineas.forEach(linea => {
    const [nombre, precio] = linea.split(' ');
    campos.push({ nombre, price: parseFloat(precio.replace(',', '.')) });
});

console.log(campos);     

//El orden que voy a asignar para el fichero 2 es (Nombre, precio, pixeles, watios, pulgadas, hz, ms)

