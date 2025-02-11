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
    // console.log(contenido);
    // mostrarContenido(contenido);
    //Limpiamos contenido duplicado y lineas vacias\\
    const lineas = contenido.split('\r\n');
    sinDuplicados=new Set(lineas);
    sinDuplicados.delete("");
    arraySin=[...sinDuplicados];
    arraySin.shift();
    // console.log(arraySin);
    // tiempo1 = Date.now();
    // console.log(tiempo1);

        //Declaramos Variables
        arrayHombres = [];
        arrayMujeres = [];
        arrayPorterosHombres = [];
        arrayDefensasHombres = [];
        arrayCentralesHombres = [];
        arrayDelanterosHombres = [];
        arrayPorterosMujeres = [];
        arrayDefensasMujeres = [];
        arrayCentralesMujeres = [];
        arrayDelanterosMujeres = [];
        //Separamos en Hombres Y Mujeres
        arraySin.forEach(linea => {
            partes = linea.split(";");
            genero = partes[1];
            if(genero=="M"){
                arrayHombres.push(linea);
            }else if(genero=="F"){
                arrayMujeres.push(linea);
            }
        });
        // console.log(arrayHombres);
        // console.log(arrayMujeres);
        //Dividimos por posiciones los Hombres y Mujeres
        function clasificarJugadores(arrayJugadores, arrayPorteros, arrayDefensas, arrayCentrales, arrayDelanteros) {
            arrayJugadores.forEach(linea => {
                let partes = linea.split(";");
                let posicion = partes[3];
        
                if (posicion === "Portero") {
                    arrayPorteros.push(linea);
                } else if (posicion === "Defensa") {
                    arrayDefensas.push(linea);
                } else if (posicion === "Centro") {
                    arrayCentrales.push(linea);
                } else if (posicion === "Delantero") {
                    arrayDelanteros.push(linea);
                }
            });
        }
        // Ejemplo de uso:
        clasificarJugadores(arrayHombres, arrayPorterosHombres, arrayDefensasHombres, arrayCentralesHombres, arrayDelanterosHombres);
        clasificarJugadores(arrayMujeres, arrayPorterosMujeres, arrayDefensasMujeres, arrayCentralesMujeres, arrayDelanterosMujeres);
        // console.log("Porteros Hombres: ",arrayPorterosHombres);
        // console.log("Porteros Mujeres: ",arrayPorterosMujeres);
        //Comprobamos los equipos maximos que se pueden hacer de Hombres y Mujeres
        function maxEquipos(arrayPorteros, arrayDefensas, arrayCentrales, arrayDelanteros) {
            return Math.floor(Math.min(
                arrayPorteros.length / 1,
                arrayDefensas.length / 4,
                arrayCentrales.length / 3, 
                arrayDelanteros.length / 3
            ));
        }
        let maxEquiposHombres = maxEquipos(arrayPorterosHombres, arrayDefensasHombres, arrayCentralesHombres, arrayDelanterosHombres);
        let maxEquiposMujeres = maxEquipos(arrayPorterosMujeres, arrayDefensasMujeres, arrayCentralesMujeres, arrayDelanterosMujeres);
        // Arrays de jugadores por posiciones
        let equiposHombres = [];
        let equiposMujeres = [];
        // Arrays para los suplentes
        let suplentesHombres = [];
        let suplentesMujeres = [];
        // Asignación de jugadores a equipos de hombres
        // Función genérica para asignar jugadores a equipos
        function asignarJugadoresAEquipos(maxEquipos, arrayPorteros, arrayDefensas, arrayCentrales, arrayDelanteros, equipos, suplentes) {
            for (i=0;i<maxEquipos;i++) {
                let equipoActual = [];
                // Comprobamos y añadimos 1 portero
                if (arrayPorteros.length>=1) {
                    equipoActual.push(arrayPorteros.shift());
                } else {
                    break; 
                }
                // Comprobamos y añadimos 4 defensas
                for (d=0;d<4;d++) {
                    if (arrayDefensas.length>=1) {
                        equipoActual.push(arrayDefensas.shift());
                    } else {
                        break;
                    }
                }
                // Comprobamos y añadimos 3 centrales
                for (c=0;c<3;c++) {
                    if (arrayCentrales.length>=1) {
                        equipoActual.push(arrayCentrales.shift());
                    } else {
                        break;
                    }
                }
                // Comprobamos y añadimos 3 delanteros
                for (f=0;f<3;f++) {
                    if (arrayDelanteros.length>=1) {
                        equipoActual.push(arrayDelanteros.shift());
                    } else {
                        break;
                    }
                }
                // Verificamos si el equipo tiene 11 jugadores completos
                if (equipoActual.length === 11) {
                    equipos.push(equipoActual);
                } else {
                    // Si no se completa el equipo, añadimos todos los jugadores actuales a los suplentes
                    equipoActual.forEach(jugador => {
                        suplentes.push(jugador);
                    });
                }
            }
        }
        // Asignación de jugadores a equipos de hombres
        asignarJugadoresAEquipos(maxEquiposHombres,arrayPorterosHombres, arrayDefensasHombres, arrayCentralesHombres, arrayDelanterosHombres, equiposHombres, suplentesHombres);
        // Asignación de jugadores a equipos de mujeres
        asignarJugadoresAEquipos(maxEquiposMujeres,arrayPorterosMujeres, arrayDefensasMujeres, arrayCentralesMujeres, arrayDelanterosMujeres, equiposMujeres, suplentesMujeres);
        // Aseguramos que los jugadores no asignados se añadan a los suplentes
        // Añadimos cualquier jugador restante que no haya sido asignado a los equipos 
        suplentesHombres.push(...arrayPorterosHombres, ...arrayDefensasHombres, ...arrayCentralesHombres, ...arrayDelanterosHombres);
        suplentesMujeres.push(...arrayPorterosMujeres, ...arrayDefensasMujeres, ...arrayCentralesMujeres, ...arrayDelanterosMujeres);
        console.log("Equipos de hombres formados:", equiposHombres);
        console.log("Equipos de mujeres formados:", equiposMujeres);
        console.log("Suplentes hombres:", suplentesHombres);
        console.log("Suplentes mujeres:", suplentesMujeres);
        
    }

, false);