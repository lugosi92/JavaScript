/*
========================================
📌 EXPRESIONES REGULARES EN JAVASCRIPT
========================================

✅ 1. CREACIÓN DE EXPRESIONES REGULARES
----------------------------------------
Se pueden crear de dos formas:

// Forma literal
const regex1 = /patrón/;

// Usando el constructor RegExp
const regex2 = new RegExp("patrón");

✅ 2. BANDERAS MÁS USADAS
----------------------------------------
g  -> Búsqueda global (encuentra todas las coincidencias)
i  -> Ignora mayúsculas y minúsculas
m  -> Búsqueda en varias líneas
s  -> Permite que '.' coincida con saltos de línea
u  -> Habilita soporte para Unicode
y  -> Búsqueda en la posición exacta de la cadena

Ejemplo:
const regex = /hola/gi; // Busca "hola" en cualquier parte, sin importar mayúsculas

✅ 3. METACARACTERES MÁS USADOS
----------------------------------------
.   -> Cualquier carácter excepto nueva línea
\d  -> Cualquier número (equivale a [0-9])
\D  -> Cualquier carácter que NO sea un número
\w  -> Cualquier carácter alfanumérico (a-z, A-Z, 0-9, _)
\W  -> Cualquier carácter que NO sea alfanumérico
\s  -> Cualquier espacio en blanco (espacio, tabulación, salto de línea)
\S  -> Cualquier carácter que NO sea espacio en blanco
\b  -> Límite de palabra
\B  -> No límite de palabra
^   -> Inicio de línea
$   -> Final de línea
\   -> Escapa caracteres especiales

Ejemplo:
const regex = /\d+/g;  // Encuentra todos los números en una cadena

✅ 4. CUANTIFICADORES
----------------------------------------
*   -> 0 o más veces
+   -> 1 o más veces
?   -> 0 o 1 vez (opcional)
{n} -> Exactamente n veces
{n,} -> Al menos n veces
{n,m} -> Entre n y m veces

Ejemplo:
const regex = /\d{3,5}/; // Encuentra entre 3 y 5 dígitos seguidos

✅ 5. GRUPOS Y ALTERNANCIA
----------------------------------------
()  -> Grupo de captura
(?:) -> Grupo sin captura
|   -> Alternancia (OR lógico)

Ejemplo:
const regex = /(manzana|pera|uva)/gi; // Busca cualquiera de las 3 palabras

✅ 6. MÉTODOS PARA USAR REGEX
----------------------------------------
.test() -> Devuelve true o false si encuentra coincidencia
.exec() -> Devuelve información sobre la primera coincidencia
.match() -> Devuelve todas las coincidencias en un array
.replace() -> Reemplaza coincidencias en la cadena
.split() -> Divide la cadena usando el regex

Ejemplo:
const texto = "Mi número es 123456789";
const regex = /\d+/;
console.log(regex.test(texto));   // true
console.log(texto.match(regex));  // ["123456789"]

✅ 7. LOOKAHEAD Y LOOKBEHIND
----------------------------------------
(?=...)  -> Lookahead positivo (debe existir después)
(?!...)  -> Lookahead negativo (NO debe existir después)
(?<=...) -> Lookbehind positivo (debe existir antes)
(?<!...) -> Lookbehind negativo (NO debe existir antes)

Ejemplo:
const regex = /€(?=\d+)/; // Encuentra "€" solo si hay un número después

✅ 8. VALIDACIÓN DE PATRONES COMUNES
----------------------------------------
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
const phoneRegex = /^\+?\d{1,3}[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+$/;
const dniRegex = /^\d{8}[A-Z]$/;

Ejemplo:
const email = "correo@ejemplo.com";
console.log(emailRegex.test(email));  // true

========================================
📌 FIN DE LOS APUNTES 🚀
========================================
*/
