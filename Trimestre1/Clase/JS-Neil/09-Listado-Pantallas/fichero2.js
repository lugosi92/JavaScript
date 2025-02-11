let monitores = [];
const table = document.getElementsByTagName("table")[0];
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
function previewFile() {
  let stringContent = "";
  let [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      stringContent = reader.result;
      monitores = createArrayPerLine(separateFilePerLine(stringContent));
      console.log(monitores);
      pintarTabla(monitores);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function separateFilePerLine(fileString) {
  return fileString.split("\r\n");
}

function createArrayPerLine(monitores) {
  monitores.forEach((monitor, i) => {
    let tempMonitor = monitor.split(" ");
    let resultado = {};

    tempMonitor.forEach((parametro, j) => {
      if (typeof parametro === "string") {
        switch (
          true // orden: nombre, precio, px, W, pulgadas, Hz, ms
        ) {
          case parametro.includes(":"):
            parametro = removeCharacter(parametro, ":");
            resultado.nombre = parametro;
            break;
          case parametro.includes("€") || parametro.includes("$"):
            const moneda = parametro.includes("€") ? "€" : "$";
            parametro = stringParametroToFloat(parametro, moneda);
            resultado.precio = parametro;
            resultado.moneda = moneda;
            break;
          case parametro.includes("ms"):
            parametro = stringParametroToInt(parametro, "ms");
            resultado.tiempoRespuesta = parametro;
            break;
          case parametro.includes("W") || parametro.includes("w"):
            parametro = parametro.replace("w", "W");
            parametro = stringParametroToInt(parametro, "W");
            resultado.vatios = parametro;
            break;
          case parametro.includes('"'):
            parametro = stringParametroToInt(parametro, '"');
            resultado.pulgadas = parametro;
            break;
          case parametro.includes("hz") || parametro.includes("Hz"):
            parametro = parametro.replace("hz", "Hz");
            parametro = stringParametroToInt(parametro, "hz");
            resultado.hercios = parametro;
            break;
          case parametro.includes("px"):
            parametro = stringParametroToInt(parametro, "px");
            resultado.pixeles = parametro;
            break;
        }
      }
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

function removeCharacter(string, character) {
  string = string.trim();
  string = string.replace(character, "");
  return string;
}

function addNewRow(atrs) {
  const newTr = document.createElement("tr");
  const newTd = document.createElement("td");

  atrs.forEach((atr) => {
    newTd.innerHTML = atr;
    newTr.appendChild(newTd);
  });

  table.appendChild(newTr);
}

function addNewRow(value, tr) {
  const newTd = document.createElement("td");
  newTd.innerHTML = value;
  tr.appendChild(newTd);
}

function addHeader(thead, content) {
  const newTh = document.createElement("th");

  newTh.innerHTML = content;
  thead.appendChild(newTh);

  table.appendChild(thead);
}

function pintarTabla(monitores) {
  if (monitores.length > 0) {
    const thead = document.createElement("thead");

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
        const newTr = document.createElement("tr");

        addNewRow(nombre, newTr);
        addNewRow(pixeles, newTr);
        addNewRow(hercios, newTr);
        addNewRow(pulgadas, newTr);
        addNewRow(tiempoRespuesta, newTr);
        addNewRow(vatios, newTr);
        addNewRow(precio, newTr);
        addNewRow(moneda, newTr);

        table.appendChild(newTr);
      }
    );
  } else {
    addNewRow("No hay monitores", "");
  }
}
