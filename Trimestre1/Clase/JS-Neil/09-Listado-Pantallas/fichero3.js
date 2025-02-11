const table = document.getElementsByTagName("table")[0]; // getlElementsByTagName() obtiene una lista de todos los elementos que tenga como etiqueta table

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
function previewFile() {
  let [file] = document.querySelector("input[type=file]").files; // obtiene el archivo que tiene el input
  const reader = new FileReader(); // Objeto que lee archivos locales

  reader.addEventListener(
    // Crear evento para leer el archivo
    "load", // load es un evento que se activa cuando el Filereader haya terminado de leer el archivo
    () => {
      // crear la funcion anonima
      const monitores = createArrayPerLine(reader.result); // crear el array 
      pintarTabla(monitores); // funcion la cual pinta la tabla
    }
  );

  if (file) {
    // si el archivo no es null o undefined, se leerá el archivo como texto plano
    reader.readAsText(file);
  }
}

function createArrayPerLine(fileString) {
  const monitores = fileString.split("\r\n");
  monitores.forEach((monitor, i) => {
    let tempMonitor = monitor.split(" "); // separo por cada " " que haya y se crea otro nuevo array
    let resultado = {}; // crear un objeto vacío

    tempMonitor.forEach((parametro) => {
      // por cada nuevo elemento
      // orden: nombre, precio, px, W, pulgadas, Hz, ms
      if (parametro.includes(":"))
        resultado.nombre = parametro.replace(":", ""); // para el nombre
      else if (parametro.includes("€") || parametro.includes("$")) {
        // para el precio y moneda
        const moneda = parametro.includes("€") ? "€" : "$";
        resultado.precio = stringParametroToFloat(parametro, moneda);
        resultado.moneda = moneda;
      } else if (parametro.includes("ms"))
        resultado.tiempoRespuesta = stringParametroToInt(parametro, "ms");
      // para el tiempo de respuesta
      else if (parametro.includes("W") || parametro.includes("w"))
        // para los vatios
        resultado.vatios = parametro.includes("W")
          ? stringParametroToInt(parametro, "W")
          : stringParametroToInt(parametro, "w");
      else if (parametro.includes('"'))
        // para las pulgadas
        resultado.pulgadas = stringParametroToInt(parametro, '"');
      else if (parametro.includes("hz") || parametro.includes("Hz"))
        // para los hercios
        resultado.hercios = parametro.includes("Hz")
          ? stringParametroToInt(parametro, "Hz")
          : stringParametroToInt(parametro, "hz");
      else if(parametro.includes("px")) // para los pixeles
        resultado.pixeles = stringParametroToInt(parametro, "px");
    });

    monitores[i] = resultado;
  });
  return monitores;
}

function stringParametroToFloat(string, character) {
  string = string.replace(",", ".");
  string = string.replace(character, "");
  string = parseFloat(string);
  return string;
}

function stringParametroToInt(string, character) {
  string = string.replace(",", ".");
  string = string.replace(character, "");
  string = parseInt(string);
  return string;
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

function pintarTabla(monitores) {
  if (monitores.length > 0) {
    const thead = document.createElement("thead"); // crear thead para el html

    addHeader(thead, "Nombre");
    addHeader(thead, "Pixeles (px)");
    addHeader(thead, "Hercios (Hz)");
    addHeader(thead, 'Pulgadas (")');
    addHeader(thead, "Tiempo de Respuesta (ms)");
    addHeader(thead, "Vatios (W)");
    addHeader(thead, "Precio");
    addHeader(thead, "Moneda");
    monitores.map(
      ({
        nombre,
        pixeles,
        hercios,
        pulgadas,
        tiempoRespuesta,
        vatios,
        precio,
        moneda,
      }) => {
        const newTr = document.createElement("tr"); // tr

        addNewElementInARow(nombre, newTr);
        addNewElementInARow(pixeles, newTr);
        addNewElementInARow(hercios, newTr);
        addNewElementInARow(pulgadas, newTr);
        addNewElementInARow(tiempoRespuesta, newTr);
        addNewElementInARow(vatios, newTr);
        addNewElementInARow(precio, newTr);
        addNewElementInARow(moneda, newTr);

        table.appendChild(newTr);
      }
    );
  } else {
    addNewElementInARow("No hay monitores", "");
  }
}
