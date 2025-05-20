
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
function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares) {
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
}

//LECTORES
function Lectores(numSocio, nombre, apellido, telefono, email) {
    this.numSocio = numSocio;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
}

//PRESTAMOS
function Prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion) {
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}

// Variables globales
const arrayLibros = [];
const arrayLectores = [];
const arrayPrestamos = [];



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------BOTONES------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------IMPORTAR-------------------------------------------------------------
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
        
       
    }else {
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
        const contenidoPrestamos = await leerArchivo(archivoPrestamos);

        console.log("Importación exitosa.");

        // Convertir CSV en objetos y agregarlos a los arrays
        contenidoLibros.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] !== "codLibro" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let libro = new Libros(dato[0], dato[1], dato[2],
                    dato[3], dato[4], dato[5]);
            arrayLibros.push(libro);
                
            }
        });

        contenidoLectores.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let lector = new Lectores(dato[0], dato[1], dato[2], dato[3], dato[4]);
                arrayLectores.push(lector);
            }
            
        });

        contenidoPrestamos.split("\r\n").forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numPrestamos" && dato.every(d => d.trim() !== "" && d !== "undefined")) {  // Validación extra
                let prestamos = new Prestamos(dato[0], dato[1], dato[2], dato[3], dato[4]);
                arrayPrestamos.push(prestamos);
            }
            
        });

        mensaje = "Importacion exitosa";
       
    }

    console.log(arrayLectores);
    console.log(arrayLibros);
    console.log(arrayPrestamos);


    mensajeHTML = document.createElement('p');
    mensajeHTML.id = 'importar-mensajeError';
    
    mensajeHTML.innerHTML = mensaje;
    mensajeHTML.style.color="red";
    document.getElementById('importar-boton').appendChild(mensajeHTML);

});


