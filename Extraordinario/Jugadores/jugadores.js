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

arrayJugadores.forEach(jugador => {
    dato = jugador.split(";");
    if(dato[1] == "M"){
        Masculinos.push(jugador);
    }else if(dato[1] == "F"){
        Femeninos.push(jugador);
    }
 });


/*-----------------------------------------------------------------------------

/*
No funciona, JS lee linea por linea y una vez que omite 1 no vuelve a leerla, solo se crea 1 equipo. 

let EquiposM =[];
let equipo = [];
posiciones = {Portero: 0, Defensa: 0, Centro: 0, Delantero: 0};

Masculinos.forEach(jugador => {
    dato = jugador.split(";");

    
    if(dato[3] == "Portero" && posiciones.Portero < 1){
        equipo.push(jugador);
        posiciones.Portero++;
    }else if(dato[3] == "Defensa" && posiciones.Defensa < 4){
        equipo.push(jugador);
        posiciones.Defensa++;
    }else if(dato[3] == "Centro" && posiciones.Centro < 3){
        equipo.push(jugador);
        posiciones.Centro++;
    }else if(dato[3] == "Delantero" && posiciones.Delantero <3){
        equipo.push(jugador);
        posiciones.Delantero++;
    }

    console.log(equipo);

    if(equipo.length == 11){
        EquiposM.push([...equipo]);
        equipo = [];
    }
    
});

console.log(EquiposM);
*/

/*----------------------------------PASO 3 - CREAR EQUIPOS -------------------------------------------*/


let portertos = []
let defensas = [];
let centros = [];
let delanteros = [];


let EquiposM =[];
let equipo = [];


Masculinos.forEach(jugador => {
    dato = jugador.split(";");

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



while(portertos.length > 1 && defensas.length > 4 &&
      centros.length > 3 && delanteros.length >3){
    
    equipo.push(portertos.shift());

        for(i = 0; i < 4; i++){
            equipo.push(defensas.shift());
        }

        for(i = 0; i < 3; i++){
            equipo.push(centros.shift());
        }

        for(i = 0; i < 3; i++){
            equipo.push(delanteros.shift());
        }

        console.log(equipo);

    if(equipo.length == 11){
        EquiposM.push([...equipo]);
        equipo = [];
    }
    
}

console.log(EquiposM);

/*----------------------------------PASO 4 - CREAR RESERVAS-------------------------------------------*/

let reservas = [];

while (portertos.length > 0 || defensas.length > 0 ||
       centros.length > 0 || delanteros.length > 0) {

    if (portertos.length > 0) reservas.push(portertos.shift());
    if (defensas.length > 0) reservas.push(defensas.shift());
    if (centros.length > 0) reservas.push(centros.shift());
    if (delanteros.length > 0) reservas.push(delanteros.shift());
}

console.log(reservas);




}, false);