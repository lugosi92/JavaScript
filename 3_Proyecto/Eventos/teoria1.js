//Esquema de BOM-DOM

/**
 * La web está formada por el objeto Window, el cual se divide por:
 *  - Contenido de la web:
 *    - Document (DOM)
 *  - Contenedor de la web (BOM):
 *    - Screen 
 *    - History
 *    - Location
 *    - Navigator
 *    - Console
 *    - Event ??
 */

//WINDOW
//Inner: el tamaño del navegador usandose
window.innerHeight;
window.innerWidth;

//Outer: El tamaño de la ventana , (condols + utl...)


scroll(0,500)

getSelection().toString()

find("Alphafly")
true

open("https://adidas.es")

scrol(0,200)
scrollBy(0,200)

//NAVIGATOR
navigator.userAgent
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'

navigator.cookieEnabled
true

navigator.storage

//screen

screen.height
screen.width

screen.color

//location

location.href
location.hostname
//recagrfagr la pagina


//history

history.go(-1)
history.length


//DOM-ESQUEMA                                   

//Nodos: elementos y atributos
//12 nodos atributo, elemtno y texto  

//1 clase  e ID
getElementByid()
getElementByclassName()
innerHTML
//elementos con la misma clase se puede trabajr como array pero no es un array es una coleccion

//pasar collecion a array con la propagacion


//2 Tag name -> div, p , ...
getElementByTagName()

//3 querySelector
document.querySelector("p"); //seleccionar elementos 
document.querySelector("p.example"); //seleccionar elementos p con clase example  

//validacion email poner en rojo 
const nodeList = document.querySelectorAll("a[target]");
for(let i = 0; i < nodeList.length; i++){
    document.querySelector("p.email").computedStyleMap.backgrandcolor(red); 
}

//seleccionar padres hijos y hermanos

//arbol es muy grande hacemos referncia al contenedor por ejemplo

head.getElementById()
body.getElementById()

//text solo coje el texto plano  y inner todo
textContent
innerHTML

//hasatributte
//crear elemento
    //1createElement const para = document.createElement("p");
    //2añadir document.body.appendChild(para);


//textnode

//ejecutar funcion integrada en un boton  

📌 window (Objeto principal)
│
├── 🌐 BOM (Browser Object Model)
│   ├── 📌 screen → Información de la pantalla
│   │   ├── screen.width (Ancho)
│   │   ├── screen.height (Altura)
│   │   ├── screen.colorDepth (Colores)
│   │
│   ├── 🌍 location → URL actual
│   │   ├── location.href (Dirección completa)
│   │   ├── location.hostname (Dominio)
│   │   ├── location.reload() (Recargar)
│   │
│   ├── 🔙 history → Historial del navegador
│   │   ├── history.length (Número de páginas visitadas)
│   │   ├── history.go(-1) (Ir atrás)
│   │   ├── history.go(1) (Ir adelante)
│   │
│   ├── 🚀 navigator → Información del navegador
│   │   ├── navigator.userAgent (Info del navegador)
│   │   ├── navigator.cookieEnabled (Cookies activadas)
│   │   ├── navigator.storage (Almacenamiento)
│   │
│   ├── 📢 console → Depuración
│   │   ├── console.log("Mensaje") (Mostrar mensaje)
│   │   ├── console.error("Error") (Mostrar error)
│   │   ├── console.warn("Advertencia") (Mostrar advertencia)
│   │
│   ├── 📜 events → Eventos del usuario
│       ├── click (Clic en un elemento)
│       ├── keydown (Tecla presionada)
│       ├── mouseover (Mouse encima de un elemento)
│
├── 📄 DOM (Document Object Model)
│   ├── 📌 document → Representa el HTML
│   │   ├── head (Encabezado)
│   │   │   ├── meta (Metadatos)
│   │   │   ├── title (Título de la página)
│   │   │   ├── link (CSS y otros enlaces)
│   │   │
│   │   ├── body (Cuerpo del documento)
│   │       ├── div (Contenedores)
│   │       ├── p (Párrafos)
│   │       ├── a (Enlaces)
│   │       ├── img (Imágenes)
│   │       ├── script (Código JavaScript)
│   │
│   ├── 🔍 Métodos de selección de elementos
│   │   ├── getElementById("id") (Selecciona por ID)
│   │   ├── getElementsByClassName("clase") (Selecciona por clase)
│   │   ├── getElementsByTagName("p") (Selecciona por etiqueta)
│   │   ├── querySelector("p.clase") (Selecciona con CSS)
│   │
│   ├── 🏗️ Manipulación del DOM
│   │   ├── textContent (Modificar texto)
│   │   ├── innerHTML (Modificar contenido HTML)
│   │   ├── setAttribute("class", "nuevoEstilo") (Añadir atributos)
│   │   ├── removeAttribute("class") (Eliminar atributos)
│   │
│   ├── 🛠️ Creación y eliminación de elementos
│   │   ├── document.createElement("p") (Crear un elemento)
│   │   ├── appendChild(elemento) (Añadir al DOM)
│   │   ├── removeChild(elemento) (Eliminar del DOM)
│   │
│   ├── 🔁 Navegación en el DOM
│       ├── parentNode (Elemento padre)
│       ├── children (Lista de hijos)
│       ├── firstChild (Primer hijo)
│       ├── lastChild (Último hijo)
│       ├── nextSibling (Hermano siguiente)
│       ├── previousSibling (Hermano anterior)
