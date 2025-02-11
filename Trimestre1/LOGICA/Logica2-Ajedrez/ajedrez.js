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

 /*----------------------------------PASO 2 - SEPARAR POR CATEGORIAS-------------------------------------------*/

const juveniles = [];
const adultos = [];


arrayJugadores.forEach(linea => {
    dato = linea.split(";");

    if(dato[2] <= 18){
        juveniles.push(linea);
    }else{
        adultos.push(linea);
    }
});

console.log(juveniles);




 /*----------------------------------PASO 3 - CREAR POSICIONES-------------------------------------------*/

 const equipos = [];

 const capitanJ = [];
 const principalJ = [];
 const suplentesJ = [];

 while( juveniles.length > 7){
    const equipo = [];

    capitanJ.push(juveniles.shift());

    for(let i = 0; i < 4 ; i++){
        principalJ.push(juveniles.shift());
    }

    for(let i = 0; i < 2 ; i++){
        suplentesJ.push(juveniles.shift());
    }
    equipo.push(...capitanJ,...principalJ,...suplentesJ);
    equipos.push([...equipo]); 

    console.table("----CAPITAN-----");
    console.table(capitanJ);
    console.table("----PRINCIAPLES-----");
    console.table(principalJ);
    console.table("-----SUPLENTES----");
    console.table(suplentesJ);
    console.table("-----EQUIPO----");
    console.table(equipo);
    console.table("-----EQUIPOS----");
    console.log(equipos);


      // Vaciar las listas temporales para el próximo equipo
      capitanJ.length = 0;
      principalJ.length = 0;
      suplentesJ.length = 0;

 }

 /*----------------------------------PASO 4 - RESERVAS-------------------------------------------*/

 const reservas = [];

 while(juveniles.length > 0){
    reservas.push(juveniles.shift());
 }


    console.table("-----RESERVAS----");
    console.log(reservas);




    
}, false);