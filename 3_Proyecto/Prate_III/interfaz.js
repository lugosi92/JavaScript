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

// ------------------------------------------------IMPORTAR-------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {
    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];

    if (!archivoLibros || !archivoLectores) {
        console.log("Error: Selecciona ambos archivos antes de importar.");
        return;
    }

    try {
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);

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

        // Mostrar los datos en las tablas
        mostrarLibros();
        mostrarLectores();
    } catch (error) {
        console.log("Error al leer los archivos.");
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
    let tabla = document.getElementById("comprobar-lectores-tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    arrayLectores.forEach(lector => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td>${lector.telefono}</td>
            <td>${lector.email}</td>
        `;
    });
}



// ------------------------------------------------ALTA LECTOR-------------------------------------------------------------
  // Añadir el evento de click al botón

  //0862	9781234567890	Juan Pérez	El Gran Libro!	Editorial XYZ	4
  document.getElementById('alta-libro-boton').addEventListener('click', () => {
    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;


    altaLibro(isbn, autor, titulo, editorial, ejemplares);
});




// ------------------------------------------------ACTUALIZAR VISTA-------------------------------------------------------------
// Función para actualizar la vista de libros en la tabla


// Evento para actualizar la vista cuando se haga clic en el botón
document.getElementById("vista-libros-boton").addEventListener("click", function() {
    actualizarVista(); // Llama a la función para actualizar la tabla
});


function actualizarVista() {
    const tabla = document.getElementById('vista-libros-tabla').querySelector('tbody');
    tabla.innerHTML = ""; // Limpiar tabla

    arrayLibros.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
        `;
        tabla.appendChild(fila);
    });
}


// ------------------------------------------------PRESTAMO-------------------------------------------------------------

document.getElementById('prestamo-boton').addEventListener( "click", function() {
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    solicitudPrestamo(numSocio, codLibro);

});

// ------------------------------------------------DEVOLCUION-------------------------------------------------------------

document.getElementById('devolucion-boton').addEventListener( "click", function(){
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    devolucionPrestamos(numSocio, codLibro)
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
    }
}

/*-------------------------------------------------------BOTON (prestamo) - Funciones-------------------------------------------------*/
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

function solicitudPrestamo(numSocio, codLibro) {

    //Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaPrestamo = fecha.toLocaleDateString('es-ES');
    let numPrestamo =  arrayPrestamos.length + 1; // Crear un número único para cada préstamo basado en el tamaño del array


    let existe = false;

    arrayLibros.forEach(libro => {
        if (libro.codLibro == codLibro && libro.ejemplares > 0 && libro.fechaBajaLibro == null) {
            existe = true;
        }
    });

    existe = false;

    arrayLectores.forEach(lector => {
        if (lector.numSocio == numSocio && lector.fechaBaja == null) {
            existe = true;
        }
    });

    if (existe == true) {
        if (prestamoLibro(codLibro) == true) {
            numPrestamo++;
            const prestamo = new Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, null);
            arrayPrestamos.push(prestamo);
            arrayPrestamosVivos.push(prestamo);
        }
    }
    console.log(arrayPrestamos);

    if (!existe) {
        console.log("La solicitud ha sido denegada");
    }

}

/*-------------------------------------------------------BOTON (devolucion) - Funciones-------------------------------------------------*/

function devolucionLibro(codLibro) {
   
    let prestado = false;

    arrayLibros.forEach(libros => {
        if (libros.codLibro == codLibro) {
            libros.ejemplares = parseInt(libros.ejemplares);
            console.log("Lista actualizada PRESTADO");
            libros.ejemplares += 1;
            prestado = true;
            console.log(arrayLibros);
        }
    });

    return prestado;
}

function devolucionPrestamos(numSocio, codLibro) {

   
    let fecha = new Date();
    let fechaDevolucion = fecha.toLocaleDateString('es-ES');

    let existeLibro = false;
    let existeLector = true;

    arrayLectores.forEach(lector => {
        if(lector.numSocio == numSocio){
            existeLector = true;
        }
    });

    arrayLibros.forEach(libro => {
        if(libro.codLibro == codLibro){
            existeLibro = true;
        }
    });

    if(existeLector && existeLibro){
        if(devolucionLibro(codLibro) == true){
        
            arrayPrestamosVivos.forEach(prestamo => {
                if(prestamo.numSocio == numSocio && prestamo.codLibro == codLibro){
                    prestamo.fechaDevolucion = fechaDevolucion;
                    console.log("--");
                    atributoNum = prestamo.numPrestamo;
                    arrayPrestamosVivos = arrayPrestamosVivos.filter(prestamoV => prestamoV.numPrestamo != atributoNum);
                }
            });
            console.log(arrayPrestamos);
        }
    }
    
}
