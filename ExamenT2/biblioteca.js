/*
1. Constructores
2. Leer CSVs
3. Botoness
4. Funciones
*/
//Funcion dondeLibro
const manga = new Clasificacion(7, 4, 6);
// Variables globales
const arrayLibros = [];
const arrayLectores = [];
const arrayPrestamos = [];
let arrayPrestamosVivos = [];

// FUNCIÓN PARA LEER ARCHIVOS CSV
async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();  
        reader.onload = (e) => resolve(e.target.result);  
        reader.onerror = (e) => reject("Error al leer el archivo: " + e.target.error);
        reader.readAsText(file);  
    });
}

//----------------------------------------------------CONSTRUCTORES-----------------------------------------------------------------

//LIBROS
function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, bajaLibro, fechaBajaLibro, clasificacion) {
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
    this.bajaLibro = bajaLibro;
    this.fechaBajaLibro = fechaBajaLibro;
    //Funion DONDE LIBRO, al leer el csv libro se asignan a manga, si existen mas gateorias filtrar por alguna condicion
    this.__proto__ = clasificacion;
}

//LECTORES
function Lectores(numSocio, nombre, apellido, telefono, email, bajaLector, fechaBaja) {
    this.numSocio = numSocio;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.bajaLector = bajaLector;
    this.fechaBaja = fechaBaja;
}

//PRESTAMOS
function Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion) {
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}

//CLASIFICACION
function Clasificacion(pasillo, estanteria, estante) {
    this.pasillo = pasillo;
    this.estanteria = estanteria;
    this.estante = estante;
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------BOTONES------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------1. IMPORTAR-------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {

     // Eliminar mensaje previo si existe
     const mensajePrevio = document.getElementById('importar-mensajeError');
     if (mensajePrevio) mensajePrevio.remove();
 
     // Declarar mensaje
     let mensaje = "";
     console.log("-----0----");
    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    const archivoPrestamos = document.getElementById('importar-input-prestamos').files[0];
    console.log("-----1----");


    if (!archivoLibros || !archivoLectores || !archivoPrestamos) {
        mensaje= "Error: Selecciona ambos archivos antes de importar.";
        
       
    }else {
        console.log("-----2----");
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
        const contenidoPrestamos = await leerArchivo(archivoPrestamos);
        

        console.log("Importación exitosa.");

        // Convertir CSV en objetos y agregarlos a los arrays
        contenidoLibros.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] !== "codLibro" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let libro = new Libros(dato[0], dato[1], dato[2],
                    dato[3], dato[4], dato[5], false, null, manga);
            arrayLibros.push(libro);
                
            }
        });

        contenidoLectores.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let lector = new Lectores(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
                arrayLectores.push(lector);
            }
            
        });

        contenidoPrestamos.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio") {  // Validación extra
                let prestamo = new Prestamos(dato[0], dato[1], dato[2], dato[3], dato[4]);
                arrayPrestamos.push(prestamo);
            }
            
        });

        console.log(arrayPrestamos);
        mensaje = "Importacion exitosa";
        mostrarLibros();
        mostrarLectores();
    }



    mensajeHTML = document.createElement('p');
    mensajeHTML.id = 'importar-mensajeError';
    
    mensajeHTML.innerHTML = mensaje;
    

    if(mensaje == "Importacion exitosa"){
        mensajeHTML.style.color="green";
    }else{
        mensajeHTML.style.color="red";
    }
    document.getElementById('importar').appendChild(mensajeHTML);

});





// FUNCIÓN PARA MOSTRAR LIBROS EN LA TABLA
function mostrarLibros() {
    let tabla = document.getElementById("vista-libros-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    arrayLibros.forEach(libro => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
        `;
    });
}

// FUNCIÓN PARA MOSTRAR LECTORES EN LA TABLA
function mostrarLectores() {
    const tbody = document.querySelector("#comprobar-lectores-tabla tbody");
    tbody.innerHTML = ""; // Limpiamos la tabla antes de actualizarla
    
    arrayLectores.forEach(lector => {
        let fila = tbody.insertRow();
        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td>${lector.telefono}</td>
            <td>${lector.email}</td>
            <td>${lector.bajaLector}</td>
        `;
    });
}


// ------------------------------------------------2. Entrada y salida-------------------------------------------------------------
vistaLibros = document.getElementById("vista-libros");
mensajeHTML = document.getElementById("cursor-sobre-vista-libros");

vistaLibros.addEventListener("mouseenter", function() {
    mensajeHTML.innerHTML = "Entraste en seccion <br>";
});


vistaLibros.addEventListener("mouseleave", function() {
    mensajeHTML.innerHTML = "Saliste de la seccion <br>";
});


// ------------------------------------------------3. Datos-------------------------------------------------------------

propiedades = document.getElementById("propiedades-navegador");

lenguaje = 
propiedades.innerHTML = "Codigo del lenguaje: " +navigator.language + "<br>" +
                        "Alto pantalla: " + window.innerHeight + "<br>" +
                        "Ancho pantalla: " + window.innerWidth;

// ------------------------------------------------ACTUALIZAR VISTA LIBROS-------------------------------------------------------------
// Evento para actualizar la vista cuando se haga clic en el botón
document.getElementById("vista-libros-boton").addEventListener("click", function() {
     
    actualizarVistaLibros(); // Llama a la función para actualizar la tabla

});


function actualizarVistaLibros() {
    const tabla = document.getElementById('vista-libros-tabla').querySelector('tbody');
    tabla.innerHTML = ""; // Limpiar tabla

    arrayLibros.forEach((libro, index) => {
        const fila = document.createElement('tr');

        // Establecer el fondo alterno de las filas (pares e impares)
        fila.style.backgroundColor = index % 2 === 0 ? '#C398EB' : '#D8A4EB';

        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
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

    // Aplicar estilo al encabezado
    const encabezados = document.querySelectorAll('#vista-libros-tabla th');
    encabezados.forEach(encabezado => {
        encabezado.style.backgroundColor = '#BB61F0'; // Fondo del encabezado
        encabezado.style.color = 'white'; // Color del texto
        encabezado.style.padding = '10px'; // Padding
        encabezado.style.textAlign = 'left'; // Alineación del texto
    });
}



// ------------------------------------------------ACTUALIZAR VISTA Lectores-------------------------------------------------------------

document.getElementById("comprobar-lectores-boton").addEventListener("click", function() {
    actualizarVistaLectores(); // Llama a la función para actualizar la tabla de lectores
});

function actualizarVistaLectores() {
    const tabla = document.getElementById('comprobar-lectores-tabla').querySelector('tbody');
    tabla.innerHTML = ""; // Limpiar tabla

    arrayLectores.forEach((lector, index) => {
        const fila = document.createElement('tr');
        
        // Crear las celdas para cada lector
        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td>${lector.telefono}</td>
            <td>${lector.email}</td>
        `;

        // Aplicar estilos a las celdas
        const celdas = fila.querySelectorAll('td');
        celdas.forEach(celda => {
            celda.style.outline = '1px solid #1B1B1B'; // Outline para cada celda
            celda.style.color = '#1B1B1B'; // Color del texto
            celda.style.padding = '10px'; // Padding de las celdas
            celda.style.textAlign = 'left'; // Alineación del texto
            celda.style.backgroundColor = '#C398EB'; // Fondo de las celdas
        });

        // Validar y aplicar colores para teléfono y email
        if (!validarTelefono(lector.telefono)) {
            fila.querySelector('td:nth-child(4)').style.backgroundColor = '#EA9E90'; // Teléfono incorrecto
        }
        if (!validarEmail(lector.email)) {
            fila.querySelector('td:nth-child(5)').style.backgroundColor = '#EA9E90'; // Email incorrecto
        }

        tabla.appendChild(fila);
    });

    // Aplicar estilo al encabezado
    const encabezados = document.querySelectorAll('#comprobar-lectores-tabla th');
    encabezados.forEach(encabezado => {
        encabezado.style.backgroundColor = '#BB61F0'; // Fondo del encabezado
        encabezado.style.color = 'white'; // Color del texto
        encabezado.style.padding = '10px'; // Padding
        encabezado.style.textAlign = 'left'; // Alineación del texto
    });
}


// ------------------------------------------------ALTA LIBRO-------------------------------------------------------------
  // Añadir el evento de click al botón

  //0862	9781234567890	Juan Pérez	El Gran Libro!	Editorial XYZ	4
  document.getElementById('alta-libro-boton').addEventListener('click', () => {

    // Limpiar mensajes
    const mensaje = document.getElementById('alta-mensajeError');
    if (mensaje) mensaje.remove();


    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;

    
    if (altaLibro(isbn, autor, titulo, editorial, ejemplares)) {
        // El valor devuelto es true, entonces ejecutamos el bloque de código aquí
       mensajeError = "El libro se ha agregado correctamente.";
        // O cualquier otra acción que quieras realizar
    } else {
        // El valor devuelto es false, entonces ejecutamos este bloque
        mensajeError = "Hubo un error al agregar el libro.";
    }

      // Crear el mensaje
      const mensajeLibro = document.createElement('p');
      mensajeLibro.id = 'alta-mensajeError';
      mensajeLibro.innerHTML = mensajeError;
      mensajeLibro.style.color = "red";
  
      // Insertar el mensaje en un contenedor adecuado
      document.getElementById('alta-libro-formulario').appendChild(mensajeLibro);
});


// ------------------------------------ PRÉSTAMO ------------------------------------
// Event Listener para el préstamo de libros
document.getElementById('prestamo-boton').addEventListener("click", function() {
    // Limpiar mensajes
    const mensaje = document.getElementById('prestamo-mensajeError');
    if (mensaje) mensaje.remove();

    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    let mensajeError;
    if (solicitudPrestamo(numSocio, codLibro)) {
        mensajeError = "El préstamo se ha agregado correctamente.";
    } else {
        mensajeError = "Hubo un error al agregar el préstamo.";
    }

    const mensajePrestamo = document.createElement('p');
    mensajePrestamo.id = 'prestamo-mensajeError';
    mensajePrestamo.innerHTML = mensajeError;
    mensajePrestamo.style.color = "red";

    document.getElementById('prestamo-boton').after(mensajePrestamo);
});



// ----------------------------------- DEVOLUCIÓN -----------------------------------
document.getElementById('devolucion-boton').addEventListener("click", function() {
    // Limpiar mensajes
    const mensaje = document.getElementById('devolucion-mensajeError');
    if (mensaje) mensaje.remove();

    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    let mensajeError;
    if (devolucionPrestamos(numSocio, codLibro)) {
        mensajeError = "La devolución se ha realizado correctamente.";
    } else {
        mensajeError = "Hubo un error al procesar la devolución.";
    }

    const mensajeDevolucion = document.createElement('p');
    mensajeDevolucion.id = 'devolucion-mensajeError';
    mensajeDevolucion.innerHTML = mensajeError;
    mensajeDevolucion.style.color = "red";

    document.getElementById('devolucion-boton').after(mensajeDevolucion);
});













//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------BOTONES IMPLEMENTADOS LIBRO------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------ALTA LECTOR-------------------------------------------------------------

document.getElementById('alta-lector-boton').addEventListener('click', () => {
    // Limpiar cualquier mensaje previo
    const mensajePrevio = document.getElementById('alta-lector-mensaje');
    mensajePrevio.textContent = ""; // Borra el contenido previo

    // Recogemos los valores introducidos
    const numSocio = document.getElementById('alta-lector-numSocio').value;
    const nombre = document.getElementById('alta-lector-nombre').value;
    const apellido = document.getElementById('alta-lector-apellido').value;
    const telefono = document.getElementById('alta-lector-telefono').value;
    const email = document.getElementById('alta-lector-email').value;

    let texto = "";
    let color = "red";

    // Si la función altaLector() devuelve false (significa que se agregó bien)...
    if (!altaLector(numSocio, nombre, apellido, telefono, email)) {
        // Limpiar los campos
        document.getElementById('alta-lector-numSocio').value = "";
        document.getElementById('alta-lector-nombre').value = "";
        document.getElementById('alta-lector-apellido').value = "";
        document.getElementById('alta-lector-telefono').value = "";
        document.getElementById('alta-lector-email').value = "";

        texto = "Lector añadido exitosamente";
        color = "green"; // Mensaje en verde
    } else {
        texto = "Error en los datos";
    }

    // Mostrar mensaje de éxito o error
    mensajePrevio.textContent = texto;
    mensajePrevio.style.color = color;
});


// ------------------------------------------------MODIFICAR LIBRO-------------------------------------------------------------
document.getElementById('modif-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('modif-libro-mensaje');
    mensaje.textContent = "";

    // Recoger valores del formulario
    const codLibro = document.getElementById('modif-libro-codLibro').value;
    const atributo = document.getElementById('modif-libro-atributo').value;
    const valor = document.getElementById('modif-libro-valor').value;

    let texto = "";
    let color = "red";

    // Intentar modificar el libro
    if (modifLibro(codLibro, atributo, valor)) {
        texto = "Modificación realizada con éxito.";
        color = "green";
    } else {
        texto = "Error en la modificación.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});


// ------------------------------------------------MODIFICAR LECTOR-------------------------------------------------------------

document.getElementById('modif-lector-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('modif-lector-mensaje');
    mensaje.textContent = "";

    // Obtener valores del formulario
    const numSocio = document.getElementById('modif-lector-socio').value;
    const atributo = document.getElementById('modif-lector-atributo').value;
    const valor = document.getElementById('modif-lector-valor').value;

    let texto = "";
    let color = "red";

    // Confirmación antes de modificar
    if (confirm(`¿Seguro que quieres modificar el atributo ${atributo} del socio ${numSocio}?`)) {
        if (modifLector(numSocio, atributo, valor)) {
            texto = `El atributo "${atributo}" ha sido modificado correctamente.`;
            color = "green";
        } else {
            texto = "Error: número de socio no válido o dato incorrecto.";
        }
    } else {
        texto = "Operación cancelada.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});


// ------------------------------------------------BAJA DE LIBRO-------------------------------------------------------------
document.getElementById('baja-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('baja-libro-mensaje');
    mensaje.textContent = "";

    // Obtener el código del libro
    const codLibro = document.getElementById('baja-libro-codigo').value;

    let texto = "";
    let color = "red";

    // Confirmación antes de dar de baja
    if (confirm(`¿Seguro que quieres dar de baja el libro con código ${codLibro}?`)) {
        if (bajaLibro(codLibro)) {
            texto = "Libro dado de baja correctamente.";
            color = "green";
        } else {
            texto = "Error: código de libro no válido o no encontrado.";
        }
    } else {
        texto = "Operación cancelada.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});

// ------------------------------------------------BAJA DE LECTOR-------------------------------------------------------------

document.getElementById('baja-lector-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('baja-lector-mensaje');
    mensaje.textContent = "";

    // Obtener el número de socio
    const numSocio = document.getElementById('baja-lector-numSocio').value;

    let texto = "";
    let color = "red";

    // Intentar dar de baja
    if (bajaLector(numSocio)) {
        texto = "Lector dado de baja correctamente.";
        color = "green";
    } else {
        texto = "Error: número de socio no válido o no encontrado.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});
// ------------------------------------------------BUSCAR LIBRO-------------------------------------------------------------

document.getElementById('buscar-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('buscar-libro-mensaje');
    mensaje.textContent = "";

    // Obtener valores del formulario
    const atributo = document.getElementById('buscar-libro-atributo').value;
    const valor = document.getElementById('buscar-libro-valor').value;

    let texto = "";
    let color = "red";

    // Comprobar si el libro está disponible
    if (hayLibro(atributo, valor)) {
        texto = "✅ El libro está disponible.";
        color = "green";
    } else {
        texto = "❌ El libro no está disponible o está dado de baja.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});

// ------------------------------------------------LOCALIZAR LIBRO-------------------------------------------------------------
document.getElementById('localizar-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje y la ubicación previa
    const mensaje = document.getElementById('localizar-libro-mensaje');
    mensaje.textContent = "";
    document.getElementById('pasillo-libro').textContent = "";
    document.getElementById('estanteria-libro').textContent = "";
    document.getElementById('estante-libro').textContent = "";

    // Obtener el ISBN introducido
    const isbn = document.getElementById('isbn-libro').value;
    let texto = "";
    let color = "red";

    // Llamar a la función dondeLibro con el ISBN
    if (dondeLibro(isbn)) {
        texto = "✅ El libro ha sido localizado.";
        color = "green";
    } else {
        texto = "❌ No se encontró el libro con ese ISBN.";
    }

    // Mostrar el mensaje con color según el resultado
    mensaje.textContent = texto;
    mensaje.style.color = color;
});


















//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------FUNCIONES------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


/*-------------------------------------------------------BOTON (ALTA LIBRO) - Funciones -------------------------------------------------*/

function altaLibro(isbn, autor, titulo, editorial, ejemplares) {

    // Generar código de libro
    let codLibro = Math.floor(Math.random() * 900) + 100; 
    codLibro = `0${codLibro}`; // Añade un 0 al principio
  
    // Validaciones de variables
    // let regexCod = /^0[0-9]{3}$/;
    let regexISBN = /^\d{13}$/; // Cambiado para validar un ISBN de 13 dígitos numéricos
    let regexAutor = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexTitulo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+)*$/;
    let regexEditorial = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexEjemplares = /^[1-9]*$/;  // Asegura que el número sea mayor que 0


    // Validaciones de campos
    let errorF = false;
    let errorV = false;

    let devolver = true;

    // Validar si los campos están vacíos
    if (!isbn || !autor || !titulo || !editorial || !ejemplares) {
        errorF = true;
        alert("F --> No pueden existir datos vacíos");
    }

    // Validar formato de los datos
    if (!regexAutor.test(autor)) {
        errorV = true;
        alert("El autor solo puede contener letras y espacios.");
    } 
    if (!regexTitulo.test(titulo)) {
        errorV = true;
        alert("El título solo puede contener letras, números y caracteres especiales válidos.");
    } 
    if (!regexEditorial.test(editorial)) {
        errorV = true;
        alert("La editorial solo puede contener letras y espacios.");
    } 
    if (!regexEjemplares.test(ejemplares)) {
        errorV = true;
        alert("Los ejemplares deben ser un número entre 1 y 9.");
    }
        
    

    // Si no existen errores, crear el libro y agregarlo al array
    if (!errorF && !errorV) {
        // Crear el objeto de libro
        const libro = new Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, false, null);

        // Agregar el libro al array de libros
        arrayLibros.push(libro);

        // Limpiar los campos del formulario
        document.getElementById('alta-libro-isbn').value = "";
        document.getElementById('alta-libro-autor').value = "";
        document.getElementById('alta-libro-titulo').value = "";
        document.getElementById('alta-libro-editorial').value = "";
        document.getElementById('alta-libro-ejemplares').value = "";

        console.log("Libro agregado correctamente.");
        console.log(arrayLibros);  // Muestra el array de libros

        // Actualizar la vista para mostrar los libros
        // actualizarVista();

        return devolver;
    }
}

/*-------------------------------------------------------BOTON (prestamo) - Funciones-------------------------------------------------*/

// Función para realizar el préstamo
function prestamoLibro(codLibro) {
    let prestado = false;

    arrayLibros.forEach(libros => {
        if (libros.codLibro == codLibro && libros.ejemplares > 0) {
            libros.ejemplares = parseInt(libros.ejemplares);
            console.log("Lista actualizada PRESTADO");
            libros.ejemplares -= 1;
            prestado = true;
            console.log(arrayLibros);
        }
    });

    return prestado;
}

// Función para procesar la solicitud de préstamo
function solicitudPrestamo(numSocio, codLibro) {
    let fecha = new Date();
    let fechaPrestamo = fecha.toLocaleDateString('es-ES');
    let numPrestamo = arrayPrestamos.length + 1;

    let libroDisponible = false;
    let lectorValido = false;

    // Verificar si el libro existe y tiene ejemplares disponibles
    arrayLibros.forEach(libro => {
        if (libro.codLibro == codLibro && libro.ejemplares > 0 && !libro.fechaBajaLibro) {
            libroDisponible = true;
        }
    });

    // Verificar si el lector existe y no está dado de baja
    arrayLectores.forEach(lector => {
        if (lector.numSocio == numSocio && !lector.fechaBaja) {
            lectorValido = true;
        }
    });

    // Si el libro está disponible y el lector es válido, procesamos el préstamo
    if (libroDisponible && lectorValido) {
        if (prestamoLibro(codLibro)) {
            const prestamo = new Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, null);
            arrayPrestamos.push(prestamo);
            arrayPrestamosVivos.push(prestamo);
            return true; // Préstamo exitoso
        }
    }
    return false; // No se pudo realizar el préstamo
}

/*-------------------------------------------------------BOTON (devolucion) - Funciones-------------------------------------------------*/

// Función para devolver el libro
function devolucionLibro(codLibro) {
    let prestado = false;

    arrayLibros.forEach(libros => {
        if (libros.codLibro == codLibro) {
            libros.ejemplares = parseInt(libros.ejemplares);
            console.log("Lista actualizada DEVUELTO");
            libros.ejemplares += 1;
            prestado = true;
            console.log(arrayLibros);
        }
    });

    return prestado;
}

// Función para procesar la devolución del préstamo
function devolucionPrestamos(numSocio, codLibro) {
    let fecha = new Date();
    let fechaDevolucion = fecha.toLocaleDateString('es-ES');

    let existeLibro = false;
    let existeLector = false; // Se cambia a `false` por defecto

    // Verificar si el lector existe
    arrayLectores.forEach(lector => {
        if(lector.numSocio == numSocio){
            existeLector = true;
        }
    });

    // Verificar si el libro existe
    arrayLibros.forEach(libro => {
        if(libro.codLibro == codLibro){
            existeLibro = true;
        }
    });

    if(existeLector && existeLibro){
        if(devolucionLibro(codLibro)) {
            arrayPrestamosVivos.forEach((prestamo, index) => {
                if(prestamo.numSocio == numSocio && prestamo.codLibro == codLibro && !prestamo.fechaDevolucion){
                    prestamo.fechaDevolucion = fechaDevolucion;
                    console.log("Devolución registrada para préstamo ID:", prestamo.numPrestamo);

                    // Eliminar el préstamo de los activos
                    arrayPrestamosVivos.splice(index, 1);
                }
            });
            console.log(arrayPrestamos);
            return true; // Devolución exitosa
        }
    }
    return false; // No se pudo procesar la devolución
}


/*-------------------------------------------------------Colores Lectores - Funciones-------------------------------------------------*/
function validarEmail(email) {

    let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;
    return regexEmail.test(email);
}

function validarTelefono(telefono) {

    let regexTelefono = /^[6789]\d{8}$/;
    return regexTelefono.test(telefono);
}

























//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------FUNCIONES no usadas a implementar en la interfaz------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/*-------------------------------------------------------FUNCIONES LECTORES-------------------------------------------------*/


// Función para dar de alta un lector
function altaLector(numSocio, nombre, apellido, telefono, email) {

    // Validaciones de variables
    let regexSocio = /^8[0-9]{2}$/;
    let regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexTelefono = /^[6789]\d{8}$/;
    let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;

    // Variables para errores
    let errorF = false;
    let errorV = false;

    // Validar valores vacíos
    if (!numSocio || !nombre || !apellido || !telefono || !email) {
        errorF = true;
    }
    // Validar formato de los datos
    else if (!regexSocio.test(numSocio) || !regexNombreApellido.test(nombre) ||
        !regexNombreApellido.test(apellido) || !regexTelefono.test(telefono) ||
        !regexEmail.test(email)) {
        errorV = true;
    }

    // Mostrar errores
    if (errorF) {
        alert("F --> No pueden existir datos vacíos");
        return false;
    } else if (errorV) {
        alert("V --> El formato de algún dato es incorrecto");
        return false;
    }

    // Si no hay errores, agregar lector al array
    const lector = new Lectores(numSocio, nombre, apellido, telefono, email, false, null);
    arrayLectores.push(lector);

    console.log("Lector agregado correctamente.");
    console.log(arrayLectores);

    return true;
}

// Función para dar de baja un lector
function bajaLector(numSocio) {
    // Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaEspañol = fecha.toLocaleDateString('es-ES');

    let encontrado = false;

    // Buscar el lector en el array y marcarlo como dado de baja
    arrayLectores.forEach(lector => {
        if (lector.numSocio === numSocio) {
            lector.bajaLector = true;
            lector.fechaBajaLector = fechaEspañol;
            console.log("DATOS ACTUALIZADOS: " + lector.nombre + " HA SIDO DADO DE BAJA");
            console.log(arrayLectores);
            encontrado = true;
        }
    });

    if (!encontrado) {
        console.log("E --> No se ha encontrado ningún socio con ese número");
    }

    // Retornar true si se encontró el lector y se dio de baja, de lo contrario false
    return encontrado;
}

function modifLector(numSocio, atributo, nuevoValor) {
    let encontrado = false;

    arrayLectores.forEach(lector => {
        if (lector.numSocio == numSocio) {
            lector[atributo] = nuevoValor; // Modificar atributo
            console.log("LISTA ACTUALIZADA:", arrayLectores);
            encontrado = true;
        }
    });

    return encontrado; // Devolver `true` si encontró y modificó, `false` si no
}


function comprobarEmails() {

    //Listado de email no correctos
    const emailsNO = [];

    arrayLectores.forEach(lector => {
        if (verificarEmail(lector.email) == false) {
            emailsNO.push(lector);
        }
    });
    console.log("Lista de lectores con correos no validos");
    console.log(emailsNO);
}

function comprobarTelefonos() {

    //Listado de telefonos no correctos
    const telefonosNO = [];

    arrayLectores.forEach(lector => {
        if (verificarTelefono(lector.telefono) == false) {
            telefonosNO.push(lector);
        }
    });
    console.log("Lista de lectores con telefonos no validos");
    console.log(telefonosNO);
}



/*-------------------------------------------------------FUNCIONES LIBRO-------------------------------------------------*/

// Función para dar de baja un libro
function bajaLibro(codLibro) {
    // Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaEspañol = fecha.toLocaleDateString('es-ES');

    let encontrado = false;

    // Buscar el libro en el array y marcarlo como dado de baja
    arrayLibros.forEach(libro => {
        if (libro.codLibro === codLibro) {
            libro.bajaLibro = true;
            libro.fechaBajaLibro = fechaEspañol;
            console.log("DATOS ACTUALIZADOS: " + libro.titulo + " HA SIDO DADO DE BAJA");
            console.log(arrayLibros);
            encontrado = true;
        }
    });

    if (!encontrado) {
        console.log("E --> No se ha encontrado ningún libro con ese código");
    }

    // Retornar true si se encontró el libro y se dio de baja, de lo contrario false
    return encontrado;
}

// Función para modificar libro
function modifLibro(codLibro, atributo, nuevoValor) {
    let encontrado = false;

    arrayLibros.forEach(libro => {
        if (libro.codLibro === codLibro) {
            // Verificar que el atributo existe
            if (libro.hasOwnProperty(atributo)) {
                libro[atributo] = nuevoValor;
                encontrado = true;
                // Imprimir lista actualizada
                console.log("LISTA ACTUALIZADA:", arrayLibros);
            }
        }
    });

    if (!encontrado) {
        console.log("No se ha encontrado ningún libro con ese código.");
        return false;
    }

    return true;
}

// Función para comprobar si un libro está disponible
function hayLibro(atributo, valor) {
    let existe = false;

    // Buscar el libro en el array usando el atributo y el valor
    arrayLibros.forEach(libro => {
        if ((libro[atributo] == valor) && libro.bajaLibro == false) {
            existe = true;
        }
    });

    return existe;
}

// Función para localizar un libro según el ISBN
function dondeLibro(isbn) {
    let encontrado = false;

    arrayLibros.forEach(libro => {
        if (libro.isbn == isbn) {
            // Mostrar la ubicación del libro en la interfaz
            document.getElementById('pasillo-libro').textContent = libro.pasillo;
            document.getElementById('estanteria-libro').textContent = libro.estanteria;
            document.getElementById('estante-libro').textContent = libro.estante;
            encontrado = true;
        }
    });

    return encontrado;
}


/*-------------------------------------------------------FUNCIONES PRESTAMO-------------------------------------------------*/
function listadoTotalPrestamos() {

    let existe = false;
    arrayPrestamos.forEach(prestamo => {

        if (prestamo.fechaDevolucion == null) {
            console.log("PRESTAMOS VIVOS")
            console.log(
                "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
                "El NºSocio: " + prestamo.numSocio + "\n" +
                "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
                "Fecha prestamo: " + prestamo.fechaPrestamo + "\n");
            existe = true;
        } else {
            console.log("PRESTAMOS DEVUELTOS");
            console.log(
                "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
                "El NºSocio: " + prestamo.numSocio + "\n" +
                "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
                "Fecha prestamo: " + prestamo.fechaPrestamo + "\n" +
                "Fecha devolucion: " + prestamo.fechaDevolucion + "\n");
            existe = true;
        }
    });

    if (!existe) {
        console.log("No existen prestamos");
    }


}

function ListadoPrestamosVivos() {
    if (prestamo.fechaDevolucion == null) {
        console.log("PRESTAMOS VIVOS")
        console.log(
            "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
            "El NºSocio: " + prestamo.numSocio + "\n" +
            "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
            "Fecha prestamo: " + prestamo.fechaPrestamo + "\n");
    } else {
        console.log("No existen prestamos")
    }
}