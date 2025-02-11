// FUNCIONES

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

// LEER FICHERO DESPUÉS DE SELECCIONAR EN NAV

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    
    // Leer el archivo y obtener su contenido
    const contenido = await leerArchivo(archivo);

    // Mostrar el contenido en el elemento HTML
    mostrarContenido(contenido);
    
    // Procesar el contenido para extraer líneas únicas
    const noRepes = new Set(); // Declaración de noRepes solo una vez
    
    console.log(noRepes);
    const lineas = contenido.split('\r\n');
    //lineas.pop();
    lineas.forEach(linea => {
        noRepes.add(linea);
    });

    noRepes.delete("");

    
    // Convertimos el Set a una cadena uniendo las líneas con saltos de línea
    document.getElementById("no-repetidos").innerHTML = Array.from(noRepes).join('<br>');
    
    
}, false);


