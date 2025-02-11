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


    /*----------------------------------PASO 1 - ELIMINAR DUPLICADOS Y CREAR LISTADO-----------------------------*/
    // Separamos por lineas y retorno de carro
    const lineas = contenido.split("\r\n");
    // Creamos conjunto
    jugadores = new Set(lineas);
    jugadores.delete("");
    // PASAR DE CONJUNTO A ARRAY
    arrayJugadores = [...jugadores];



    /*----------------------------------PASO 2 - DIVIDIR POR GENEROS--------------------------------------------*/
    
    const arrayMasculino = [];
    const arrayFemenino = [];

    arrayJugadores.forEach(lineas => {
        let dato = lineas.split(";");
    if(dato[1] == "M"){
        arrayMasculino.push(dato);
    }else if(dato[1] == "F"){
        arrayFemenino.push(dato);
    }

    });


 /*------------------------------------PASO 3 - CREAR POSCIONES---------------------------------------------------*/
const portero = [];
const defensas = [];
const centros = [];
const delanteros = [];


arrayMasculino.forEach(datos => {
    if(datos[3] === "Portero"){
        portero.push(datos);
    }else if(datos[3] === "Defensa" ){
        defensas.push(datos);
    }else if(datos[3] === "Centro"){
        centros.push(datos);
    }else if(datos[3] === "Delantero"){
        delanteros.push(datos);
    }    
  
});

 /*------------------------------------PASO 3 - ASIGNAR EQUIPOS---------------------------------------------------*/

const equipos = [];
let contadorEquipos = 1;



while(portero.length >= 1 && defensas.length >= 4 &&
    centros.length >=3 && delanteros.length >=3){

       
    let equipo = [];

    equipo.push(portero.shift());
 
    for(let i= 0; i < 4 ; i++){
        equipo.push(defensas.shift());
    }

    for(let i= 0; i < 3 ; i++){
        equipo.push(centros.shift());
    }

    for(let i= 0; i < 3 ; i++){
        equipo.push(delanteros.shift());
    }
  
    equipos.push([...equipo]);

    console.log(`Equipo ${contadorEquipos}`)
    console.table(equipo);

    contadorEquipos++;

   
    // VACIAR ARRAY
    equipo.length = 0;

    
}
console.log(equipos);


 /*------------------------------------PASO 4 - ASIGNAR RESERVAS---------------------------------------------------*/
const reservas = [];
while(portero.length > 0 || defensas.length > 0 ||
    centros.length > 0 || delanteros.length >0){

    if (portero.length > 0) reservas.push(portero.pop());
    if (defensas.length > 0) reservas.push(defensas.pop());
    if (delanteros.length > 0) reservas.push(delanteros.pop());
    if (centros.length > 0) reservas.push(centros.pop());

}

console.log(reservas);


}, false);