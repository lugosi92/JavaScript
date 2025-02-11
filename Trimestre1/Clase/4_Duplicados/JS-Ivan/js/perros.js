// Función asíncrona que lee un archivo y devuelve su contenido como texto.
async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); // FileReader permite leer archivos cargados en el navegador.
        reader.onload = e => resolve(e.target.result); // Cuando se completa la lectura, resolvemos con el contenido.
        reader.onerror = reject; // En caso de error, rechazamos la promesa.
        reader.readAsText(file); // Leer el archivo como texto.
    });
}

// Función que muestra el contenido procesado en un elemento HTML.
function mostrarContenido(contenido) {
    document.getElementById('contenido-archivo').innerHTML = contenido; // Inserta el contenido en un div con id 'contenido-archivo'.
}

// Evento para manejar la carga de un archivo desde un input de tipo file.
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0]; // Obtener el archivo seleccionado.
    if (!archivo) return; // Si no hay archivo seleccionado, salir.

    const contenido = await leerArchivo(archivo); // Leer el archivo de manera asíncrona.
    const arraySin = [...new Set(contenido.split('\r\n'))] // Divide el contenido en líneas y elimina duplicados.
        .filter(Boolean) // Elimina líneas vacías.
        .slice(1); // Remueve la primera línea (asumida como cabecera).

    const nombre = prompt("Introduce el nombre del Perro"); // Solicitar el nombre del perro al usuario.

    // Variables para almacenar información genealógica.
    let padre, madre, abueloPaterno, abuelaPaterna, abueloMaterno, abuelaMaterna;

    // Función para encontrar los padres de un individuo.
    function encontrarPadres(arraySin, nombre) {
        let padre = "";
        let madre = "null";

        arraySin.forEach(linea => {
            const partes = linea.split(";"); // Dividir la línea en columnas separadas por ';'.
            // Buscar si el nombre aparece como hijo (desde la tercera columna en adelante).
            if (partes.slice(2).some(hijo => hijo === nombre)) {
                padre = partes[0] ?? "Desconocido"; // Primera columna es el padre.
                madre = partes[1] ?? "Desconocido"; // Segunda columna es la madre.
            }
        });

        return { padre, madre }; // Retornar los nombres de los padres.
    }

    // Función para encontrar los abuelos de un individuo dado.
    function encontrarAbuelos(arraySin, padre, madre) {
        let abueloPaterno = "";
        let abuelaPaterna = "";
        let abueloMaterno = "";
        let abuelaMaterna = "";

        arraySin.forEach(linea => {
            const partes = linea.split(";"); // Dividir la línea en columnas.
            const hijos = partes.slice(2); // Columnas desde la tercera en adelante son los hijos.

            // Si el padre aparece como hijo, obtenemos sus padres (abuelos paternos).
            if (hijos.some(hijo => hijo === padre)) {
                abueloPaterno = partes[0] ?? "Desconocido";
                abuelaPaterna = partes[1] ?? "Desconocido";
            }

            // Si la madre aparece como hija, obtenemos sus padres (abuelos maternos).
            if (hijos.some(hijo => hijo === madre)) {
                abueloMaterno = partes[0] ?? "Desconocido";
                abuelaMaterna = partes[1] ?? "Desconocido";
            }
        });

        return {
            abueloPaterno,
            abuelaPaterna,
            abueloMaterno,
            abuelaMaterna
        };
    }

    // Función para encontrar los hijos de un individuo dado.
    function encontrarHijos(arraySin, nombre) {
        let hijos = []; // Inicializar un array vacío para almacenar los hijos.

        arraySin.forEach(linea => {
            const partes = linea.split(";"); // Dividir la línea en columnas.
            // Si el nombre aparece como padre o madre, agregar a los hijos.
            if (partes[0] === nombre || partes[1] === nombre) {
                partes.slice(2).forEach(hijo => hijos.push(hijo)); // Agregar los nombres de los hijos.
            }
        });

        return { hijos }; 
    }

    // Encontrar los padres del individuo.
    const padres = encontrarPadres(arraySin, nombre);
    console.log(`Padre: ${padres.padre}, Madre: ${padres.madre}`);

    // Encontrar los abuelos del individuo.
    const abuelos = encontrarAbuelos(arraySin, padres.padre, padres.madre);
    console.log(`Abuelo paterno: ${abuelos.abueloPaterno}, Abuela paterna: ${abuelos.abuelaPaterna}`);
    console.log(`Abuelo materno: ${abuelos.abueloMaterno}, Abuela materna: ${abuelos.abuelaMaterna}`);

    // Encontrar los hijos del individuo.
    const hijos = encontrarHijos(arraySin, nombre);
    console.log("Hijos:");
    hijos.hijos.forEach(hijo => console.log(hijo)); // Imprimir los nombres de los hijos.

}, false); 
