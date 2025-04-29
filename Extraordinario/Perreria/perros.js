// GUARDAR ARCHIVO
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

    /*
    Si son +7
    Funciones foreach
    Hijoss con metodo string-> slice
    promt
    */

    // ELIMINAR DUPLICADOS

    // Separamos por lineas y retorno de carro
    const lineas = contenido.split("\r\n");
    // Creamos conjunto
    perros = new Set(lineas);
    perros.delete("");

    // PASAR DE CONJUNTO A ARRAY
    arrayPerros = [...perros];
    console.log("ARRAY perros")
    console.log(arrayPerros);

    // INTRODUCIR NOMBRE

    // nombre = prompt("Introduce nombre perro");

    const nombre = "Lila";
   
    let padre = "";
    let madre = "";

    let abueloM = null;
    let abuelaM = null;

    let abueloP = null;
    let abuelaP = null;



    // PADRES
    arrayPerros.forEach(linea => {
        const dato = linea.split(";");

        if (nombre == dato[2] || nombre == dato[3] || nombre == dato[4]
            || nombre == dato[5] || nombre == dato[6]) {
            madre = dato[1];
            padre = dato[0];
        }
    });

    // ABUELOS
    arrayPerros.forEach(linea => {
        const dato = linea.split(";")
        // BUSCAR ABUELOS MATERNOS
        if (madre == dato[2] || madre == dato[3] || madre == dato[4]
            || madre == dato[5] || madre == dato[6]) {
            abueloM = dato[0];
            abuelaM = dato[1];
        }

        // BUSCAR ABUELOS PATERNOS
        if (padre == dato[2] || padre == dato[3] || padre == dato[4]
            || padre == dato[5] || padre == dato[6]) {
            abueloP = dato[0];
            abuelaP = dato[1];
        }
    });

 


    // HIJOS
    const hijos = [];
    // Tyson;Lila;Tux;Kiwi;Moka;Pochita;Bonzo

    arrayPerros.forEach(linea => {
        const dato = linea.split(";")

        if (linea.includes(nombre)) {

            console.log(linea);
            console.log(dato.indexOf(nombre));

            if (dato.indexOf(nombre) < 2) {
                for (let i = 2; i < dato.length; i++) {
                    hijos.push(dato[i]);
                }
            }
        }
    });

   




    // PADRES
    console.log((padre ?? "desconocido") + " " +(madre ?? "desconocido"));

    // ABUELOS
    MabueloM = "Abuelo Materna: " + (abueloM ?? "desconocido");
    MabuelaM = "Abuela Materna: " + (abuelaM ?? "desconocido");

    MabueloP = "Abuelo Paterno: " + (abueloP ?? "desconocido");
    MabuelaP = "Abuela Paterna: " + (abuelaP ?? "desconocido");

    // Abulos Maternos
    console.log((MabueloM)  + " " + (MabuelaM));

    // Abuelos Paternos
    console.log( (MabueloP) + " " + (MabuelaP));

     //HIJOS;
     console.log("HIJOS");
     console.log(hijos);













}, false);