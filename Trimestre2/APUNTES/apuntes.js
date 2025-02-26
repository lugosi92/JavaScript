//-------------------------------CALLBACKS----------------------------------------

// Definimos una función que acepta un callback como parámetro
function saludar(nombre, callback) {
  console.log("Hola, " + nombre);
  callback(); // Llamamos a la función que se pasa como argumento
}

// Definimos el callback
function despedir() {
  console.log("Adiós!");
}

// Usamos el callback
saludar("Carlos", despedir); // Imprime "Hola, Carlos" y luego "Adiós!"
// Explicación:
// La función saludar toma un nombre y un callback como parámetros.
// Después de imprimir "Hola, Carlos", ejecuta el callback, que en este caso es la función despedir.
// El callback se ejecuta después de que la tarea principal (saludar) se haya completado.


function obtenerDatos(callback) {
  setTimeout(() => {  // Simula una operación asíncrona
    const datos = { nombre: "Carlos", edad: 30 };
    callback(datos);  // Llamamos al callback una vez obtenidos los datos
  }, 2000);
}

obtenerDatos(function(datos) {
  console.log("Datos obtenidos: ", datos);
});

//------------------------------BOM-------------------------------------
//------------------------------WINDOW-------------------------------------


// window.innerWidth y window.innerHeight: Las dimensiones internas de la ventana del navegador.
// window.location: Representa la URL actual del navegador y permite cambiar de página.
// window.alert(): Muestra una alerta en la ventana del navegador.
// window.setTimeout() y window.setInterval(): Permiten ejecutar funciones después de un cierto tiempo o de manera repetitiva.

// Ejemplo con window:
window.alert("¡Hola Mundo!"); // Muestra una alerta


//------------------------------NAVIGATOR-------------------------------------


// navigator.userAgent: Información del agente de usuario (tipo de navegador).
// navigator.language: El idioma configurado en el navegador.
// navigator.onLine: Devuelve true si el navegador está conectado a Internet.
// navigator.geolocation: Permite acceder a la ubicación geográfica del usuario (si este lo permite).

// Ejemplo con navigator:
console.log(navigator.userAgent); // Muestra el agente de usuario (navegador)


//------------------------------SCREEN-------------------------------------

// screen.width y screen.height: La resolución total de la pantalla.
// screen.availWidth y screen.availHeight: La resolución disponible en la pantalla (sin la barra de tareas o menús del sistema).
// screen.colorDepth: La profundidad de color de la pantalla.

// Ejemplo con screen:
console.log(screen.width); // Muestra el ancho total de la pantalla


//------------------------------SCREEN-------------------------------------


// location.href: La URL completa de la página actual.
// location.hostname: El nombre del host de la página (sin el protocolo).
// location.pathname: El nombre del archivo en la URL.
// location.search: La cadena de consulta (parametros) en la URL.
// location.hash: El fragmento de la URL después del #

// location.reload(): Recarga la página.
// location.replace(): Redirige a otra URL reemplazando la URL actual.

// Ejemplo con location:
console.log(location.href); // Muestra la URL completa
location.href = "https://www.example.com"; // Redirige a una nueva URL


//------------------------------HISTORY-------------------------------------


// history.back(): Va a la página anterior en el historial.
// history.forward(): Va a la siguiente página en el historial.
// history.go(): Permite ir a una página específica en el historial.

// Ejemplo con history:
history.back(); // Regresa a la página anterior en el historial


//------------------------------CONSOLE-------------------------------------


// console.log(): Muestra un mensaje en la consola.
// console.error(): Muestra un mensaje de error en la consola.
// console.warn(): Muestra un mensaje de advertencia en la consola.
// console.info(): Muestra un mensaje informativo.


/*------------------------------DOM-------------------------------------*/
//------------------------------DOCUMENT-------------------------------------


// Acceder a los elementos HTML usando métodos como getElementById, getElementsByClassName, getElementsByTagName, etc.
// Modificar los elementos del DOM, como cambiar el texto de un h1, añadir nuevas etiquetas o eliminar elementos.
// Crear nuevos nodos y estructuras dentro del DOM.

// Cambiar el contenido de un elemento con id 'titulo'
document.getElementById('titulo').textContent = 'Nuevo Título';

// Crear un nuevo elemento
const nuevoElemento = document.createElement('div');
nuevoElemento.textContent = 'Este es un nuevo div';
document.body.appendChild(nuevoElemento); // Añadir el nuevo div al cuerpo de la página



//------------------------------NODETYPE-------------------------------------


// 1 (ELEMENT_NODE): Representa un elemento HTML o XML (como <div>, <p>, <span>, etc.).
// 3 (TEXT_NODE): Representa el texto dentro de un nodo de elemento.
// 8 (COMMENT_NODE): Representa un comentario HTML (como <!-- Esto es un comentario -->).
// 9 (DOCUMENT_NODE): Representa el documento en sí, o sea, el nodo raíz del DOM.
// 10 (DOCUMENT_TYPE_NODE): Representa la declaración del tipo de documento (como <!DOCTYPE html>).
// 11 (DOCUMENT_FRAGMENT_NODE): Representa un fragmento de documento, que es una parte del DOM que no está aún unido al árbol principal.

// Accedemos a un nodo
const nodo = document.getElementById('titulo');

// Comprobamos el tipo de nodo
if (nodo.nodeType === 1) {
    console.log('Es un nodo de tipo ELEMENT_NODE');
} else if (nodo.nodeType === 3) {
    console.log('Es un nodo de tipo TEXT_NODE');
}


//------------------------------NODELIST-------------------------------------

// Un NodeList es una colección de nodos que resulta de ejecutar métodos de búsqueda en el DOM. A menudo, 
// cuando usamos métodos como getElementsByTagName, getElementsByClassName, o querySelectorAll, obtenemos un NodeList.

// Obtener todos los párrafos de la página
const parrafos = document.getElementsByTagName('p');

// Iterar sobre el NodeList y cambiar el texto
for (let i = 0; i < parrafos.length; i++) {
    parrafos[i].textContent = 'Nuevo texto del párrafo';
}


//------------------------------ACCEDER AL DOM-------------------------------------

let elemento = document.getElementById('miElemento'); 

let parrafos = document.getElementsByTagName('p');

let items = document.getElementsByClassName('miClase');

let primerElemento = document.querySelector('.miClase'); // Obtiene el primer elemento con la clase 'miClase'


let todosLosItems = document.querySelectorAll('.miClase');


//------------------------------MANIPULAR EL DOM-------------------------------------

let parrafo = document.getElementById('miParrafo');
parrafo.textContent = 'Nuevo texto'; // Cambia solo el texto


let div = document.getElementById('miDiv');
div.innerHTML = '<p>Este es un <strong>parrafo</strong> nuevo.</p>'; // Agrega HTML dentro del div


//------------------------------NAVEGACION POR EL DOM-------------------------------------


// 1. childNodes
// Devuelve una NodeList que contiene todos los nodos hijos de un elemento, incluidos nodos de texto, comentarios, etc.

let padre = document.getElementById('miPadre');
let hijos = padre.childNodes; // Obtiene todos los nodos hijos (pueden incluir texto y comentarios)

// 2. children
// Devuelve una HTMLCollection que contiene solo los elementos hijos (sin nodos de texto o comentarios).
//  Es útil cuando solo te interesan los nodos de tipo elemento.

let padre = document.getElementById('miPadre');
let hijosElementos = padre.children; // Obtiene solo los elementos hijos

// 3. Propiedades para facilitar la navegación:
// firstChild: Devuelve el primer nodo hijo del nodo actual.
// lastChild: Devuelve el último nodo hijo.
// parentNode: Devuelve el nodo padre del nodo actual.
// previousSibling: Devuelve el nodo hermano anterior al nodo actual.
// nextSibling: Devuelve el nodo hermano siguiente al nodo actual.

let elemento = document.getElementById('miElemento');
let primerHijo = elemento.firstChild; // Primer nodo hijo
let ultimoHijo = elemento.lastChild; // Último nodo hijo
let nodoPadre = elemento.parentNode; // Nodo padre


//------------------------------CREACION/ELIMINACION DEL DOM-------------------------------------

// 1. createElement
// Crea un nuevo elemento HTML de un tipo especificado, pero aún no lo agrega al DOM.

let nuevoDiv = document.createElement('div'); // Crea un nuevo <div>

// 2. createTextNode
// Crea un nodo de texto, útil cuando necesitas insertar solo texto sin un elemento contenedor.

let texto = document.createTextNode('Este es un texto nuevo'); // Crea un nodo de texto

// 3. appendChild
// Agrega un nodo hijo al final del nodo actual.

let nuevoDiv = document.createElement('div');
document.body.appendChild(nuevoDiv); // Agrega el div al final del cuerpo del documento

// 4. replaceChild
// Reemplaza un nodo hijo existente por otro nodo especificado.

let nuevoDiv = document.createElement('div');
let viejoDiv = document.getElementById('miDiv');
document.body.replaceChild(nuevoDiv, viejoDiv); // Reemplaza el viejoDiv por nuevoDiv

// 5. insertBefore
// Inserta un nodo antes de un nodo especificado.

let nuevoDiv = document.createElement('div');
let referencia = document.getElementById('referencia');
document.body.insertBefore(nuevoDiv, referencia); // Inserta nuevoDiv antes de 'referencia'

// 6. removeChild
// Elimina un nodo hijo del nodo actual.

let div = document.getElementById('miDiv');
div.parentNode.removeChild(div); // Elimina el nodo 'div'


//------------------------------EJEMPLO DOM-------------------------------------


<div>
  <p>Primer párrafo</p>
  <p>Segundo párrafo</p>
  <p>Tercer párrafo</p>
</div>

let segundoParrafo = document.querySelector('div p:nth-of-type(2)'); // Selecciona el segundo <p> dentro del <div>
console.log(segundoParrafo.textContent); // Muestra "Segundo párrafo"


let parrafos = document.querySelectorAll('div p'); // Selecciona todos los <p> dentro del <div>
let segundoParrafo = parrafos[1]; // El segundo párrafo está en el índice 1 (el primero está en 0)
console.log(segundoParrafo.textContent); // Muestra "Segundo párrafo"


//------------------------------EJEMPLOS BIBLIOTECA-------------------------------------

// 1. Selección de elementos y navegación
// a) Seleccionar la tabla de libros y recorrer sus filas
// Utilizaremos métodos como getElementById y querySelectorAll para acceder a los elementos y 
// las propiedades de navegación para recorrer los nodos.


// Seleccionar el tbody de la tabla de libros
let tbodyLibros = document.getElementById('vista-libros-tabla').querySelector('tbody');

// Mostrar en consola cuántos libros (filas) hay
console.log("Número de libros:", tbodyLibros.children.length);

// Recorrer las filas (usando children para obtener solo elementos)
Array.from(tbodyLibros.children).forEach((fila, index) => {
  // Suponiendo que la columna de Título es la cuarta (índice 3)
  let titulo = fila.children[3].textContent;
  console.log(`Libro ${index + 1}: ${titulo}`);
});

// Explicación:
// Se usa getElementById para obtener la tabla y querySelector('tbody') para acceder al cuerpo de la tabla.
// La propiedad children devuelve solo los elementos (excluyendo nodos de texto o espacios).
// Se recorre el HTMLCollection con Array.from para poder usar forEach.


//-------------------------------------------------------------------


// 2. Creación e inserción de elementos
// a) Agregar una nueva fila (libro) a la tabla
// Este ejemplo crea una nueva fila con celdas y la añade al final del <tbody>.

function agregarLibro(codLibro, isbn, autor, titulo, editorial, ejemplares) {
  // Seleccionamos el tbody de la tabla de libros
  let tbody = document.querySelector("#vista-libros-tabla tbody");

  // Crear una nueva fila (<tr>)
  let fila = document.createElement("tr");

  // Crear cada celda (<td>) y asignar su contenido usando textContent
  let celdaCod = document.createElement("td");
  celdaCod.textContent = codLibro;

  let celdaISBN = document.createElement("td");
  celdaISBN.textContent = isbn;

  let celdaAutor = document.createElement("td");
  celdaAutor.textContent = autor;

  let celdaTitulo = document.createElement("td");
  celdaTitulo.textContent = titulo;

  let celdaEditorial = document.createElement("td");
  celdaEditorial.textContent = editorial;

  let celdaEjemplares = document.createElement("td");
  celdaEjemplares.textContent = ejemplares;

  // Agregar las celdas a la fila
  fila.appendChild(celdaCod);
  fila.appendChild(celdaISBN);
  fila.appendChild(celdaAutor);
  fila.appendChild(celdaTitulo);
  fila.appendChild(celdaEditorial);
  fila.appendChild(celdaEjemplares);

  // Insertar la fila al final del tbody
  tbody.appendChild(fila);
}

// Ejemplo de uso:
agregarLibro("1001", "978-3-16-148410-0", "Miguel de Cervantes", "El Quijote", "Planeta", 5);

// Resultado:
// Se agregará una nueva fila con los datos del libro al final de la tabla de libros.


//-------------------------------------------------------------------


// 3. Modificación del contenido de un elemento
// a) Cambiar el título del segundo libro
// Se accede al segundo elemento (fila) del <tbody> y se modifica el contenido de la celda correspondiente al título.

function modificarTituloSegundoLibro(nuevoTitulo) {
  let tbody = document.querySelector("#vista-libros-tabla tbody");
  // Verificar que exista al menos 2 filas
  if (tbody.children.length >= 2) {
    let segundaFila = tbody.children[1]; // índice 1 es el segundo elemento
    // Suponiendo que la columna de Título es la cuarta (índice 3)
    let celdaTitulo = segundaFila.children[3];
    celdaTitulo.innerHTML = `<strong>${nuevoTitulo}</strong>`;
  } else {
    console.log("No hay suficiente filas para modificar el segundo libro.");
  }
}

// Ejemplo de uso:
modificarTituloSegundoLibro("El Quijote - Edición Revisada");

// Resultado:
// El título del segundo libro se actualizará con el nuevo valor en negrita.


//-------------------------------------------------------------------


// 4. Eliminación de elementos
// a) Eliminar el primer libro de la tabla
// Utilizamos removeChild para eliminar la primera fila del <tbody>.

function eliminarPrimerLibro() {
  let tbody = document.querySelector("#vista-libros-tabla tbody");
  if (tbody.firstElementChild) {
    tbody.removeChild(tbody.firstElementChild);
  } else {
    console.log("No hay libros para eliminar.");
  }
}

// Ejemplo de uso:
eliminarPrimerLibro();

// Resultado:
// Se elimina la primera fila (el primer libro) de la tabla.

//-------------------------------------------------------------------

// 5. Reemplazo de elementos
// a) Reemplazar el tercer libro por uno nuevo
// Este ejemplo crea una nueva fila y la usa para reemplazar la tercera fila existente en el <tbody>.

function reemplazarTercerLibro(nuevoLibro) {
  // nuevoLibro es un objeto con las propiedades: codLibro, isbn, autor, titulo, editorial, ejemplares
  let tbody = document.querySelector("#vista-libros-tabla tbody");
  if (tbody.children.length >= 3) {
    let terceraFila = tbody.children[2]; // Tercer libro (índice 2)
    
    // Crear la nueva fila
    let fila = document.createElement("tr");

    let celdaCod = document.createElement("td");
    celdaCod.textContent = nuevoLibro.codLibro;

    let celdaISBN = document.createElement("td");
    celdaISBN.textContent = nuevoLibro.isbn;

    let celdaAutor = document.createElement("td");
    celdaAutor.textContent = nuevoLibro.autor;

    let celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = nuevoLibro.titulo;

    let celdaEditorial = document.createElement("td");
    celdaEditorial.textContent = nuevoLibro.editorial;

    let celdaEjemplares = document.createElement("td");
    celdaEjemplares.textContent = nuevoLibro.ejemplares;

    fila.appendChild(celdaCod);
    fila.appendChild(celdaISBN);
    fila.appendChild(celdaAutor);
    fila.appendChild(celdaTitulo);
    fila.appendChild(celdaEditorial);
    fila.appendChild(celdaEjemplares);

    // Reemplazar la tercera fila con la nueva fila
    tbody.replaceChild(fila, terceraFila);
  } else {
    console.log("No hay suficientes libros para reemplazar el tercero.");
  }
}

// Ejemplo de uso:
let nuevoLibro = {
  codLibro: "1005",
  isbn: "978-1-4028-9462-6",
  autor: "Homero",
  titulo: "La Odisea",
  editorial: "Ediciones Clásicas",
  ejemplares: 3
};

reemplazarTercerLibro(nuevoLibro);

// Resultado:
// La tercera fila de la tabla se reemplaza por los datos del nuevo libro.


//-------------------------------------------------------------------


// 4. EVENTO dblclick - Doble clic para eliminar un libro
// Ejemplo: Al hacer doble clic sobre una fila, se elimina

document.querySelector("#vista-libros-tabla tbody").addEventListener("dblclick", function (event) {
    let fila = event.target.closest("tr"); // Encuentra la fila más cercana al elemento clickeado
    if (fila) {
        fila.remove(); // Elimina la fila
        console.log("Libro eliminado.");
    }
});

// Explicación:
// dblclick es el evento de doble clic.
// event.target.closest("tr") encuentra la fila <tr> donde se hizo clic.
// fila.remove() elimina la fila del DOM.


//-------------------------------------------------------------------


// 5. EVENTO mouseover - Resaltar filas al pasar el mouse
// Ejemplo: Cambiar el fondo de la fila cuando el cursor está sobre ella

document.querySelector("#vista-libros-tabla tbody").addEventListener("mouseover", function (event) {
    let fila = event.target.closest("tr");
    if (fila) {
        fila.style.backgroundColor = "#f0f0f0";
    }
});

document.querySelector("#vista-libros-tabla tbody").addEventListener("mouseout", function (event) {
    let fila = event.target.closest("tr");
    if (fila) {
        fila.style.backgroundColor = "";
    }
});

// Explicación:
// mouseover: Cuando el cursor pasa sobre una fila, cambia el color de fondo.
// mouseout: Cuando el cursor sale de la fila, se restablece el color


//-------------------------------------------------------------------


// 6. EVENTO keydown - Detectar teclas en el input de ISBN
// Ejemplo: Detectar si el usuario presiona "Enter" en el campo ISBN

document.getElementById("alta-libro-isbn").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        console.log("Presionaste Enter en el campo ISBN.");
    }
});

// Explicación:
// keydown se dispara cuando el usuario presiona una tecla.
// event.key === "Enter" detecta si la tecla presionada es "Enter".


//-------------------------------------------------------------------


// 7. EVENTO contextmenu - Evitar el menú contextual en la tabla
// Ejemplo: Bloquear el menú contextual al hacer clic derecho en la tabla

document.getElementById("vista-libros-tabla").addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("No puedes abrir el menú contextual aquí.");
});

// Explicación:
// contextmenu se ejecuta al hacer clic derecho.
// preventDefault() evita que aparezca el menú del navegador.


//-------------------------------------------------------------------


// Ejemplo 4: Uso de Callbacks en préstamos de libros

function verificarDisponibilidad(codigoLibro, callback) {
    let libroDisponible = arrayLibros.some(libro => libro.codLibro === codigoLibro && !libro.bajaLibro);
    callback(libroDisponible);
}

function realizarPrestamo(numSocio, codigoLibro) {
    verificarDisponibilidad(codigoLibro, (disponible) => {
        if (disponible) {
            console.log(`El socio ${numSocio} ha tomado prestado el libro ${codigoLibro}.`);
        } else {
            console.log("El libro no está disponible.");
        }
    });
}


//-------------------------------------------------------------------


// Una promesa se crea con el constructor Promise, que recibe una función con dos parámetros: resolve y reject.

const miPromesa = new Promise((resolve, reject) => {
  let exito = true; // Simulación de éxito o error

  setTimeout(() => {
    if (exito) {
      resolve("Operación exitosa"); // Promesa resuelta
    } else {
      reject("Hubo un error"); // Promesa rechazada
    }
  }, 2000);
});

// Cómo Consumir una Promesa
// Las promesas se manejan con los métodos:

// .then() → Captura el resultado si la promesa se resuelve.
// .catch() → Captura el error si la promesa es rechazada.
// .finally() → Se ejecuta siempre, haya éxito o error.

miPromesa
  .then(resultado => {
    console.log("Éxito:", resultado);
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Proceso finalizado");
  });

// Encadenamiento de Promesas
// Las promesas pueden encadenarse para ejecutar procesos en secuencia:

function operacionUno() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Paso 1 completado"), 1000);
  });
}

function operacionDos() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Paso 2 completado"), 1000);
  });
}

operacionUno()
  .then(resultado => {
    console.log(resultado);
    return operacionDos();
  })
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Promesas con async/await
// Otra forma de manejar promesas es con async y await, que hace que el código se vea más limpio y parecido al sincrónico.

async function ejecutarProceso() {
  try {
    const resultado1 = await operacionUno();
    console.log(resultado1);

    const resultado2 = await operacionDos();
    console.log(resultado2);
  } catch (error) {
    console.error("Error:", error);
  }
}

ejecutarProceso();

// Métodos Útiles de Promesas
// Método	Descripción
// Promise.all([])	Ejecuta varias promesas en paralelo y espera que todas se resuelvan (si una falla, todas fallan).
// Promise.race([])	Devuelve el resultado de la primera promesa que se resuelva o rechace.
// Promise.allSettled([])	Espera a que todas las promesas terminen, sin importar si fallan o no.
// Promise.any([])	Devuelve el primer resultado exitoso (ignora errores hasta que todas fallen).
// Ejemplo de Promise.all([])

const promesa1 = new Promise(resolve => setTimeout(() => resolve("A"), 2000));
const promesa2 = new Promise(resolve => setTimeout(() => resolve("B"), 1000));

Promise.all([promesa1, promesa2]).then(resultados => {
  console.log(resultados); // ["A", "B"]
});


//-------------------------------------------------------------------