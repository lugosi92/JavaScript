async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function mostrarContenidoEnPantalla(texto) {
    const elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = texto;
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }

    const contenido = await leerArchivo(archivo);
    console.log(contenido);
    mostrarContenidoEnPantalla(contenido);


/*------------------------CODIGO-----------------*/ 
 // ELIMINAR DUPLICADOS

    // Separamos por lineas y retorno de carro
    const lineas = contenido.split("\r\n");
    // Creamos conjunto
    const perros = new Set(lineas);
    perros.delete("");

    // PASAR DE CONJUNTO A ARRAY
    const arrayPerros = [...perros];

    // PREGUNTAMOS POR EL NOMBRE DEL PERRO
    const nombre = prompt("Introduce nombre perro");


// Funcion para obtener los padres
function obtenerPadres(array, nombrePerros) {
    // Declaradas con NULL por si no existe padre que se impriea deconocido
    let padre = null;
    let madre = null;

    /* 
    Dividimos en lineas
    Cada linea la dividmos en dato, cada posicion es 1 perro */
    array.forEach((linea) => {
        const dato = linea.split(";");
            /*Selecciona a partir de la posicion 2, asi nos aseguramos que sean hijos siempre
            Si en los hijos en alguna linea se encuentra el nombre, se guardan los padres */
            if (dato.slice(2).includes(nombrePerros)) {
                padre = dato[0];
                madre = dato[1];
            }
    });

    // Guardamos los abuelos si exiten, sino apaece desconocido
    return {
        madre: madre ?? "desconocido",
        padre: padre ?? "desconocido",
    };
}

    
// FUNCION OBTENER ABUELOS
function abuelos(array, nombreProgenitor) {
    let abuelo = null;
    let abuela = null;

    array.forEach((linea) => {
        const dato = linea.split(";");
        /* Si se encuentra el nombre de algun padre a partir de la posicon 2
        en la parte de hijos, la posicion 1 y 2 serian los abuelos paternos, idem con los maternos */
            if (dato.slice(2).includes(nombreProgenitor)) {
                abuelo = dato[0];
                abuela = dato[1];
        }
    });

    return {
            abuelo: abuelo ?? "desconocido",
            abuela: abuela ?? "desconocido",
    };
}

// FUNCION OBTENER HIJOS
function obtenerHijos(array, nombrePerro) {
        const hijos = [];

    array.forEach((linea) => {
        const datos = linea.split(";");
        /* Si el dato(cada perro), coincide con el nombre del perro y 
        la longitud en la que se encuentra es inferiro a 2 es decir que no es un hijo sino un padre una madre*/
        if (datos.includes(nombrePerro) && datos.indexOf(nombrePerro) < 2) {
            hijos.push(...datos.slice(2));
        }
    });
    
    return hijos.sort((a, b) => b.localeCompare(a));

}


//Llamamaos a las funciones y la asiganamos a una variable ara usarla en el tag p
const { madre, padre } = obtenerPadres(arrayPerros, nombre);

const { abuelo: abueloMaterno, abuela: abuelaMaterna } = abuelos(arrayPerros, madre);
const { abuelo: abueloPaterno, abuela: abuelaPaterna } = abuelos(arrayPerros, padre);

const hijos = obtenerHijos(arrayPerros, nombre);

// Imprimimos por consola
console.log( obtenerPadres(arrayPerros, nombre));
console.log(abuelos(arrayPerros, madre));
console.log(abuelos(arrayPerros, padre));
console.log(obtenerHijos(arrayPerros, nombre));


// Mostrar resultados a partir tag<p>
    const resultado = `
        <p><strong>Información de ${nombre}:</strong></p>
        <p>Madre: ${madre}</p>
        <p>Padre: ${padre}</p>
        <p>Abuela materna: ${abuelaMaterna}</p>
        <p>Abuelo materno: ${abueloMaterno}</p>
        <p>Abuela paterna: ${abuelaPaterna}</p>
        <p>Abuelo paterno: ${abueloPaterno}</p>
        <p>Hijos: ${hijos.length ? hijos.join(", ") : "Sin hijos conocidos"}</p>
    `;


    mostrarContenidoEnPantalla(resultado);
}, false);
