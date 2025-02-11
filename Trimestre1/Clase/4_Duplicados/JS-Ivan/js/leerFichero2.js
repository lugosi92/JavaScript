const archivo = `
   G27CQ4:         212,65€ 1920px  65W 27" 170Hz 1ms
 XG27ACS:    180hz  269.66$      27" 62w 2ms 
CQ32G2SE: 31"  165Hz 214,20€ 1ms       2560px 52W   
     G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"
`;
const monitores = [];
const lineas = archivo.trim().split('\n');
lineas.forEach(linea => {
    const partes = linea.split(' ');
    const nombre = (partes.find(x => x.includes(':')) ? partes.find(x => x.includes(':')).replace(':', '') : null);
    const precio = parseFloat(partes.find(x => x.includes('€') || x.includes('$')).replace(',', '.').replace('€', '').replace('$', ''));
    const moneda = partes.find(x => x.includes('€')) ? '€' : (partes.find(x => x.includes('$')) ? '$' : null);
    const pixeles = (partes.find(x => x.includes('px')) ? parseInt(partes.find(x => x.includes('px')).replace('px', '')) : null);
    const watios = (partes.find(x => x.includes('W')) ? parseInt(partes.find(x => x.includes('W')).replace('W', '')) : null);
    const pulgadas = (partes.find(x => x.includes('"')) ? parseInt(partes.find(x => x.includes('"')).replace('"', '')) : null);
    const hz = (partes.find(x => x.toLowerCase().includes('hz')) ? parseInt(partes.find(x => x.toLowerCase().includes('hz')).replace('Hz', '').replace('hz', '')) : null);
    const ms = (partes.find(x => x.includes('ms')) ? parseInt(partes.find(x => x.includes('ms')).replace('ms', '')) : null);
    
    monitores.push({ nombre, precio,moneda,pixeles,watios,pulgadas,hz,ms});

});
console.log(monitores);
document.getElementById("monitor1").innerHTML = `
    Nombre: ${monitores[0].nombre} <br>
    Precio: ${monitores[0].precio} ${monitores[0].moneda} <br>
    Resolución: ${monitores[0].pixeles}px <br>
    Consumo: ${monitores[0].watios}W <br>
    Tamaño: ${monitores[0].pulgadas}" <br>
    Frecuencia: ${monitores[0].hz}Hz <br>
    Tiempo de respuesta: ${monitores[0].ms}ms
`;
document.getElementById("monitor2").innerHTML = `
    Nombre: ${monitores[1].nombre} <br>
    Precio: ${monitores[1].precio} ${monitores[1].moneda} <br>
    Resolución: ${monitores[1].pixeles}px <br>
    Consumo: ${monitores[1].watios}W <br>
    Tamaño: ${monitores[1].pulgadas}" <br>
    Frecuencia: ${monitores[1].hz}Hz <br>
    Tiempo de respuesta: ${monitores[1].ms}ms
`;
document.getElementById("monitor3").innerHTML = `
    Nombre: ${monitores[2].nombre} <br>
    Precio: ${monitores[2].precio} ${monitores[2].moneda} <br>
    Resolución: ${monitores[2].pixeles}px <br>
    Consumo: ${monitores[2].watios}W <br>
    Tamaño: ${monitores[2].pulgadas}" <br>
    Frecuencia: ${monitores[2].hz}Hz <br>
    Tiempo de respuesta: ${monitores[2].ms}ms
`;
document.getElementById("monitor4").innerHTML = `
    Nombre: ${monitores[3].nombre} <br>
    Precio: ${monitores[3].precio} ${monitores[3].moneda} <br>
    Resolución: ${monitores[3].pixeles}px <br>
    Consumo: ${monitores[3].watios}W <br>
    Tamaño: ${monitores[3].pulgadas}" <br>
    Frecuencia: ${monitores[3].hz}Hz <br>
    Tiempo de respuesta: ${monitores[3].ms}ms
`;