async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);
    console.log(contenido);
    mostrarContenido(contenido);


    //Crear arrya
    let linea = contenido.split("\r\n")
    const arrayDatos = [...linea];
    // console.log(arrayDatos);

    const listado1 = [];
    const listado2 = [];
    const listado3 = [];

    let temporal = listado1;
    arrayDatos.forEach(linea => {
        
        if(linea.includes("&&&&&;;;;;")){
            if(temporal == listado1){
                temporal = listado2;
            }else if(temporal == listado2){
                temporal = listado3;
            }
        }else{
            temporal.push(linea);
        }
    });


console.log("-----------LISTADO 1-------------");
console.log(listado1);
// console.log(listado2);
// console.log(listado3);


// Ana Rodríguez – Calle de Gran Vía, 28, Madrid

nombres = [];
direccion = [];
listado1.forEach(linea => {
    dato = linea.split("–");
    nombres.push(dato[0]);
    direccion.push(dato[1]);
});

let direccionFiltrada = direccion.filter(item => item !== undefined);

dirFinal = [];
direccionFiltrada.forEach(linea => {
    dato = linea.split(",");
    dirFinal.push(dato);
});


console.log("-------------NOMBRE--------------");
console.log(nombres);

console.log("-----------DIRECCION-------------");
console.log(dirFinal);




}, false);
