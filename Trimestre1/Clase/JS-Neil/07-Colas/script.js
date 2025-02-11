// Preguntar al usuario que quiere hacer (quitar (q), añadir (a) al ppio o terminar (FIN))
// Al añadir saldrá un prompt y se verá el elemento
// Al quitar se pondrá el elemento que se ha quitado
// Al darle la opción incorrecta, se volverá a preguntar

const p_tamanyo = document.getElementById("tamaño");
const p_pila = document.getElementById("pila");
const stack = [];
let t = true;
let option = "";

// Preguntar al usuario que quiere hacer (quitar (q), añadir (a) al ppio o terminar (FIN))
while (t) {
  option = prompt(
    "¿Que es lo quieres hacer? (Teclear lo que pone abajo)\n a. Añadir (a) \n q. Eliminar \n FIN. Finalizar "
  );
  switch (option) {
    // Al añadir saldrá un prompt y se verá el elemento
    case "a":
      anyadir();
      break;
    // Al quitar se pondrá el elemento que se ha quitado
    case "q":
      eliminar();
      break;
    case "FIN":
      finalizar();
      break;
    // Al darle la opción incorrecta, se volverá a preguntar
    default:
      console.log("Opción incorrecta");
      window.alert("Opción incorrecta, intentalo de nuevo");
      break;
  }

  mostrarEstadoPila();
}

/**
 * Funcion para mandar los mensajes dependiendo del estado de la pila
 * Devuelve un objeto con los dos mensajes 
 */

function mensajes() {
  const mensajeLength = `El tamaño de la pila es ${
    stack.length > 0 ? stack.length : "vacío"
  }`;
  const mensajePila = `La pila queda ${
    stack.length > 0 ? `[${stack}]` : "vacía"
  }`;

  return { mensajeLength, mensajePila };
}
// Listar elementos al hacer una operación y poner el tamaño de la pila
function mostrarEstadoPila() {
  const { mensajeLength, mensajePila } = mensajes();
  console.log(mensajePila);

  console.log(mensajeLength);
  window.alert(`${mensajePila} \n${mensajeLength}`);
}

// Función añadir
function anyadir() {
  const input = prompt("Añade un elemento en la pila");
  stack.push(input);
  const mensaje = `"${stack[0]}" se ha añadido`;
  window.alert(mensaje);
  console.log(mensaje);
}

// Función eliminar
function eliminar() {
  const elemento = stack.shift();
  const mensaje = `"${elemento}" se ha eliminado`;
  window.alert(mensaje);
  console.log(mensaje);
}

/**
 * Funcion la cual manda un mensaje de confirmación
 * Si le da a aceptar se parará el programa y se pintará el html
 * Si le da a cancelar se reiniciará el programa de nuevo 
 */

function finalizar() {
  if (confirm("¿Seguro que quieres finalizar?")) {
    t = !t;
    pintarHTML();
  } else {
    window.alert("Le has dado a cancelar");
  }
}

function pintarHTML() {
  const { mensajeLength, mensajePila } = mensajes();
  p_pila.innerHTML = mensajeLength;
  p_tamanyo.innerHTML = mensajePila;
}

// Para meter al principio un elemento con unshift()
// Para quitar un elemento al principio con shift()
// Para poner un elemento al final con push()
// Para quitar un elemento al final con pop()
