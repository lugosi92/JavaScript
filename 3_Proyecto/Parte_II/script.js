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
//----------------------------------CONSTRUCTORES------------------------------

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

//Funcion dondeLibro
const manga = new Clasificacion(7, 4, 6);

const arrayLibros = [];
const arrayLectores = [];
const arrayPrestamos = [];





/*-------------------------------------------------------LEER CVS LIBROS-------------------------------------------------*/
//Guardamos en una variable libros donde se ubica en elHTML
let libros = document.getElementById('importar-input-libros');

//Evento, escuchando si existe algun cambio en la variable libro
libros.addEventListener('change', async (e) => {

    /*-----------------BLOQUE 1-----------------*/
    // Obtiene el primer archivo seleccionado en el input de tipo "file"
    const archivo = e.target.files[0];

    // Verifica si no se seleccionó ningún archivo y detiene la ejecución si es el caso
    if (!archivo) {
        return;
    }

    // Lee el contenido del archivo de forma asíncrona y lo almacena en una variable
    const contenidoLibros = await leerArchivo(archivo);

    /*-----------------BLOQUE 2-----------------*/
    //Separa las lineas, borra duplicados y espacios en blanco
    const lineas = contenidoLibros.split("\r\n");
    conjuntoLibros = new Set(lineas);
    conjuntoLibros.delete("");

    /*-----------------BLOQUE 3-----------------*/
    //Recorremos el conjutnoLectores y lo agregamos en un array de objetos separando los datos por ","
    conjuntoLibros.forEach(linea => {
        let dato = linea.split(",");
        if (dato[0] != "codLibro") {
            let libro = new Libros(dato[0], dato[1], dato[2],
                dato[3], dato[4], dato[5], false, null, manga);
            arrayLibros.push(libro);
        }
    });

    console.log(arrayLibros);
});

/*-------------------------------------------------------LEER CVS LECTORES-------------------------------------------------*/
let lectores = document.getElementById('importar-input-lectores');

lectores.addEventListener('change', async (e) => {
    /*-----------------BLOQUE 1-----------------*/
    // Obtiene el primer archivo seleccionado en el input de tipo "file"
    const archivo = e.target.files[0];

    // Verifica si no se seleccionó ningún archivo y detiene la ejecución si es el caso
    if (!archivo) {
        return;
    }

    // Lee el contenido del archivo de forma asíncrona y lo almacena en una variable
    const contenidoLectores = await leerArchivo(archivo);


    /*-----------------BLOQUE 2-----------------*/
    //Separa las lineas, borra duplicados y espacios en blanco
    const lineas = contenidoLectores.split("\r\n");
    conjuntoLectores = new Set(lineas);
    conjuntoLectores.delete("");

    /*-----------------BLOQUE 3-----------------*/
    //Recorremos el conjutnoLectores y lo agregamos en un array de objetos separando los datos por ","
    conjuntoLectores.forEach(linea => {
        let dato = linea.split(",");

        if (dato[0] != "numSocio") {
            let lector = new Lectores(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
            arrayLectores.push(lector);
        }
    });

    console.log(arrayLectores);
});


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
        errorV = true; 800
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

function altaLibro() {

    //Validaciones de variables
    let regexCod = /^0[0-9]{3}$/;
    let regexISBN = /^[a-zA-Z]{13}$/;
    let regexAutor = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexTitulo = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9-_*¡!@#$%&/()¿?€.,;:]+)*$/;
    let regexEditorial = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ-]+)?$/;
    let regexEjemplares = /^[0-9]$/;


    //Solicitud de valores
    let codLibro = prompt("Introduce el codigo de libro");
    let isbn = prompt("Introduce ISBN");
    let autor = prompt("Introduce autor");
    let titulo = prompt("Introduce el titulo");
    let editorial = prompt("Introduce la editorial");
    let ejemplares = prompt("Introduce numero de ejemplares");


    //Activar si existe valor nulo o no cumple con la logica de negocio
    let errorF = false;
    let errorV = false;

    //Validar valores vacios
    if (codLibro == null || isbn == null || autor == null || titulo == null || editorial == null || ejemplares == null) {
        errorF = true;
        //Validar logica de negocio
    } else if (!regexCod.test(codLibro) || !regexISBN.test(isbn) || !regexAutor.test(autor) ||
        !regexTitulo.test(titulo) || !regexEditorial.test(editorial) || !regexEjemplares.test(ejemplares)) {
        errorV = true; 800
    }

    //Imprimri errores si viola la logica de negocio
    if (errorF == true) {
        alert("F --> No pueden existir datos vacios")
    } else if (errorV == true) {
        alert("V --> El formato de algun dato es incorrecto")
    }

    //Si no existe errores instanciar objeto en el listado de Lectores
    if (errorF == false && errorV == false) {
        const libro = new Lectores(codLibro, isbn, autor, titulo, editorial, ejemplares, false, null);
        arrayLibros.push(libro);
    }
    console.log(arrayLibros);

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





 










































