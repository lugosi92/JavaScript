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



/*----------------------------------PASO 1 - ELIMINAR DUPLICADOS Y CREAR ARRAY-----------------------------*/
     // Separamos por lineas y retorno de carro
     const lineas = contenido.split("\r\n");
     // Creamos conjunto
     jugadores = new Set(lineas);
     jugadores.delete("");
     // PASAR DE CONJUNTO A ARRAY
     arrayJugadores = [...jugadores];



     
/*----------------------------------PASO 2 - SEPARAR POR GENERO-------------------------------------------*/
Masculinos = [];
Femeninos = [];

//Recorremos todos los jugadores
arrayJugadores.forEach(jugador => {
    //Separamos los campos para acceder al de genero
    dato = jugador.split(";");
    //Filtrar 
    if(dato[1] == "M"){
        Masculinos.push(jugador);
    }else if(dato[1] == "F"){
        Femeninos.push(jugador);
    }
 });




/*----------------------------------PASO 3 - CREAR POSICIONES -------------------------------------------*/

//Creamos posiciones para usarla como condicion y asi recorrer el listado varias veces con 1 ejecucion de codigo
 portertos = []
 defensas = [];
 centros = [];
 delanteros = [];

 portertosF = []
 defensasF = [];
 centrosF = [];
 delanterosF = [];



 //Pasamos como parametro femenino o masculino y los arrays de posiciones
function crearPosiciones(arrayJugadores, portertos, defensas, centros, delanteros){

    //Recorre los jugadores
    arrayJugadores.forEach(jugador => {
        dato = jugador.split(";");

        //Se crean las posiciones
        if(dato[3] == "Portero" ){
            portertos.push(jugador);
        }else if(dato[3] == "Defensa"){
            defensas.push(jugador);
        }else if(dato[3] == "Centro"){
            centros.push(jugador);
        }else if(dato[3] == "Delantero"){
            delanteros.push(jugador);
        }
    });

    //La funcion devuelve los arrays de posiciones
    return portertos, defensas, centros, delanteros;
}


crearPosiciones(Masculinos, portertos, defensas, centros, delanteros);
console.log("POSICIONES MASCULINAS");
console.table({ portertos, defensas, centros, delanteros });


crearPosiciones(Femeninos, portertosF, defensasF, centrosF, delanterosF);
console.log("POSICIONES FEMENINAS");
console.table({ portertosF, defensasF, centrosF, delanterosF });




/*----------------------------------PASO 4 - CREAR EQUIPOS -------------------------------------------*/
//Listado donde se almacenan todos los equipos
EquiposM =[];
EquiposF =[];

//Listado para crear cada equipo
equipoM = [];
equipoF = [];

function crearEquipos(EquiposMF, equipoMF, portertos, defensas, centros, delanteros){

    //Las posiciones han sido creadas para usarlas como condicion aqui y leer varias veces el listado,
    //mientras que cada array cumpla con el minimo de jugadores por equipo se crearan equipoMFs
    while(portertos.length > 1 && defensas.length > 4 &&
        centros.length > 3 && delanteros.length >3){
        
            //Se agrega 1 portero por vuelta
            equipoMF.push(portertos.shift());

            //Se agregan 4 defensas
            for(i = 0; i < 4; i++){
                equipoMF.push(defensas.shift());
            }

            //Se agregan 3 defensas
            for(i = 0; i < 3; i++){
                equipoMF.push(centros.shift());
            }

            //Se agregan 3 defensas
            for(i = 0; i < 3; i++){
                equipoMF.push(delanteros.shift());
            }

        //Si la longitud del array equipoMF es igual a 11
        if(equipoMF.length == 11){
            //Se propaga al array que almacenara todos los equipos
            EquiposMF.push([...equipoMF]);
            //Se limpia para crear 1 nuevo equipo
            equipoMF = [];
        }
        
    }

    return EquiposMF;
}


crearEquipos(EquiposM, equipoM, portertos, defensas, centros, delanteros);
console.log("EQUIPOS MASCULINO");
console.table(EquiposM);



crearEquipos(EquiposF, equipoF, portertosF, defensasF, centrosF, delanterosF);
console.log("EQUIPOS FEMENINO");
console.table(EquiposF);








/*----------------------------------PASO 5 - CREAR RESERVAS-------------------------------------------*/

let reservas = [];
let reservasF = [];

function crearReservas(reservas, portertos, defensas, centros, delanteros){

    //Mientras que algun array contenga datos se itera sobre las posiciones
    while (portertos.length > 0 || defensas.length > 0 ||
        centros.length > 0 || delanteros.length > 0) {

        //Se sacan del array y se agregan a reservas
        //Se valida antes que el array individualmente contenga algun dato para que no de error por array vacio
        if (portertos.length > 0) reservas.push(portertos.shift());
        if (defensas.length > 0) reservas.push(defensas.shift());
        if (centros.length > 0) reservas.push(centros.shift());
        if (delanteros.length > 0) reservas.push(delanteros.shift());
    }

    return reservas;
}

crearReservas(reservas, portertos, defensas, centros, delanteros);
console.log("RESERVAS MASCULINAS");
console.table(reservas);


crearReservas(reservasF, portertosF, defensasF, centrosF, delanterosF);
console.log("RESERVAS FEMENINAS");
console.table(reservasF);








}, false);