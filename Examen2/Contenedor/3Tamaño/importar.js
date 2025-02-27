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


// ------------------------------------------------1 IMPORTAR-------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {

     // Eliminar mensaje previo si existe
     const mensajePrevio = document.getElementById('importar-mensajeError');
     if (mensajePrevio) mensajePrevio.remove();
 
     // Declarar mensaje
     let mensaje = "";

    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    const archivoPrestamos = document.getElementById('importar-input-prestamos').files[0];



    if (!archivoLibros || !archivoLectores || !archivoPrestamos) {
        mensaje= "Error: Selecciona ambos archivos antes de importar.";
        console.log("--1---")
        
       
    }else {
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
        const contenidoPrestamos = await leerArchivo(archivoPrestamos);
        console.log("--2---")

        console.log("Importación exitosa.");

        // IMPORTAR LIBROS
        contenidoLibros.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] !== "codLibro" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let libro = new Libros(dato[0], dato[1], dato[2],
                    dato[3], dato[4], dato[5], false, null, manga);
                    

            arrayLibros.push(libro);
                
            }
        });

        // IMPORTAR LECTORES
        contenidoLectores.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let lector = new Lectores(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
                arrayLectores.push(lector);
            }
            
        });

        // IMPORTAR PRESTAMOS
        contenidoPrestamos.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let prestamo = new Prestamos(dato[0], dato[1], dato[2], null, null);
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

    if (mensaje == ("Importacion exitosa")){
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

// ------------------------------------------------2 ENTRADA-SALIDA-------------------------------------------------------------

entradaSalida = document.getElementById('cursor-sobre-vista-libros');
vistaLibro = document.getElementById('vista-libros');


vistaLibro.addEventListener('mouseenter', function(){

    entradaSalida.innerHTML = "Entro en Vista Libros";
 
});

vistaLibro.addEventListener('mouseleave', function(){

    entradaSalida.innerHTML = "Salio de Vista Libros";
});


// ------------------------------------------------3 ENTRADA-SALIDA-------------------------------------------------------------




codigo = document.createElement('p');
codigo.id = 'codigo';
let mensajeCodigo = "Codigo del lenguaje: " + navigator.language;
codigo.innerHTML = mensajeCodigo;

alto = document.createElement('p');
alto.id = 'alto';
let mensajeAlto = "Alto de pantalla: " +  window.innerHeight + " pixeles";
alto.innerHTML = mensajeAlto;

ancho = document.createElement('p');
ancho.id = 'ancho';
let mensajeAncho = "Ancho de pantalla: " + window.innerWidth + " pixeles";
ancho.innerHTML = mensajeAncho;

document.getElementById('propiedades-navegador').appendChild(codigo);
document.getElementById('propiedades-navegador').appendChild(alto);
document.getElementById('propiedades-navegador').appendChild(ancho);

// ------------------------------------------------ACTUALIZAR VISTA LIBROS-------------------------------------------------------------
// Función para actualizar la vista de libros en la tabla


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















