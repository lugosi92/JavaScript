const table = document.getElementsByTagName("table")[0];

async function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById("contenido-archivo");
  elemento.innerHTML = contenido;
}

document.getElementById("file-input").addEventListener(
  "change",
  async (e) => {
    try {
      const archivo = e.target.files[0];
      if (!archivo) {
        throw new Error("No se ha proporcionado un archivo");
      }
      const contenido = await leerArchivo(archivo);
      const contactos = removeDuplicateElementsList(contenido, ";");
      pintarTabla(contactos);
    } catch (error) {
      console.error(error);
    }
  },
  false
);

function removeDuplicateElementsList(contenido, character) {
  const contactosString = contenido.split("\r\n");
  const conj = new Set([...contactosString]);
  const newList = [];
  let i = 0;
  conj.delete("");
  conj.forEach((contacto) => {
    const row = contacto.split(character);
    let resultado = {};
    resultado.nombre = row[0];
    resultado.apellido = row[1];
    resultado.telefono = parseInt(row[2]);
    newList[i++] = resultado;
  });
  newList.shift();

  return newList;
}

function addNewElementInARow(value, tr) {
  const newTd = document.createElement("td");
  newTd.innerHTML = value ? value : "Sin especificar";
  tr.appendChild(newTd);
}

function addHeader(thead, content) {
  // paso como parametros el thead y el contenido
  const newTh = document.createElement("th"); // crear th para el html

  newTh.innerHTML = content;
  thead.appendChild(newTh); // añadir el th como hijo del thead

  table.appendChild(thead); // añado el th como hijo de la tabla
}

function pintarTabla(items) {
  if (items.length > 0) {
    const thead = document.createElement("thead"); // crear thead para el html

    addHeader(thead, "Nombre");
    addHeader(thead, "Apellido");
    addHeader(thead, "Telefono");
    items.map(({ nombre, apellido, telefono }) => {
      const newTr = document.createElement("tr"); // tr

      addNewElementInARow(nombre, newTr);
      addNewElementInARow(apellido, newTr);
      addNewElementInARow(telefono, newTr);

      table.appendChild(newTr);
    });
  } else addNewElementInARow("No hay contactos", "");
}
