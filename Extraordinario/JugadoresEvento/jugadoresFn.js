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
portertos = []
defensas = [];
centros = [];
delanteros = [];

portertosF = []
defensasF = [];
centrosF = [];
delanterosF = [];

// EQUIPOS
//Listado donde se almacenan todos los equipos
EquiposM =[];
EquiposF =[];

//Listado para crear cada equipo
equipoM = [];
equipoF = [];


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
            Masculinos.push(jugador);
        }else if(dato[1] == "F"){
            Femeninos.push(jugador);
        }
     });

    mostrarMasculinos();
    mostrarFemeninos();

});

function mostrarMasculinos() {
    let tabla = document.getElementById("vista-masculino-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    Masculinos.forEach(jugador => {
        let dato = jugador.split(";");
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

    Femeninos.forEach(jugador => {
        let dato = jugador.split(";");
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
    posiciones(crearPosiciones(Masculinos, portertos, defensas, centros, delanteros), id);
});

document.getElementById('posiciones-input-F').addEventListener('click', function(){
    id = "posiciones-femenino-tabla";
    posiciones(crearPosiciones(Femeninos, portertos, defensas, centros, delanteros), id);
});


function posiciones(arrayPosiciones, id){
    let tabla = document.getElementById(id).getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; 

    arrayPosiciones.forEach((grupo, index) => {
        grupo.forEach(jugador => {
            let dato = jugador.split(";");
            let fila = tabla.insertRow();
            fila.innerHTML = `
                 <td>${dato[2]}</td> 
                <td>${dato[3]}</td> 
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
});
}

function crearPosiciones(arrayJugadores,porteros, defensas, centros, delanteros){

    // Evitar que se multipliquen
    porteros.length = 0;
    defensas.length = 0;
    centros.length = 0;
    delanteros.length = 0;

   //Recorre los jugadores
   arrayJugadores.forEach(jugador => {
       dato = jugador.split(";");

       //Se crean las posiciones
       if(dato[3] == "Portero" ){
           porteros.push(jugador);
       }else if(dato[3] == "Defensa"){
           defensas.push(jugador);
       }else if(dato[3] == "Centro"){
           centros.push(jugador);
       }else if(dato[3] == "Delantero"){
           delanteros.push(jugador);
       }
   });

   let posiciones = [porteros, defensas, centros, delanteros];
   console.log(posiciones);
   return posiciones;
}


// ------------------------------------------------CREAR EQUIPOS-------------------------------------------------------------

// Evento para mostrar EQUIPOS
document.getElementById('equipos-input-M').addEventListener('click', function() {
    let id = "equipos-masculino-tabla";

    // Limpiamos el array de equipos antes de llenarlo
    EquiposM.length = 0;

    // Se crean los equipos
    crearEquipos(EquiposM, equipoM, portertos, defensas, centros, delanteros);

    console.log("EQUIPOS MASCULINO");
    console.table(EquiposM);

    // Aquí deberías tener una función para mostrar los equipos en la tabla
    mostrarEquipos(EquiposM, id);
});

// Evento para mostrar EQUIPOS FEMENINO
document.getElementById('equipos-input-F').addEventListener('click', function() {
    let id = "equipos-femenino-tabla";

    // Limpiamos el array de equipos antes de llenarlo
    EquiposF.length = 0;

    // Se crean los equipos
    crearEquipos(EquiposF, equipoF, portertosF, defensasF, centrosF, delanterosF);

    console.log("EQUIPOS FEMENINO");
    console.table(EquiposF);

    // Aquí deberías tener una función para mostrar los equipos en la tabla
    mostrarEquipos(EquiposF, id);
});



function crearEquipos(EquiposMF, equipoMF, porteros, defensas, centros, delanteros) {
    while (porteros.length > 1 && defensas.length > 4 &&
           centros.length > 3 && delanteros.length > 3) {
        
        equipoMF.push(porteros.shift());

        for (let i = 0; i < 4; i++) {
            equipoMF.push(defensas.shift());
        }

        for (let i = 0; i < 3; i++) {
            equipoMF.push(centros.shift());
        }

        for (let i = 0; i < 3; i++) {
            equipoMF.push(delanteros.shift());
        }

        if (equipoMF.length == 11) {
            EquiposMF.push([...equipoMF]);
            equipoMF.length = 0;  // Vaciar array para el siguiente equipo
        }
    }
}

function mostrarEquipos(equipos, tablaId) {
    let tabla = document.getElementById(tablaId);
    tabla.innerHTML = "";  // Limpiar contenido previo

    equipos.forEach((equipo, index) => {
        let portero = "";
        let defensas = "";
        let centrocampistas = "";
        let delanteros = "";

        // Recorrer todos los jugadores y asignarlos a su posición
        equipo.forEach(jugador => {
            let datos = jugador.split(";");
            let nombre = datos[0];
            let posicion = datos[3]; // La posición está en la cuarta columna (índice 3)

            if (posicion === "Portero") {
                portero += nombre + ", ";
            } else if (posicion === "Defensa") {
                defensas += nombre + ", ";
            } else if (posicion === "Centro") {
                centrocampistas += nombre + ", ";
            } else if (posicion === "Delantero") {
                delanteros += nombre + ", ";
            }
        });

        // Eliminar la última coma y espacio en cada categoría
        portero = portero.slice(0, -2);
        defensas = defensas.slice(0, -2);
        centrocampistas = centrocampistas.slice(0, -2);
        delanteros = delanteros.slice(0, -2);

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td><strong>Equipo ${index + 1}</strong></td>
            <td>${portero || "-"}</td>
            <td>${defensas || "-"}</td>
            <td>${centrocampistas || "-"}</td>
            <td>${delanteros || "-"}</td>
        `;
        tabla.appendChild(fila);
    });
}
