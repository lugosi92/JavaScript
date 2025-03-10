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
let arrayFiltros = [];


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
// ------------------------------------------------10. Validacion avanzada------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {

    regexISBN = /^\d{13}$/;
    regexNsocio =  /^[1-9]\d*$/;
    regexTelefono =  /^(?:\+34)?\d{9}$/;
    regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     // Eliminar mensaje previo si existe
     const mensajePrevio = document.getElementById('importar-mensajeError');
     if (mensajePrevio) mensajePrevio.remove();

     const erroresPrevios = document.getElementById('errores-Arr');
     if (erroresPrevios) erroresPrevios.remove();
 
     // Declarar mensaje
     let mensaje = "";
     let errores = [];

    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    const archivoPrestamos = document.getElementById('importar-input-prestamos').files[0];



    if (!archivoLibros || !archivoLectores || !archivoPrestamos) {
        mensaje= "Error: Selecciona ambos archivos antes de importar.";
        
       
    }else {
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
        const contenidoPrestamos = await leerArchivo(archivoPrestamos);

        console.log("Importacion exitosa");

        // Convertir CSV en objetos y agregarlos a los arrays
       // Procesar libros
       contenidoLibros.split("\r\n").forEach((linea, index) => {
        let dato = linea.split(",");
        if (dato[0] !== "cod_Libro" 
            && dato.every(d => d.trim() !== "" && d !== "undefined")) {
            
            // if (!regexISBN.test(dato[1])) {
            //     errores.push(`Línea ${index + 1} (Libros): ISBN incorrecto -> ${dato[1]}`);
            // } else {
                let libro = new Libros(dato[0], dato[1], dato[2], dato[3], dato[4], dato[5], false, null);
                arrayLibros.push(libro);
            }
        // }
    });

      // Procesar lectores
      contenidoLectores.split("\r\n").forEach((linea, index) => {
        let dato = linea.split(",");
        if (dato[0] !== "nSocio" 
            && dato.every(d => d.trim() !== "" && d !== "undefined")) {

            // if (!regexNsocio.test(dato[0])) {
            //     errores.push(`Línea ${index + 1} (Lectores): Número de socio incorrecto -> ${dato[0]}`);
            // }
            // if (!regexTelefono.test(dato[3])) {
            //     errores.push(`Línea ${index + 1} (Lectores): Teléfono incorrecto -> ${dato[3]}`);
            // }
            // if (!regexEmail.test(dato[4])) {
            //     errores.push(`Línea ${index + 1} (Lectores): Email incorrecto -> ${dato[4]}`);
            // }

            // if (errores.length === 0) {
                let lector = new Lectores(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
                arrayLectores.push(lector);
            // }
        }
    });

        contenidoPrestamos.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio") {  // Validación extra
                let prestamo = new Prestamos(dato[0], dato[1], dato[2], dato[3], dato[4]);
                arrayPrestamos.push(prestamo);
            }
            
        });

        if (errores.length > 0) {
            mensaje = "Se encontraron errores en la importación.";
        } else {
            mensaje = "Importación exitosa.";
            mostrarLibros();
            mostrarLectores();
        }
    }
     


    // Mostrar mensaje principal
    const mensajeHTML = document.createElement('p');
    mensajeHTML.id = 'importar-mensajeError';
    mensajeHTML.innerHTML = mensaje;
    mensajeHTML.style.color = mensaje === "Importación exitosa." ? "green" : "red";
    document.getElementById('importar').appendChild(mensajeHTML);

    // Mostrar errores si existen
    if (errores.length > 0) {
        const arrayErrores = document.createElement('p');
        arrayErrores.id = 'errores-Arr';
        arrayErrores.innerHTML = errores.join("<br>");
        arrayErrores.style.color = "red";
        document.getElementById('importar').appendChild(arrayErrores);
    }
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
propiedades.innerHTML = "Codigo del lenguaje: " +navigator.language + "<br>" +
                        "Alto pantalla: " + window.innerHeight + "<br>" +
                        "Ancho pantalla: " + window.innerWidth;


// ------------------------------------------------4. Formato telefono-------------------------------------------------------------

function validarTelefono(telefono) {

    // let regexTelefono = /^[6789]\d{8}$/;

    // //+34 604085607

    // let regexTelefono2 = /^\+34\s\d{9}$/;

    let regexTelefono = /^(?:[6789]\d{8}|\+34\s\d{9})$/;
    return regexTelefono.test(telefono);
}


// ------------------------------------------------5. Banco objeto-------------------------------------------------------------

let bancoLibros = [];

function crearBancoObjetos() {
    bancoLibros = []; // Limpiar antes de llenarlo

    arrayLibros.forEach(libro => {
        let libroBanco = {
            autor: libro.autor, 
            bajaLibro: libro.bajaLibro, 
            clasificacion: libro.clasificacion,
            codLibro: libro.codLibro, 
            editorial: libro.editorial, 
            ejemplares: libro.ejemplares,
            fechaBajaLibro: libro.fechaBajaLibro, 
            isbn: libro.isbn, 
            titulo: libro.titulo
        };
        bancoLibros.push(libroBanco);
    });
    console.log(bancoLibros);
}

// ------------------------------------------------6. Vista Libro-------------------------------------------------------------
// ------------------------------------------------8. Añadir filtromas detallado------------------------------------------------------------



document.getElementById("vista-libros-boton").addEventListener("click", function(){

    caracter = document.getElementById("vista-libros-incluye").value;
    contenido = document.getElementById("vista-libros-detalla").value;
    arrayFiltros = []; 

    if(caracter !== ""){
        arrayFiltros = [];
        arrayLibros.forEach(libro => {
    
           if(libro.titulo.includes(caracter)){
                arrayFiltros.push(libro);
            }
        });
    
        console.log(arrayFiltros);
        mostrarFiltros();
    }else if (contenido !== ""){ 

        contenido = document.getElementById("vista-libros-detalla").value;
        select = document.getElementById("buscarPor");
        opciones = select.value;
    
        if(opciones == "titulo"){    
            arrayLibros.forEach(libro => {
                if(libro.titulo.includes(contenido)){
                    arrayFiltros.push(libro);
                }
            });
        }else if(opciones == "autor"){
            arrayLibros.forEach(libro => {
                if(libro.autor.includes(contenido)){
                    arrayFiltros.push(libro);
                }
            });
        }else if(opciones == "ambos"){
            arrayLibros.forEach(libro => {
                if(libro.autor.includes(contenido) || libro.titulo.includes(contenido)){
                    arrayFiltros.push(libro);
                }
            });
        }

        mostrarFiltros2();
    }else{
        actualizarVistaLibros();
    }
   
});

function mostrarFiltros() {
    let tabla = document.getElementById("vista-libros-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    arrayFiltros.forEach(libro => {
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

function mostrarFiltros2() {
    let tabla = document.getElementById("vista-libros-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    arrayFiltros.forEach(libro => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
        `;
    });
}

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

// ------------------------------------------------7. Promesa------------------------------------------------------------

document.getElementById("prestamo-boton").addEventListener("click", solicitudPrestamo);

function solicitudPrestamo() {
    // Eliminar mensaje previo si existe
    const mensajePrevio = document.getElementById("prestamo-mensaje");
    if (mensajePrevio) mensajePrevio.remove();

    // Obtener datos de entrada
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    // Crear elemento para mostrar mensaje
    const mensajeElemento = document.createElement("p");
    mensajeElemento.id = "prestamo-mensaje";
    document.getElementById("devolucion-prestamo").appendChild(mensajeElemento);

    comprobarLibro(codLibro)
        .then(() => comprobarLector(numSocio))
        .then(() => generarPrestamo(numSocio, codLibro))
        .then((prestamo) => {
            mensajeElemento.style.color = "green";
            mensajeElemento.textContent = `Préstamo exitoso - Número: ${prestamo.numPrestamo}, Fecha: ${prestamo.fechaPrestamo}`;
        })
        .catch((error) => {
            mensajeElemento.style.color = "red";
            mensajeElemento.textContent = error;
        });
}

// **Función para comprobar que el libro existe y está disponible**
function comprobarLibro(codLibro) {
    return new Promise((resolve, reject) => {
        const libro = arrayLibros.find(libro => libro.codLibro == codLibro);

        if (!libro) {
            reject("Error: El libro no existe.");
        } else if (libro.fechaBajaLibro) {
            reject("Error: El libro está dado de baja.");
        } else if (libro.ejemplares <= 0) {
            reject("Error: No hay ejemplares disponibles.");
        } else {
            resolve();
        }
    });
}

// **Función para comprobar que el lector existe y no está dado de baja**
function comprobarLector(numSocio) {
    return new Promise((resolve, reject) => {
        const lector = arrayLectores.find(lector => lector.numSocio == numSocio);

        if (!lector) {
            reject("Error: El lector no existe.");
        } else if (lector.fechaBaja) {
            reject("Error: El lector está dado de baja.");
        } else {
            resolve();
        }
    });
}

// **Función para generar el préstamo**
function generarPrestamo(numSocio, codLibro) {
    return new Promise((resolve, reject) => {
        const libro = arrayLibros.find(libro => libro.codLibro == codLibro);

        if (libro.ejemplares > 0) {
            libro.ejemplares--; // Restar un ejemplar
            const fecha = new Date();
            const fechaPrestamo = fecha.toLocaleDateString("es-ES");
            const numPrestamo = arrayPrestamos.length + 1;
            const prestamo = new Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, null);
            
            arrayPrestamos.push(prestamo);
            arrayPrestamosVivos.push(prestamo);
            resolve(prestamo);
        } else {
            reject("Error: No hay ejemplares disponibles.");
        }
    });
}


// ------------------------------------------------9. Estadisticas------------------------------------------------------------

document.getElementById("estadisticas-boton").addEventListener("click", function(){

    contadorLibro= 0;
    contadorLectores = 0;
    contadorPrestamo = 0;

    for( let i = 0; i <= arrayLibros.length; i++){
        contadorLibro++;
    }
    arrayLectores.forEach(lector => {
        contadorLectores++;
    });

    arrayPrestamos.forEach(prestamo => {
        if(!prestamo.fechaDevolucion ){
            contadorPrestamo++;
        }
    });
    
console.log(contadorLibro);
console.log(contadorLectores);
console.log(contadorPrestamo);

texto = document.createElement('p');

texto.id = "recuento";

texto.innerHTML = "Lectores: " + contadorLectores + "<br>" +
                  "Libros: " + contadorLibro + "<br>" +
                  "Prestamo: " + contadorPrestamo;

document.getElementById("estadisticas-biblioteca").append(texto);

});

// ------------------------------------------------11. Estadisticas------------------------------------------------------------

historialDevoluciones = [];


document.getElementById("devolucion-boton").addEventListener("click", function (){

    numSocio = document.getElementById("devolucion-prestamo-socio").value;
    codLibro = document.getElementById("devolucion-prestamo-libro").value;

    if(numSocio && codLibro){
        devolucionPrestamos(numSocio, codLibro);
        mostrarDevoluciones();
    }
 
});


function mostrarDevoluciones() {
    let tabla = document.getElementById("devolucion-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    historialDevoluciones.forEach(prestamo => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${prestamo.numSocio}</td>
            <td>${prestamo.codLibro}</td>
            <td>${prestamo.fechaDevolucion}</td>
        `;
    });
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

                    historialDevoluciones.push({
                        numSocio: numSocio,
                        codLibro: codLibro,
                        fechaDevolucion: fechaDevolucion
                    });
                    console.log(historialDevoluciones);
                }
            });
            console.log(arrayPrestamos);
            return true; // Devolución exitosa
        }
    }
    return false; // No se pudo procesar la devolución
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


/*-------------------------------------------------------Colores Lectores - Funciones-------------------------------------------------*/
function validarEmail(email) {

    let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;
    return regexEmail.test(email);
}

function validarTelefono(telefono) {

    let regexTelefono = /^[6789]\d{8}$/;
    return regexTelefono.test(telefono);
}

