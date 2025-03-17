//Introduccion 
    //Expresiones regualres
//Tarea 1
    //funcion importar()
//Tarea 2
    // #F0E97A correcto
    // #EF6902 incorrecto
// Variables globales

arrayArticulos =  [];
arrayAsterix =[];
arrayCajaSorpresa = [];
arrayStarWars = [];



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

//Asterix
function Articulo(sku, nombreArticulo, precio, numArticulos, imagen) {
    this.sku  = sku;
    this.nombreArticulo = nombreArticulo;
    this.precio = precio;
    this.numArticulos = numArticulos;
    this.imagen = imagen;
}

function articuloAsterix(tipoObjeto, sku, nombreArticulo, precio,  numArticulos,imagen  ){
    this.sku = sku;
    this.nombreArticulo = nombreArticulo;
    this.precio = precio;
    this.numArticulos = numArticulos;
    this.imagen = imagen;
    this.tipoObjeto = tipoObjeto;
    
}

function articuloCajaSorpresa(tematica , sku, nombreArticulo, precio,    numArticulos,imagen){
    this.sku  = sku;
    this.nombreArticulo = nombreArticulo;
    this.precio = precio;
    this.numArticulos = numArticulos;
    this.imagen = imagen;
    this.tematica = tematica;
    
}

function articuloStarWars(protagonista, sku, nombreArticulo,  precio, numArticulos ,imagen){
    this.sku  = sku;
    this.nombreArticulo = nombreArticulo;
    this.precio = precio;
    this.numArticulos = numArticulos;
    this.imagen = imagen;
    this.protagonista = protagonista;
    
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------BOTONES------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------1. IMPORTAR-------------------------------------------------------------
document.getElementById('importar-boton').addEventListener('click', async () => {

     

    const archivoAsterix = document.getElementById('importar-input-asterix').files[0];
    const archivoCajaSorpresa = document.getElementById('importar-input-cajasorpresa').files[0];
    const archivoStarWars = document.getElementById('importar-input-starwars').files[0];

    const contenidoAsterix = await leerArchivo(archivoAsterix);
    const contenidoCajaSorpresa = await leerArchivo(archivoCajaSorpresa);
    const contenidoStarWars = await leerArchivo(archivoStarWars);

        console.log("Importación exitosa.");


        contenidoAsterix.split("\r\n").forEach(linea => {
            let dato = linea.split(":");
            if (dato[0] !== "Tipo de Objeto"
                && dato.every(d => d.trim() !== "" && d !== "undefined")) {  
                let asterix = new articuloAsterix(dato[0], dato[1], dato[2],dato[3], dato[4], dato[5]);
                arrayAsterix.push(asterix);
            }
        });

        contenidoCajaSorpresa.split("\r\n").forEach(linea => {
            let dato = linea.split(":");
            if (dato[0] != "Temática" 
                && dato.every(d => d.trim() !== "" && d !== "undefined")) { 
                let cajaSorpresa = new articuloCajaSorpresa(dato[0], dato[1], dato[2], dato[3], dato[4], dato[5]);
                arrayCajaSorpresa.push(cajaSorpresa);
            }
            
        });

        contenidoStarWars.split("\r\n").forEach(linea => {
            let dato = linea.split(":");
            if (dato[0] != "Protagonista"
                && dato.every(d => d.trim() !== "" && d !== "undefined")) {  
                let starWars = new articuloStarWars(dato[0], dato[1], dato[2], dato[3], dato[4], dato[5]);
                arrayStarWars.push(starWars);
            }
            
        });

        console.log(arrayAsterix);
        console.log(arrayCajaSorpresa);
        console.log(arrayStarWars);
    
        arrayArticulos = [...arrayAsterix, ...arrayCajaSorpresa, ...arrayStarWars];
        console.log(arrayArticulos);

       
});


// ------------------------------------------------2. Vista Articulo-------------------------------------------------------------

document.addEventListener('keyup', function(event) {
    // Al soltar la tecla "$", se genera un evento de teclado. Este evento tiene event.key = '$'
    if (event.key == '$') {
        mostrarArticulos();
    }
    }
    );
//Tarea 2
    // #F0E97A correcto
    // #EF6902 incorrecto
function mostrarArticulos() {
    let tabla = document.getElementById('vista-articulos-tabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    arrayArticulos.forEach(articulo => {
        let fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${articulo.sku}</td>
            <td>${articulo.nombreArticulo}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.numArticulos}</td>
            <td>${articulo.imagen}</td>
        `;
   

    // Aplicar estilos a las celdas
    const celdas = fila.querySelectorAll('td');
    celdas.forEach(celda => {
        celda.style.outline = '1px solid #1B1B1B'; // Outline para cada celda
        celda.style.color = '#1B1B1B'; // Color del texto
        celda.style.padding = '10px'; // Padding de las celdas
        celda.style.textAlign = 'left'; // Alineación del texto
        celda.style.backgroundColor = '#F0E97A'; // Fondo de las celdas
    });


    // Validar y aplicar colores para teléfono y email
    // if (!validarSku(articulo.sku)) {
    //     fila.querySelector('td:nth-child(1)').style.backgroundColor = '#EF6902'; 
    // }else{
    //     fila.querySelector('td:nth-child(1)').style.backgroundColor = '#F0E97A';
    // }

    // if (!validarNombreArchivo(articulo.nombreArticulo)) {
    //     fila.querySelector('td:nth-child(2)').style.backgroundColor = '#EF6902'; 
    // }else{
    //     fila.querySelector('td:nth-child(2)').style.backgroundColor = '#F0E97A';
    // }
   

    // if (!validarPrecio(articulo.precio)) {
    //     fila.querySelector('td:nth-child(3)').style.backgroundColor = '#EF6902'; 
    // }else{
    //     fila.querySelector('td:nth-child(3)').style.backgroundColor = '#F0E97A';
    // }
   
    // if (!validarNumArticulo(articulo.numArticulos)) {
    //     fila.querySelector('td:nth-child(4)').style.backgroundColor = '#EF6902'; 
    // }else{
    //     fila.querySelector('td:nth-child(4)').style.backgroundColor = '#F0E97A';
    // }
   
    // if (!validarImagen(articulo.imagen)) {
    //     fila.querySelector('td:nth-child(5)').style.backgroundColor = '#EF6902'; 
    // }else{
    //     fila.querySelector('td:nth-child(5)').style.backgroundColor = '#F0E97A';
    // }
   

  

});


}

// function validarSku(sku){
//     let regexSku;
//     return regexSku.test(sku);
// }


// function validarNombreArchivo(nombreArchivo){
//     let regexNombreArchivo;
//     return regexNombreArchivo.test(nombreArchivo);
// }


// function validarPrecio(precio){
//     let regexPrecio;
//     return regexPrecio.test(precio);
// }


// function validarNumArticulo(numArticulo){
//     let regexNumArticulo;
//     return regexNumArticulo.test(numArticulo);
// }

// function validarImagen(imagen){
//     let regexImagen;
//     return regexImagen.test(imagen);
// }


// ------------------------------------------------3. ALTA ARTICULO-------------------------------------------------------------



document.getElementById('alta-articulo-boton').addEventListener('click', () => {
    
 
     const tipoArticulo = document.getElementById('alta-articulo-tipo').value;
     const dato = document.getElementById('alta-articulo-especifico').value;

     const sku = document.getElementById('alta-articulo-sku').value;
     const nombreArticulo = document.getElementById('alta-articulo-nombre').value;
     const precio = document.getElementById('alta-articulo-precio').value;
     const numArticulos = document.getElementById('alta-articulo-numero').value;
     const imagen = document.getElementById('alta-articulo-imagen').value;
 
     
     altaArticulo(tipoArticulo, dato, sku, nombreArticulo, precio, numArticulos, imagen)
      
 });
 
 function altaArticulo(tipoArticulo, dato, sku, nombreArticulo, precio, numArticulos, imagen) {
    

     // Eliminar mensaje previo si existe
     const mensajePrevio = document.getElementById("alta-mensaje");
     if (mensajePrevio) mensajePrevio.remove();

   
   
    
    let estado = "0";
    let mensaje = "";

    // if(!regexArticulo.test(tipoArticulo) || !regexDato.test(dato) || !regexSku.test(sku) || 
    // regexNombreArticulo.test(nombreArticulo)  || !regexPrecio.test(precio)  || !regexnumArticulo.test(numArticulo)  || 
    // !regexImg.test(regexImg)){
    //     estado = "-2";



    if(tipoArticulo == null || dato == null ||  sku == null || nombreArticulo == null || precio == null || numArticulos == null || imagen== null){
        estado = "-1";
        mensaje = "Falta argumentos";
    }

    if(tipoArticulo !== "Asterix" || tipoArticulo !== "CajaSorpresa" || tipoArticulo !== "StarWars"){
        estado = "-3";
        mensaje = "El tipo de artículo no es válido";
    }


    if(tipoArticulo == "Asterix"){
        let asterix = new articuloAsterix(sku, nombreArticulo, precio, numArticulos, imagen,dato);
        arrayAsterix.push(asterix);
        console.log(arrayAsterix); 
        estado = "0";
        mensaje = "Alta realizada correctamente";

    }else if(tipoArticulo == "CajaSorpresa"){
        let cajaSorpresa = new articuloCajaSorpresa(sku, nombreArticulo, precio, numArticulos, imagen, dato);
        arrayCajaSorpresa.push(cajaSorpresa);
        console.log(arrayCajaSorpresa);  
        estado = "0";
        mensaje = "Alta realizada correctamente";
    }else if(tipoArticulo == "StarWars"){
        let starWars = new articuloStarWars(sku, nombreArticulo, precio, numArticulos, imagen, dato)
        arrayFiltros.push(starWars);
        console.log(arrayFiltros); 
        estado = "0";
        mensaje = "Alta realizada correctamente";
    }

    arrayArticulos = [...arrayAsterix, ...arrayCajaSorpresa, ...arrayStarWars];
                

     // Crear elemento para mostrar mensaje
    let  mensajeElemento = document.createElement("p");
     mensajeElemento.id = "alta-mensaje";
     mensajeElemento.innerHTML = mensaje;
     document.getElementById("alta-articulo").append(mensajeElemento);


 

    document.getElementById('alta-articulo-tipo').value = "";
    document.getElementById('alta-articulo-especifico').value= "";

    document.getElementById('alta-articulo-sku').value= "";
    document.getElementById('alta-articulo-nombre').value= "";
    document.getElementById('alta-articulo-precio').value= "";
    document.getElementById('alta-articulo-numero').value= "";
    document.getElementById('alta-articulo-imagen').value= "";
 

    return estado;
 
}
 
// ------------------------------------------------4 Añadir unidades------------------------------------------------------------

document.getElementById('add-units-boton').addEventListener('click', function(){
    numSku = document.getElementById('add-units-sku').value;
    unidades = document.getElementById('add-units-numero').value;

    anadirUnidades(numSku, unidades);

});

function anadirUnidades(numSku, unidades){

     // Eliminar mensaje previo si existe
     const mensajePrevio = document.getElementById("añadir-mensaje");
     if (mensajePrevio) mensajePrevio.remove();


    let estado = "0";
    let mensaje = "";
    let articuloCantidad = 0;
    let skuSave = "";
    arrayArticulos.forEach(articulo => {

        if(articulo.sku == numSku){
            articulo.numArticulos=parseInt(articulo.numArticulos)+parseInt(unidades); 
            console.log("Añadidio");
            estado = "0";
            mensaje = "Unidades añadidas correctamente";
            articuloCantidad = parseInt(articulo.numArticulos);
            skuSave = articulo.sku;
        }
        
    });

    if(articuloCantidad < 0){
        mensaje = "Numero de articulos < 0";
    }
    if(skuSave == null){
        mensaje = "No existe el SKU introducido";
    }
 
    // Crear elemento para mostrar mensaje
    let  mensajeElemento = document.createElement("p");
     mensajeElemento.id = "añadir-mensaje";
     mensajeElemento.innerHTML = mensaje;
     document.getElementById("add-units").append(mensajeElemento);


    console.log(arrayArticulos);
    console.log(arrayAsterix);

    return estado;
}

// ------------------------------------------------5 Imagenes------------------------------------------------------------

// ASTERIX

document.getElementById('imagenes-asterix').addEventListener("mouseenter", function() {
   
    mostrarImagen();
});


document.getElementById('imagenes-asterix').addEventListener("mouseleave", function() {
    
    desacerImagen()
});

function mostrarImagen(){

     
        const nombreImagen = "images/Asterix.jpg";

		let image_container = document.querySelector('.cuadro');

		let imgElem = document.createElement("img");
            imgElem.id = "añade-img";
			imgElem.setAttribute("src", nombreImagen);
			imgElem.setAttribute("height", "350");
			imgElem.setAttribute("width", "350");
			image_container.append(imgElem);
}

function desacerImagen(){
// Eliminar
    const mensajePrevio = document.getElementById("añade-img");
    if (mensajePrevio) mensajePrevio.remove();
}