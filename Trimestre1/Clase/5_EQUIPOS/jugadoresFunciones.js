

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

// ELIMINAR DUPLICADOS

    // Separamos por lineas y retorno de carro
    const lineas = contenido.split("\r\n");
    // Creamos conjunto
    jugadores = new Set(lineas);
    jugadores.delete("");

// PASAR DE CONJUNTO A ARRAY
    arrayJugadores = [...jugadores];
    console.log("ARRAY JUGADORES")
    console.log(arrayJugadores);

    // Desordena un array usando el algoritmo Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio
      [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
    }
    return array;
  }

shuffle(arrayJugadores);
// LISTADO MASCULINO Y FEMENINO

const femenino = [];
const masculino = [];
// CADA VEZ QUE EXISTA UN ';' ES UN DATO, LOS GENEROS SE ENCUNTRAN EN DATO 1
arrayJugadores.forEach(linea => {
    const dato = linea.split(";");
    dato[1] === 'M' ?  masculino.push(linea) : "";
    dato[1] === 'F' ?  femenino.push(linea) : "";
});

// JUGADORES MACULINOS
console.log("JUGADORES MASCULINOS");
console.log(masculino);
// JUGADORES FEMENINOS
console.log("JUGADORES FEMENINOS");
console.log(femenino);

// FUNCION POSICIONES
function posiciones(array){
    const porteros = [];
    const defensas = [];
    const delanteros = [];
    const centros = [];
    // Insertamos en cada array su posicion 
    array.forEach(linea => {
        const dato = linea.split(";");
        dato[3] === 'Portero' ?  porteros.push(linea) : "";
        dato[3] === 'Defensa' ?  defensas.push(linea) : "";
        dato[3] === 'Delantero' ?  delanteros.push(linea) : "";
        dato[3] === 'Centro' ?  centros.push(linea) : "";
    });

     // Imprimir las posiciones
     console.log("Porteros:", porteros);
     console.log("Defensas:", defensas);
     console.log("Delanteros:", delanteros);
     console.log("Centros:", centros);

    return { porteros, defensas, delanteros, centros };
}

console.log("POSICIONES MASCULINAS");
posMasculino = posiciones(masculino);

console.log("POSICIONES FEMENINAS");
posFemenino = posiciones(femenino);


// Funcion equipos
function CrearEquipos(porteros, defensas, delanteros, centros){
    const equipos = [];
    // Mientras que cumpla con el minimo de jugadores que cree equipos
    while( porteros.length >= 1 && defensas.length >= 4 
        && delanteros.length >= 3 && centros.length >= 3){
            const equipo = [];

            equipo.push(porteros.pop());

            for(i=1; i<=4 ; i++){
                equipo.push(defensas.pop());
            }

            for(i=1; i<=3; i++){
                equipo.push(centros.pop());
                equipo.push(delanteros.pop());
            }
        equipos.push(equipo);
    }
    return equipos;
}

console.log("EQUIPOS MASCULINOS");
// Accedemos a cada posicion para imprimri equipos
const equiposMasc = CrearEquipos(
    posMasculino.porteros,
    posMasculino.defensas,
    posMasculino.delanteros,
    posMasculino.centros
);
console.log(equiposMasc);

console.log("EQUIPOS FEMENINOS");
// Accedemos a cada posicion para imprimri equipos
const equiposFem = CrearEquipos(
    posFemenino.porteros,
    posFemenino.defensas,
    posFemenino.delanteros,
    posFemenino.centros
);
console.log(equiposMasc);


//Funcion reservas
function CrearReservas(porteros, defensas, delanteros, centros){
    const reservas = [];
    // Mientras que la longitud de las posiciones sea mayor a 1 que siga introduciendo 
    while (porteros.length > 0 || defensas.length > 0 || 
        delanteros.length > 0 || centros.length > 0) {
            // En este caso ponemos if para que no inserte espacios vacios
        if (porteros.length > 0) reservas.push(porteros.pop());
        if (defensas.length > 0) reservas.push(defensas.pop());
        if (delanteros.length > 0) reservas.push(delanteros.pop());
        if (centros.length > 0) reservas.push(centros.pop());
            }
            return reservas;
}

// FUNCION RESERVAS
console.log("RESERVAS MASCULINAS");
const reservasMasc = CrearReservas(
    posMasculino.porteros,
    posMasculino.defensas,
    posMasculino.delanteros,
    posMasculino.centros
);
console.log(reservasMasc);

console.log("RESERVAS FEMENINAS");
const reservasFem = CrearReservas(
    posFemenino.porteros,
    posFemenino.defensas,
    posFemenino.delanteros,
    posFemenino.centros
);
console.log(reservasFem);

}, false);