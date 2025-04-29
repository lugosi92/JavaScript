// FUNCIÓN PARA LEER ARCHIVOS CSV
async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();  
        reader.onload = (e) => resolve(e.target.result);  
        reader.onerror = (e) => reject("Error al leer el archivo: " + e.target.error);
        reader.readAsText(file);  
    });
}

// IMPORTAR
arrayjugadores = [];
Masculinos = [];
Femeninos = [];

// POSICIONES
porteros = []
defensas = [];
centros = [];
delanteros = [];

porterosF = []
defensasF = [];
centrosF = [];
delanterosF = [];

// EQUIPOS
//Listado donde se almacenan todos los equipos
equiposM =[];
equiposF =[];

//Listado para crear cada equipo
equipoM = [];
equipoF = [];

//Listado para reservas
reservas = [];
reservasF = [];


// ------------------------------------------------IMPORTAR-------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {

    //Guardamos el CSV importado en una variable    
    const archivoJugadores = document.getElementById('file-input').files[0];
    //Usamos la funcion para leer el CSV 
    const contenido = await leerArchivo(archivoJugadores);
    

     // Separamos por lineas y retorno de carro
     const lineas = contenido.split("\r\n");
     // Creamos conjunto
     jugadores = new Set(lineas);
     jugadores.delete("");
     // PASAR DE CONJUNTO A ARRAY
     arrayJugadores = [...jugadores];

     Masculinos.length = 0;
     Femeninos.length = 0;

     arrayJugadores.forEach(jugador => {
        dato = jugador.split(";");
        if(dato[1] == "M"){
            Masculinos.push(dato);
        }else if(dato[1] == "F"){
            Femeninos.push(dato);
        }
     });

    mostrarMasculinos();
    mostrarFemeninos();

});

function mostrarMasculinos() {
    let tabla = document.getElementById("vista-masculino-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    Masculinos.forEach(dato => {
      
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${dato[0]}</td>
            <td>${dato[1]}</td>
            <td>${dato[2]}</td>
            <td>${dato[3]}</td>
            <td>${dato[4]}</td>

        `;
 

     // Aplicar los estilos a las celdas de la fila
     const celdas = fila.querySelectorAll('td');
     celdas.forEach(celda => {
         celda.style.outline = '1px solid #1B1B1B'; // Outline para cada celda
         celda.style.color = '#1B1B1B'; // Color del texto
         celda.style.padding = '10px'; // Padding de las celdas
         celda.style.textAlign = 'left'; // Alineación del texto
     });

     tabla.appendChild(fila);

    });
}

function mostrarFemeninos() {
    let tabla = document.getElementById("vista-femenino-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    Femeninos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${dato[0]}</td>
            <td>${dato[1]}</td>
            <td>${dato[2]}</td>
            <td>${dato[3]}</td>
            <td>${dato[4]}</td>

        `;
 

     // Aplicar los estilos a las celdas de la fila
     const celdas = fila.querySelectorAll('td');
     celdas.forEach(celda => {
         celda.style.outline = '1px solid #1B1B1B'; // Outline para cada celda
         celda.style.color = '#1B1B1B'; // Color del texto
         celda.style.padding = '10px'; // Padding de las celdas
         celda.style.textAlign = 'left'; // Alineación del texto
     });

     tabla.appendChild(fila);

    });
}





// ------------------------------------------------POSICIONES-------------------------------------------------------------

document.getElementById('posiciones-input-M').addEventListener('click', function(){
    id = "posiciones-masculino-tabla";
    posiciones(crearPosiciones(Masculinos, porteros, defensas, centros, delanteros), id);
});

document.getElementById('posiciones-input-F').addEventListener('click', function(){
    id = "posiciones-femenino-tabla";
    posiciones(crearPosiciones(Femeninos, porterosF, defensasF, centrosF, delanterosF), id);
});


function posiciones(arrayPosiciones, id){
    let tabla = document.getElementById(id).getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; 

     // Aplanar el array de arrays
     let jugadoresPlanos = arrayPosiciones.flat();

     jugadoresPlanos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${dato[0]}</td> 
            <td>${dato[3]}</td>
        `;
    
     tabla.appendChild(fila);
    });
}

function crearPosiciones(arrayJugadores,porteros, defensas, centros, delanteros){

    // Evitar que se multipliquen
    porteros.length = 0;
    defensas.length = 0;
    centros.length = 0;
    delanteros.length = 0;

   //Recorre los jugadores
   arrayJugadores.forEach(dato => {
       //Se crean las posiciones
       if(dato[3] == "Portero" ){
           porteros.push(dato);
       }else if(dato[3] == "Defensa"){
           defensas.push(dato);
       }else if(dato[3] == "Centro"){
           centros.push(dato);
       }else if(dato[3] == "Delantero"){
           delanteros.push(dato);
       }
   });

   let posiciones = [porteros, defensas, centros, delanteros];
   return posiciones;
}




// ------------------------------------------------CREAR EQUIPOS-------------------------------------------------------------

// Evento para mostrar EQUIPOS MASCULINOS
document.getElementById('equipos-input-M').addEventListener('click', function () {
    let id = "equipos-masculino-tabla";
    mostrarEquipos(crearEquipos(equiposM, porteros, defensas, centros, delanteros), id);
});

// Evento para mostrar EQUIPOS FEMENINOS
document.getElementById('equipos-input-F').addEventListener('click', function () {
    let id = "equipos-femenino-tabla";
    mostrarEquipos(crearEquipos(equiposF, porterosF, defensasF, centrosF, delanterosF), id);
});

function mostrarEquipos(equipos, tablaId) {
    let tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; 
    let contador = 0;


    let equiposPlano = equipos.flat();
    equiposPlano.forEach(dato => {
        let fila = tabla.insertRow();

            if (dato[3] === "Portero") contador++;
            
        fila.innerHTML = `
            <td>${dato[0]}</td> 
             <td>${dato[3]}</td> 
            <td>${'Equipo' + contador}</td>
        `;
    
     tabla.appendChild(fila);
    });
}

function crearEquipos(equiposMF, porteros, defensas, centros, delanteros) { 


    while (porteros.length > 0 && defensas.length >= 4 &&
           centros.length >= 3 && delanteros.length >= 3) {
        
        let equipoMF = [];
        equipoMF.push(porteros.shift());

        for (let i = 0; i < 4; i++) equipoMF.push(defensas.shift());
        for (let i = 0; i < 3; i++) equipoMF.push(centros.shift());
        for (let i = 0; i < 3; i++) equipoMF.push(delanteros.shift());

        if (equipoMF.length === 11) {
            equiposMF.push(equipoMF);
        }
    }

    return equiposMF;
}

// ------------------------------------------------RESERVAS RESERVAS-------------------------------------------------------------



document.getElementById('reservas-input-M').addEventListener('click', function () {
    let id = "reservas-masculino-tabla";
    mostrarReservas(crearReservas(reservas, porteros, defensas, centros, delanteros), id);
});


document.getElementById('reservas-input-F').addEventListener('click', function () {
    let id = "reservas-femenino-tabla";
    mostrarReservas(crearReservas(reservasF, porterosF, defensasF, centrosF, delanterosF), id);
});



function mostrarReservas(reservas, tablaId) {
    let tabla = document.getElementById(tablaId).getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; 
    console.log(reservas);

    reservas.forEach(dato => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${dato[0]}</td> 
             <td>${dato[3]}</td> 
        `;
    
     tabla.appendChild(fila);
    });
}



function crearReservas(reservas, porteros, defensas, centros, delanteros){

    //Mientras que algun array contenga datos se itera sobre las posiciones
    while (porteros.length > 0 || defensas.length > 0 ||
        centros.length > 0 || delanteros.length > 0) {

        //Se sacan del array y se agregan a reservas
        //Se valida antes que el array individualmente contenga algun dato para que no de error por array vacio
        if (porteros.length > 0) reservas.push(porteros.shift());
        if (defensas.length > 0) reservas.push(defensas.shift());
        if (centros.length > 0) reservas.push(centros.shift());
        if (delanteros.length > 0) reservas.push(delanteros.shift());
    }

    return reservas;

}
