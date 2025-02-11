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


//----------------------------------------------------BOTONES-----------------------------------------------------------------

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



// ----------------------ALTA LECTOR----------------------------
  // Añadir el evento de click al botón
  document.getElementById('alta-libro-boton').addEventListener('click', () => {
    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;

    // Llamar a la función altaLibro y pasarle los valores
    altaLibro(isbn, autor, titulo, editorial, ejemplares);
});




// ------------------------------------------------ACTUALIZAR VISTA-------------------------------------------------------------
// Función para actualizar la vista de libros en la tabla


// Evento para actualizar la vista cuando se haga clic en el botón
document.getElementById("vista-libros-boton").addEventListener("click", function() {
    actualizarVista(); // Llama a la función para actualizar la tabla
});
function actualizarVista() {
    // Obtener el tbody de la tabla
    let tablaCuerpo = document.querySelector("#vista-libros-tabla tbody");

    // Limpiar el contenido actual de la tabla
    tablaCuerpo.innerHTML = "";

    // Recorrer el array de libros y agregar cada libro a la tabla
    arrayLibros.forEach(libro => {
        // Crear una fila para el libro
        let fila = document.createElement("tr");

        // Crear las celdas con la información del libro
        let celdaCodLibro = document.createElement("td");
        celdaCodLibro.textContent = libro.codLibro;

        let celdaIsbn = document.createElement("td");
        celdaIsbn.textContent = libro.isbn;

        let celdaAutor = document.createElement("td");
        celdaAutor.textContent = libro.autor;

        let celdaTitulo = document.createElement("td");
        celdaTitulo.textContent = libro.titulo;

        let celdaEditorial = document.createElement("td");
        celdaEditorial.textContent = libro.editorial;

        let celdaEjemplares = document.createElement("td");
        celdaEjemplares.textContent = libro.ejemplares;

        // Agregar las celdas a la fila
        fila.appendChild(celdaCodLibro);
        fila.appendChild(celdaIsbn);
        fila.appendChild(celdaAutor);
        fila.appendChild(celdaTitulo);
        fila.appendChild(celdaEditorial);
        fila.appendChild(celdaEjemplares);

        // Agregar la fila a la tabla
        tablaCuerpo.appendChild(fila);
    });
}
























/*-------------------------------------------------------FUNCIONES LECTORES-------------------------------------------------*/

function altaLector() {

    //Validaciones de variables
    let regexSocio = /^8[0-9]{2}$/;
    let nombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexTelefono = /^[6789]\d{8}$/;
    let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;

    //Solicitud de valores
    let numSocio = prompt("Introduce el NºSOCIO entre 800-899");
    let nombre = prompt("Introduce nombre");
    let apellido = prompt("Introduce apellido");
    let telefono = prompt("Introduce NºTelefono");
    let email = prompt("Introduce email");

    //Activar si existe valor nulo o no cumple con la logica de negocio
    let errorF = false;
    let errorV = false;

    //Validar valores vacios
    if (numSocio == null || nombre == null || apellido == null || telefono == null || email == null) {
        errorF = true;
        //Validar logica de negocio
    } else if (!regexSocio.test(numSocio) || !nombreApellido.test(nombre) || !nombreApellido.test(apellido) ||
        !regexTelefono.test(telefono) || !regexEmail.test(email)) {
        errorV = true; 
    }

    //Imprimri errores si viola la logica de negocio
    if (errorF == true) {
        alert("F --> No pueden existir datos vacios")
    } else if (errorV == true) {
        alert("V --> El formato de algun dato es incorrecto")
    }

    //Si no existe errores instanciar objeto en el listado de Lectores
    if (errorF == false && errorV == false) {
        const lector = new Lectores(numSocio, nombre, apellido, telefono, email, false, null);
        arrayLectores.push(lector);
    }
    console.log(arrayLectores);

}

function bajaLector() {

    let numSocio = prompt("Introduzca el NºSOCIO a dar de baja");

    //Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaEspañol = fecha.toLocaleDateString('es-ES');

    //Si no encuentra el NºSOCIO salta el mensaje de error
    let encontrado = false;

    arrayLectores.forEach(lector => {
        //Comprobar que existe
        if (lector.numSocio == numSocio) {
            //Confirmar baja
            lector.bajaLector = true;
            lector.fechaBajaLibro = fechaEspañol;
            //Imprimri datos actualizados por consola
            console.log("DATOS ACTUALIZADOS " + lector.nombre + " HA SIDO DADO DE BAJA");
            console.log(arrayLectores);
            //Error no se cumplira
            encontrado = true;
        }
    });
    if (!encontrado) {
        console.log("E --> No se ha encontrado ningun socio con ese numero")
    }


}

function modifLector() {

    let numSocio = prompt("Introduzca el NºSOCIO a modficiar");

    //Si no encuentra el NºSOCIO salta el mensaje de error
    let encontrado = false;

    arrayLectores.forEach(lector => {
        if (lector.numSocio == numSocio) {
            //PEDIR VALORES Y MODIFICAR
            atributo = prompt("Introduzca el atributo a modificar");
            nuevoValor = prompt("Introduzca el nuevo valor");
            lector[atributo] = nuevoValor;
            //IMPRIMIR LISTA
            console.log("LISTA ACTUALIZADA");
            console.log(arrayLectores);
            //ERROR NO SALTA
            encontrado = true;
        }
    });
    if (!encontrado) {
        console.log("E --> No se ha encontrado ningun socio con ese numero")
    }

}

function verificarEmail(email) {

    let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;
    return regexEmail.test(email);
}

function verificarTelefono(telefono) {

    let regexTelefono = /^[6789]\d{8}$/;
    return regexTelefono.test(telefono);
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

function altaLibro(isbn, autor, titulo, editorial, ejemplares) {
    // Generar código de libro
    let codLibro = Math.floor(Math.random() * 900) + 100; 
    codLibro = `0${codLibro}`; // Añade un 0 al principio
  
    // Validaciones de variables
    let regexCod = /^0[0-9]{3}$/;
    let regexISBN = /^\d{13}$/; // Cambiado para validar un ISBN de 13 dígitos numéricos
    let regexAutor = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexTitulo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+)*$/;
    let regexEditorial = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexEjemplares = /^[1-9][0-9]*$/;  // Asegura que el número sea mayor que 0


    // Validaciones de campos
    let errorF = false;
    let errorV = false;

    // Validar si los campos están vacíos
    if (!isbn || !autor || !titulo || !editorial || !ejemplares) {
        errorF = true;
    }

    // Validar formato de los datos
    if (!regexCod.test(codLibro) || !regexISBN.test(isbn) || !regexAutor.test(autor) ||
        !regexTitulo.test(titulo) || !regexEditorial.test(editorial) || !regexEjemplares.test(ejemplares)) {
        errorV = true;
    }

    // Imprimir errores si viola la lógica de negocio
    if (errorF) {
        alert("F --> No pueden existir datos vacíos");
    } else if (errorV) {
        alert("V --> El formato de algún dato es incorrecto");
    }

    // Si no existen errores, crear el libro y agregarlo al array
    if (!errorF && !errorV) {
        // Crear el objeto de libro
        const libro = new Lectores(codLibro, isbn, autor, titulo, editorial, ejemplares, false, null);

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
        actualizarVista();
    }
}



function bajaLector() {

    let codLibro = prompt("Introduzca el codigo del libro a dar de baja");

    //Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaEspañol = fecha.toLocaleDateString('es-ES');

    //Si no encuentra el NºSOCIO salta el mensaje de error
    let encontrado = false;

    arrayLibros.forEach(libro => {
        //Comprobar que existe
        if (libro.codLibro == codLibro) {
            //Confirmar baja
            libro.bajaLibro = true;
            libro.fechaBajaLibro = fechaEspañol;
            //Imprimri datos actualizados por consola
            console.log("DATOS ACTUALIZADOS " + libro.titulo + " HA SIDO DADO DE BAJA");
            console.log(arrayLibros);
            //Error no se cumplira
            encontrado = true;
        }
    });
    if (!encontrado) {
        console.log("E --> No se ha encontrado ningun codigo con ese numero")
    }


}

/*
*
*
*
*FALTA VALIDAR ATRIBUTO EN MODIFLIBRO
*
*
*
*
*/

function modifLibro() {

    let codLibro = prompt("Introduzca el codigo del libro a modficiar");

    //Si no encuentra el codigo salta el mensaje de error
    let encontrado = false;

    arrayLibros.forEach(libro => {
        if (libro.codLibro == codLibro) {
            //PEDIR VALORES Y MODIFICAR
            atributo = prompt("Introduzca el atributo a modificar");
            nuevoValor = prompt("Introduzca el nuevo valor");
            libro[atributo] = nuevoValor;
            //IMPRIMIR LISTA
            console.log("LISTA ACTUALIZADA");
            console.log(arrayLibros);
            //ERROR NO SALTA
            encontrado = true;
        }
    });
    if (!encontrado) {
        console.log("E --> No se ha encontrado ningun codigo con ese numero")
    }

}

function hayLibro() {

    let codLibroISBN = prompt("Introduce el ISBN o el codigo del libro a buscar");
    let existe = false;

    arrayLibros.forEach(libro => {
        if ((libro.codLibro == codLibroISBN || libro.isbn == codLibroISBN) && libro.bajaLibro == false) {
            existe = true;
        }
    });
    return existe;
}

function prestamoLibro() {

    let codLibro = prompt("Introduce el codigo del libro");
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

function devolucionLibro() {
    let codLibro = prompt("Introduce el codigo del libro");
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

function dondeLibro() {
    let codLibro = prompt("Introduce el codigo del libro");
    let encontrado = false;


    arrayLibros.forEach(libro => {

        if (libro.codLibro == codLibro) {
            console.log("Pasillo " + libro.pasillo +
                ", Estantería " + libro.estanteria +
                ", Estante " + libro.estante);
            encontrado = true;
        }
    });

    if (encontrado == false) {
        console.log("No se encontro el libro");
    }
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

function solicitudPrestamo() {

    let numSocio = prompt("Introduce numSocio");
    let codLibro = prompt("Introduce el codigo del libro");
    //Crear fecha y aplicar formato
    let fecha = new Date();
    let fechaPrestamo = fecha.toLocaleDateString('es-ES');
    let numPrestamo = 0;

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

    if (existe = true) {
        if (prestamoLibro() == true) {
            numPrestamo++;
            const prestamo = new Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, null);
            arrayPrestamos.push(prestamo);
        }
    }
    console.log(arrayPrestamos);

    if (!existe) {
        console.log("La solicitud ha sido denegada");
    }

}

function devolucionPrestamos() {

    let numSocio = prompt("Introduce numSocio");
    let codLibro = prompt("Introduce el código del libro");
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
        if(devolucionLibro() == true){
        
            arrayPrestamos.forEach(prestamo => {
                if(prestamo.numSocio == numSocio && prestamo.codLibro == codLibro){
                    prestamo.fechaDevolucion = fechaDevolucion;
                }
            });
            console.log(arrayPrestamos);
        }
    }
    
}





 










































