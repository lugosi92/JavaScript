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

function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, bajaLibro, fechaBajaLibro, clasificacion){
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares; 
    this.bajaLibro = bajaLibro;
    this.fechaBajaLibro = fechaBajaLibro;
    this.clasificacion = manga;
}

function Clasificacion(pasillo, estanteria, estante){
    this.pasillo = pasillo;
    this.estanteria = estanteria;
    this.estante = estante;
}
const manga = new Clasificacion(7,4,6);

const arrayLibros = [];
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
        if(dato[0] != "codLibro"){
            let libro = new Libros(dato[0],dato[1],dato[2], 
                                    dato[3],dato[4], dato[5], false, null);
            arrayLibros.push(libro);
        }
     });
     
console.log(arrayLibros);
});