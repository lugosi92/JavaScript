async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function mostrarContenidoEnPantalla(html) {
    const elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = html;
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const contenido = await leerArchivo(archivo);


     //-------------------------------------------eLIMINAMOS DUPLICADOS--------------------------------------
    const lineas = contenido.split("\r\n");
    const perros = new Set(lineas);
    const arrayPerros = [...perros];
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------Creamos array de perros individuales con relacione--------------------------------------
    const listaPerros = [];

arrayPerros.forEach(linea => {
    const partes = linea.split(";");
    const padre = partes[0];
    const madre = partes[1];
    const hijos = partes.slice(2);

    // Añadir padre si no existe
    if (!listaPerros.find(p => p.nombre === padre)) {
        listaPerros.push({ nombre: padre, padre: null, madre: null, hijos: [] });
    }

    // Añadir madre si no existe
    if (!listaPerros.find(p => p.nombre === madre)) {
        listaPerros.push({ nombre: madre, padre: null, madre: null, hijos: [] });
    }

    // Añadir hijos
    hijos.forEach(hijo => {
        if (!listaPerros.find(p => p.nombre === hijo)) {
            listaPerros.push({ nombre: hijo, padre: padre, madre: madre, hijos: [] });
        }
    });
});

console.log(listaPerros);
//---------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------RELACIONES DE PATERNIDAD---------------------------------------------

listaPerros.forEach(perro => {
    listaPerros.forEach(posiblePadre => {
        if (posiblePadre.nombre === perro.padre || posiblePadre.nombre === perro.madre) {
            posiblePadre.hijos.push(perro.nombre);
        }
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------ASIGNAMOS SEXOS ALEATORIOS------------------------------------------------
    listaPerros.forEach(p => {
        p.sexo = Math.random() < 0.5 ? 'Macho' : 'Hembra';
    });
//---------------------------------------------------------------------------------------------------------------------------------------
    

//----------------------------------------------------------FUNCIONES---------------------------------------------------------------------


// Función para comprobar si dos perros tienen relación familiar
    function sonFamilia(p1, p2) {
        if (!p1 || !p2) return false;
        if (p1.padre === p2.padre || p1.padre === p2.nombre || p1.madre === p2.nombre) return true;
        if (p2.padre === p1.nombre || p2.madre === p1.nombre) return true;
        return false;
    }

    // Función para generar nombres aleatorios 
    function generarNombre() {
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return "Cachorro_" + letras[Math.floor(Math.random() * letras.length)] + Math.floor(Math.random() * 1000);
    }

    // Obtener listas de machos y hembras sin repetir
    const machos = listaPerros.filter(p => p.sexo === "Macho");
    const hembras = listaPerros.filter(p => p.sexo === "Hembra");

    // Mezclamos
    machos.sort(() => Math.random() - 0.5);
    hembras.sort(() => Math.random() - 0.5);


    //---------------------------------------------------------PRIMERA CAMADA------------------------------------------------------------------------------
    const primeraCamada = [];
    let parejas1 = 0;

    for (let i = 0; i < machos.length && parejas1 < 8; i++) {
        for (let j = 0; j < hembras.length; j++) {
            const padre = machos[i];
            const madre = hembras[j];
            if (!sonFamilia(padre, madre)) {
                const numCachorros = Math.floor(Math.random() * 5) + 1;
                for (let c = 0; c < numCachorros; c++) {
                    primeraCamada.push({
                        nombre: generarNombre(),
                        padre: padre.nombre,
                        madre: madre.nombre,
                        sexo: Math.random() < 0.5 ? 'Macho' : 'Hembra'
                    });
                }
                parejas1++;
                break;
            }
        }
    }
    //---------------------------------------------------------SEGUNDA GENERACION (lOS FERTILES DE LA PRIMERA)-----------------------------------------------------------------------------

    const nuevaGeneracion = primeraCamada.map(c => ({ ...c }));

    const segundaCamada = [];
    let parejas2 = 0;

    const machos2 = nuevaGeneracion.filter(p => p.sexo === "Macho").sort(() => Math.random() - 0.5);
    const hembras2 = nuevaGeneracion.filter(p => p.sexo === "Hembra").sort(() => Math.random() - 0.5);

    for (let i = 0; i < machos2.length && parejas2 < 8; i++) {
        for (let j = 0; j < hembras2.length; j++) {
            const padre = machos2[i];
            const madre = hembras2[j];
            if (padre.padre !== madre.padre && padre.madre !== madre.madre) {
                const numCachorros = Math.floor(Math.random() * 5) + 1;
                for (let c = 0; c < numCachorros; c++) {
                    segundaCamada.push({
                        nombre: generarNombre(),
                        padre: padre.nombre,
                        madre: madre.nombre,
                        sexo: Math.random() < 0.5 ? 'Macho' : 'Hembra'
                    });
                }
                parejas2++;
                break;
            }
        }
    }

    // Mostrar ambas camadas en tabla HTML
    let tabla = "<h3>Primera generación</h3><table border='1'><tr><th>Nombre</th><th>Padre</th><th>Madre</th><th>Sexo</th></tr>";
    primeraCamada.forEach(c => {
        tabla += `<tr><td>${c.nombre}</td><td>${c.padre}</td><td>${c.madre}</td><td>${c.sexo}</td></tr>`;
    });
    tabla += "</table>";

    tabla += "<h3>Segunda generación</h3><table border='1'><tr><th>Nombre</th><th>Padre</th><th>Madre</th><th>Sexo</th></tr>";
    segundaCamada.forEach(c => {
        tabla += `<tr><td>${c.nombre}</td><td>${c.padre}</td><td>${c.madre}</td><td>${c.sexo}</td></tr>`;
    });
    tabla += "</table>";

    mostrarContenidoEnPantalla(tabla);
}, false);
