    
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
    mostrarContenido(contenido);

//----------------------------------CONSTRUCTORES------------------------------
//LECTORES
function Lectores(numSocio, nombre, apellido, telefono, email, bajaLector, Lector){
     this.numSocio = numSocio;
     this.nombre = nombre;
     this.apellido = apellido;
     this.telefono = telefono;
     this.email = email;
     this.bajaLector = bajaLector;
     this.Lector = Lector;
}
//LIBROS
function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, bajaLibro, fechaBajaLibro){
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares; 
    this.bajaLibro = bajaLibro;
    this.fechaBajaLibro = fechaBajaLibro;
}
//PRESTAMOS
function Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion){
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}


function Clasificacion(pasillo, estanteria, estante){
    this.pasillo = pasillo;
    this.estanteria = estanteria;
    this.estante = estante;
}


/*------------------------------------------------------------------------------*/



const prestamo = new Prestamos(1,465,2253, null, null );
Libros.__proto__=Prestamos;
Lectores.__proto__=Prestamos;

//Funcion dondeLibro
const manga = new Clasificacion(7,4,6);

// Prestamo solicitud contador
const arrayPrestamos = [];
let numPrestamo = 0;
/*------------------------------------------------------------------------------*/
// Separamos por lineas y retorno de carro
const lineas = contenido.split("\r\n"); 
const encabezado = lineas[0];

/*----------------------------------LEER CVS lectores-----------------------------*/
if (encabezado.includes("telefono") && encabezado.includes("email")) {

console.log("CSV - LECTORES");
 // Creamos conjunto
 arrayLectores = new Set(lineas);
 arrayLectores.delete("");
 // PASAR DE CONJUNTO A ARRAY
 arrayLectores = [...arrayLectores];

 arrayLectores.forEach(linea => {
    let dato = linea.split(",");
    let lector = new Lectores(dato[0],dato[1],dato[2], 
                              dato[3],dato[4], false , null );
    arrayLectores.push(lector);
 });

 console.log(arrayLectores);

}

/*----------------------------------LEER CVS libros-----------------------------*/
if (encabezado.includes("codLibro") && encabezado.includes("isbn")) {

console.log("CSV - LIBROS");

arrayLibros= new Set(lineas);

arrayLibros.delete("");
 // PASAR DE CONJUNTO A ARRAY
 arrayLibros = [...arrayLibros];

 arrayLibros.forEach(linea => {
    let dato = linea.split(",");
    let libro = new Libros(dato[0],dato[1],dato[2], 
                              dato[3],dato[4], dato[5], false, null);
    arrayLibros.push(libro);
    
 });
 console.log(arrayLibros);
}



/*----------------------------------------------------------------------------FUNCIONES lector-----------------------------------------------------------------------*/

//altaLector: Se preguntará por los datos de un nuevo lector, se comprobará que están todos y que son correctos; a continuación, se dará de alta

function  altaLector(){
    alert("USTED VA A DAR DE ALTA A UN NUEVO SOCIO");
    let numSocio = prompt("Introduce el NºSOCIO");
    let nombre = prompt("Introduce NOMBRE");
    let apellido = prompt("Introduce APELLIDO");
    let telefono = prompt("Introduce TELEFONO");
    let email = prompt("Introduce email");
    let lector = new Lectores(numSocio,nombre,apellido,telefono,email, false, null);
    arrayLectores.push(lector);
}

// altaLector()


//bajaLector: La baja se realizará añadiendo un campo de baja, en la información del lector que contendrá: bajaLector (true/false) y la fecha de baja.
//Se conservará toda la información del lector, para poder analizar los préstamos tanto antiguos como pendientes

function bajaLector(){

    alert("USTED VA A DAR DE BAJA A UN NUEVO SOCIO");
    let numSocio = prompt("Introduce el NºSOCIO a dar de baja");

    const fechaActual = new Date();

    arrayLectores.forEach(objeto => {
        if(objeto.numSocio == numSocio){
            objeto.bajaLector = true;
            objeto.fechaBaja = fechaActual;
        }
    });

}

// bajaLector();


// modifLector: Se utilizará para modificar cualquier dato del lector, sea porque ha cambiado o porque es incorrecto. 
// Se preguntará por el dato a modificar, se introducirá el nuevo dato y se actualizará

function modifLector(){
    alert("USTED VA A MODIFICAR  A UN  SOCIO");
    numSocio = prompt("Introduce el numeor de socio a MODIFICAR");

    arrayLectores.forEach(objeto => {
        if(objeto.numSocio == numSocio){
            atributo = prompt("Que valor quieres modificar");
            nuevoValor = prompt("Introduce nuevo valor");
            objeto[atributo]= nuevoValor;
        }
    });
}

// modifLector();


//comprobarEmails: Se comprobará si los email tienen un formato correcto y 
//se dará un listado de los que no son válidos (Lector + email)

function comprobarEmails(){
    const validarCorreo = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(es|com|net|fr|it|pt|org)$/;

    arrayLectores.forEach(lector => {
        if(!validarCorreo.test(lector.email)){
            console.log(`El lector ${lector.nombre} con correo ${lector.email} NO ES VALIDO`);
        }
    });

}
// comprobarEmails();  
function comprobarTelefonos(){

    const validarTelefono = /^[6789]\d{8}$/;

    arrayLectores.forEach(lector => {
        if(!validarTelefono.test(lector.telefono)){
            console.log(`El lector ${lector.nombre} con numero ${lector.telefono} NO ES VALIDO`);
        }
    });
}
// comprobarTelefonos();


/*----------------------------------------------------------------------------FUNCIONES libros-----------------------------------------------------------------------*/
//altaLibro: Se preguntará por los datos de un nuevo libro, se comprobará que están todos y que son correctos; a continuación, se dará de alta
function  altaLibro(){
    alert("USTED VA A DAR DE ALTA A UN NUEVO LIBRO");
    let autor = prompt("Introduzca el AUTOR");
    let codLibro = prompt("Introduzca el CODIGO");
    let editorial = prompt("Introduzca la EDITORIAL");
    let ejemplares = prompt("Introduzca el EJEMPLAR");
    let isbn = prompt("Introduzca el ISBN");
    let titulo = prompt("Introduzca el TITULO");
    let libro = new Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, false, null);
    arrayLibros.push(libro);
}

// altaLibro();


//bajaLibro: La baja se realizará añadiendo un campo de baja, en la información del libro que contendrá: bajaLibro (true/false) y 
//la fecha de baja. Se conservará toda la información del libro, para poder analizar los préstamos tanto antiguos como pendientes

function bajaLibro(){

    alert("USTED VA A DAR  DE BAJA UN LIBRO");

    let fecha = new Date();

    let codigo = prompt("INTRODUZCA EL CODIGO DEL LIBRO A DAR DE BAJA");


    arrayLibros.forEach(libro => {
        if(libro.codLibro == codigo){
            libro.bajaLibro = true;
            fechaBajaLibro = fecha;
        }

    });

}
// bajaLibro();


//ModifLibro: Se utilizará para modificar cualquier dato del libro, sea porque ha cambiado o porque es incorrecto. 
//Se preguntará por el dato a modificar, se introducirá el nuevo dato y se actualizará

function modifLibro(){

    alert("USTED VA A MODIFICAR UN LIBRO");
    let codigo = prompt("INTRODUZCA EL CODIGO DEL LIBRO A MODIFICAR");

    arrayLibros.forEach(libro => {
        if(libro.codLibro == codigo){           
            let atributo = prompt("Que atributo vas a modificar");
            let nuevoValor = prompt("Introduzca el nuevo valor");
            libro[atributo] = nuevoValor;
        }
    });
}
// modifLibro();


//hayLibro: se pasará un isbn, un autor o un título. Si está en la lista de libros, se devolverá: isbn + autor + autor + titulo + ejemplares disponibles 
//(como datos, no como string). En caso contrario, se devolverá un error

function hayLibro(){
    let dato = prompt("Introduzca el ISBN , autor o titulo");
    let encontrado = false;
    
    arrayLibros.forEach(libro => {
        if(libro.isbn == dato || libro.autor == dato || libro.titulo == dato){
            console.log("El ISBN del libro: " + libro.isbn + "\n" +
                        "El autor del libro: " + libro.autor + "\n" +
                        "El titulo del libro: " + libro.titulo + "\n" +
                        "Ejemplares disponibles: " + libro.ejemplares + "\n");
        encontrado = true;
        }
    });

    if(encontrado == false){
        console.log("Referencia no encontrada");
    }

}

// hayLibro();

//prestamoLibro: Se comprobará si existe el libro y hay ejemplares disponibles; en caso afirmativo, 
// se actualizarán los datos del libro reflejando el préstamo y se devolverá "prestado"; 
// en caso contrario, no se podrá prestar el libro y de sevolverá "no existente" o "no disponible"

function prestamoLibro(){

    let codLibro = prompt("Introduce el codigo del libro para prestar");
    let existe = false;


        arrayLibros.forEach(libro => {
            if(libro.codLibro == codLibro){ 
                libro.ejemplares = parseInt(libro.ejemplares); 
                console.log("Lista actualizada PRESTADO");
                libro.ejemplares -= 1;  
                console.log(arrayLibros);
                existe = true;
            }
        });

    if(existe == false){
        console.log("Libro no exsistente ");
    }

    return existe;
}

// prestamoLibro();



//devolucionLibro: Se comprobará que existe el libro; en caso afirmativo, 
// se aumentará el número de ejemplares disponibles

function devolucionLibro(){

    let codigo = prompt("Introduce el codigo del libro a devolver");
    let existe = false;
    
        arrayLibros.forEach(libro => {
            if(libro.codLibro == codigo){
                libro.ejemplares = parseInt(libro.ejemplares);
                libro.ejemplares += 1;
                existe = true;
                console.log("Libro devuelto con exito");
            }
        });

    if(existe == false){
        console.log("Libro no encontrado");
    }

    return existe;
}

// devolucionLibro();
//dondeLibro: Se preguntará por un isbn y se vevolverá: pasillo, estantería y estante

function dondeLibro(){

    let isbn = prompt("Introduzca el ISBN");
    let existe = false;

    arrayLibros.forEach(libro => {
        libro.__proto__=manga; 
        if(libro.isbn == isbn){
            console.log("LIBRO ENCONTRADO");
            console.log("Pasillo : " + libro.pasillo + "\n" + 
                        "Estanteria: " + libro.estanteria + "\n" + 
                        "Estante: " + libro.estante + "\n");
            existe = true;
        }
    });

    if(existe == false){
        console.log("Libro no encontrado");
    }

}

// dondeLibro();

/*----------------------------------------------------------------------------FUNCIONES prestamo-----------------------------------------------------------------------*/
//listadoTotalPrestamos: Se elaborará un listado de todos los préstamos, tanto vivos como devueltos. 
//Se proporcionará un listado con toda la información de cada préstamo en una línea
function listadoTotalPrestamos(){


    arrayPrestamos.forEach(prestamo => {

        if(prestamo.fechaDevolucion == null){
            console.log("PRESTAMOS VIVOS")
            console.log(
                "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
                "El NºSocio: " + prestamo.numSocio + "\n" +
                "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
                "Fecha prestamo: " + prestamo.fechaPrestamo + "\n");
        }else{
            console.log("PRESTAMOS DEVUELTOS");
            console.log(
                "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
                "El NºSocio: " + prestamo.numSocio + "\n" +
                "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
                "Fecha prestamo: " + prestamo.fechaPrestamo + "\n" +
                "Fecha devolucion: " + prestamo.fechaDevolucion + "\n");
            }
    });

}

//ListadoPrestamosVivos: Se elaborará un listado de todos los préstamos vivos. 
// Se proporcionará un listado con toda la información de cada préstamo en una línea

function ListadoPrestamosVivos(){
    if(prestamo.fechaDevolucion == null){
        console.log("PRESTAMOS VIVOS")
        console.log(
            "El NºPrestamo: " + prestamo.numPrestamo + "\n" +
            "El NºSocio: " + prestamo.numSocio + "\n" +
            "El CODIGO DEL LIBRO: " + prestamo.codLibro + "\n" +
            "Fecha prestamo: " + prestamo.fechaPrestamo + "\n");
    }
}


//solicitudPrestamo: Un préstamo se solicita incluyendo el número de socio y 
//el isbn o el código del libro. Se creará un nuevo préstamo si es posible realizarlo

function solicitudPrestamo(){

    let numSocio = prompt("Introduce numSocio");
    let codLibro = prompt("Introduce el codigo del libro");
    let fechaPrestamo = new Date();

    if(prestamoLibro() == true){
        numPrestamo++;
        const prestamo = new Prestamos(numPrestamo,numSocio,codLibro,fechaPrestamo, null);
        arrayPrestamos.push(prestamo);
    }

    console.log(arrayPrestamos);

}
// solicitudPrestamo();

//devolucionPrestamos: Cuando se devuelva un libro, se actualizará el registro del préstamo 
//con la fecha de devolución y se actualizará el registro del libro 

function devolucionPrestamos(){

    let numPrestamo = prompt("Introduce numero de prestamo");

    let fecha = new Date();

    if(devolucionLibro() == true){
        
        arrayPrestamos.forEach(prestamo => {
            if(prestamo.numPrestamo == numPrestamo){
                prestamo.fechaDevolucion = fecha;
                console.log("Préstamo devuelto con éxito.");
            }
        });
    } else {
        console.log("No se pudo realizar la devolución del préstamo.");
    }
}




}, false);