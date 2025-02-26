// Este código muestra cómo importar lectores 
// desde un archivo CSV y almacenarlos en un array.

async function importarLectores(archivo) {
    try {
        const contenido = await leerArchivo(archivo); // Espera a que el archivo se lea
        const lineas = contenido.split('\n').filter(linea => linea.trim() !== "");
        lineas.shift(); // Eliminar la cabecera

        const lectores = lineas.map(linea => {
            const [numSocio, nombre, apellido, telefono, email] = linea.split(',').map(item => item.trim());
            return { numSocio, nombre, apellido, telefono, email };
        });

        console.log("Lectores importados:", lectores);
        return lectores;
    } catch (error) {
        console.error("Error al importar lectores:", error);
    }
}


// Ejemplo 4: Usar Promise.all() para importar libros y lectores a la vez
// Si queremos importar libros y lectores al mismo tiempo, podemos usar Promise.all().

async function importarDatos(archivoLectores, archivoLibros) {
    try {
        const [lectores, libros] = await Promise.all([
            importarLectores(archivoLectores),
            importarLibros(archivoLibros)
        ]);

        console.log("Lectores:", lectores);
        console.log("Libros:", libros);
    } catch (error) {
        console.error("Error al importar datos:", error);
    }
}

// Leer un archivo y actualizar la tabla
// Este código importa los datos de los lectores
//  y los muestra en la tabla de manera asíncrona.

async function importarYMostrarLectores(archivo) {
    try {
        const contenido = await leerArchivo(archivo);
        const lectores = procesarLectores(contenido);
        actualizarVistaLectores(lectores);
    } catch (error) {
        console.error("Error al importar lectores:", error);
    }
}

// Procesar el contenido del archivo CSV
function procesarLectores(contenido) {
    const lineas = contenido.split('\n').filter(linea => linea.trim() !== "");
    lineas.shift(); // Eliminar la cabecera

    return lineas.map(linea => {
        const [numSocio, nombre, apellido, telefono, email] = linea.split(',').map(item => item.trim());
        return { numSocio, nombre, apellido, telefono, email };
    });
}

// Actualizar la tabla de lectores
function actualizarVistaLectores(lectores) {
    const tbody = document.querySelector('#comprobar-lectores-tabla tbody');
    tbody.innerHTML = "";

    lectores.forEach(({ numSocio, nombre, apellido, telefono, email }) => {
        const row = `<tr><td>${numSocio}</td><td>${nombre}</td><td>${apellido}</td><td>${telefono}</td><td>${email}</td></tr>`;
        tbody.innerHTML += row;
    });
}

// Evento para importar lectores al presionar el botón
document.getElementById('importar-boton').addEventListener('click', async () => {
    const archivo = document.getElementById('importar-input-lectores').files[0];
    if (archivo) await importarYMostrarLectores(archivo);
});


// Importar libros y actualizar la tabla con una promesa
// Misma lógica que los lectores, pero para los libros.


async function importarYMostrarLibros(archivo) {
    try {
        const contenido = await leerArchivo(archivo);
        const libros = procesarLibros(contenido);
        actualizarVistaLibros(libros);
    } catch (error) {
        console.error("Error al importar libros:", error);
    }
}

function procesarLibros(contenido) {
    const lineas = contenido.split('\n').filter(linea => linea.trim() !== "");
    lineas.shift(); // Eliminar cabecera

    return lineas.map(linea => {
        const [codLibro, isbn, autor, titulo, editorial, ejemplares] = linea.split(',').map(item => item.trim());
        return { codLibro, isbn, autor, titulo, editorial, ejemplares };
    });
}

function actualizarVistaLibros(libros) {
    const tbody = document.querySelector('#vista-libros-tabla tbody');
    tbody.innerHTML = "";

    libros.forEach(({ codLibro, isbn, autor, titulo, editorial, ejemplares }) => {
        const row = `<tr><td>${codLibro}</td><td>${isbn}</td><td>${autor}</td><td>${titulo}</td><td>${editorial}</td><td>${ejemplares}</td></tr>`;
        tbody.innerHTML += row;
    });
}

document.getElementById('importar-boton').addEventListener('click', async () => {
    const archivo = document.getElementById('importar-input-libros').files[0];
    if (archivo) await importarYMostrarLibros(archivo);
});


// Realizar un préstamo y actualizar la tabla
// Este código verifica si el libro está disponible 
// antes de reducir los ejemplares.

async function realizarPrestamo() {
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    const libro = arrayLibros.find(l => l.codLibro === codLibro);
    
    return new Promise((resolve, reject) => {
        if (!libro) {
            reject("Libro no encontrado");
        } else if (libro.ejemplares <= 0) {
            reject("No hay ejemplares disponibles");
        } else {
            libro.ejemplares--;
            actualizarVistaLibros(arrayLibros);
            resolve("Préstamo realizado con éxito");
        }
    });
}

document.getElementById('prestamo-boton').addEventListener('click', async () => {
    try {
        const mensaje = await realizarPrestamo();
        alert(mensaje);
    } catch (error) {
        alert(error);
    }
});


// Devolver un libro con promesas
// Si el libro existe, aumenta el número de ejemplares.

async function devolverLibro() {
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    return new Promise((resolve, reject) => {
        const libro = arrayLibros.find(l => l.codLibro === codLibro);
        
        if (!libro) {
            reject("Libro no encontrado");
        } else {
            libro.ejemplares++;
            actualizarVistaLibros(arrayLibros);
            resolve("Devolución realizada con éxito");
        }
    });
}

document.getElementById('devolucion-boton').addEventListener('click', async () => {
    try {
        const mensaje = await devolverLibro();
        alert(mensaje);
    } catch (error) {
        alert(error);
    }
});


////////////////////////////////////CALLBACKS///////////////////////////////////////

// Leer un archivo usando un callback

function leerArchivoConCallback(file, callback) {
    const reader = new FileReader();
    
    reader.onload = function (e) {
        callback(null, e.target.result);
    };

    reader.onerror = function (e) {
        callback(e, null);
    };

    reader.readAsText(file);
}

// Uso con callback
document.getElementById('importar-boton').addEventListener('click', () => {
    const archivo = document.getElementById('importar-input-lectores').files[0];

    if (archivo) {
        leerArchivoConCallback(archivo, (error, contenido) => {
            if (error) {
                console.error("Error al leer el archivo:", error);
            } else {
                console.log("Contenido leído:", contenido);
            }
        });
    }
});


// Importar lectores con un callback
// Aquí usamos un callback para procesar los datos después de leerlos.

function importarLectoresConCallback(archivo, callback) {
    leerArchivoConCallback(archivo, (error, contenido) => {
        if (error) {
            callback(error, null);
        } else {
            const lineas = contenido.split('\n').filter(linea => linea.trim() !== "");
            lineas.shift(); // Quitar cabecera

            const lectores = lineas.map(linea => {
                const [numSocio, nombre, apellido, telefono, email] = linea.split(',').map(item => item.trim());
                return { numSocio, nombre, apellido, telefono, email };
            });

            callback(null, lectores);
        }
    });
}

// Uso con callback para actualizar la vista
document.getElementById('importar-boton').addEventListener('click', () => {
    const archivo = document.getElementById('importar-input-lectores').files[0];

    if (archivo) {
        importarLectoresConCallback(archivo, (error, lectores) => {
            if (error) {
                console.error("Error al importar lectores:", error);
            } else {
                actualizarVistaLectores(lectores);
            }
        });
    }
});

// Actualizar la vista con callback
// Aquí pasamos un callback para ejecutar una acción después de actualizar la tabla.


function actualizarVistaLectoresConCallback(lectores, callback) {
    const tbody = document.querySelector('#comprobar-lectores-tabla tbody');
    tbody.innerHTML = "";

    lectores.forEach(({ numSocio, nombre, apellido, telefono, email }) => {
        const row = `<tr><td>${numSocio}</td><td>${nombre}</td><td>${apellido}</td><td>${telefono}</td><td>${email}</td></tr>`;
        tbody.innerHTML += row;
    });

    callback(); // Llamamos al callback después de actualizar
}

// Uso con callback
document.getElementById('comprobar-lectores-boton').addEventListener('click', () => {
    actualizarVistaLectoresConCallback(arrayLectores, () => {
        console.log("Vista de lectores actualizada.");
    });
});


// Manejo de préstamos con callback
// Aquí verificamos si un libro está disponible antes de procesar el préstamo.

function realizarPrestamoConCallback(numSocio, codLibro, callback) {
    const libro = arrayLibros.find(l => l.codLibro === codLibro);

    if (!libro) {
        callback("Libro no encontrado", null);
    } else if (libro.ejemplares <= 0) {
        callback("No hay ejemplares disponibles", null);
    } else {
        libro.ejemplares--;
        actualizarVistaLibros(arrayLibros);
        callback(null, "Préstamo realizado con éxito");
    }
}

// Uso con callback
document.getElementById('prestamo-boton').addEventListener('click', () => {
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    realizarPrestamoConCallback(numSocio, codLibro, (error, mensaje) => {
        if (error) {
            alert(error);
        } else {
            alert(mensaje);
        }
    });
});

// Devolver un libro con callback
// Similar al préstamo, pero incrementamos los ejemplares.

function devolverLibroConCallback(codLibro, callback) {
    const libro = arrayLibros.find(l => l.codLibro === codLibro);

    if (!libro) {
        callback("Libro no encontrado", null);
    } else {
        libro.ejemplares++;
        actualizarVistaLibros(arrayLibros);
        callback(null, "Devolución realizada con éxito");
    }
}

// Uso con callback
document.getElementById('devolucion-boton').addEventListener('click', () => {
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    devolverLibroConCallback(codLibro, (error, mensaje) => {
        if (error) {
            alert(error);
        } else {
            alert(mensaje);
        }
    });
});