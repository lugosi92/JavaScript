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

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);
    console.log(contenido);
    mostrarContenido(contenido);

//---------------------------------------------------------RESULTADO 1---------------------------------------------------------------------------
//1 Crear 3 listados
//2 Detectar que huecos estan vacios
//3 Meter en un array clientesOk y no OK


clientesDir = [];
datos = [];
entrega = [];


textoTotal = contenido.split('&&&&&;;;;;\r\n');
    console.log(textoTotal);

    lista1 = textoTotal[0].split('\n');  
    lista2 = textoTotal[1].split('\n');  
    lista3 = textoTotal[2].split('\n');
    

    lista1.forEach(linea => {
        dato = linea.split("–").map(elemento => elemento.trim())
                               .filter(elemento => elemento !== "");  ;
        clientesDir.push(dato);
    });

    lista2.forEach(linea => {
        dato = linea.split(";").map(elemento => elemento.trim())
                               .filter(elemento => elemento !== "");  
        datos.push(dato);
    });

    lista3.forEach(linea => {
        dato = linea.split(";").map(elemento => elemento.trim())
                               .filter(elemento => elemento !== "");  
        entrega.push(dato);
    });

    console.log("CLIENTES - DIRECCIONES");
    console.log(clientesDir);
    console.log("DATOS");
    console.log(datos);
    console.log("ENTREGAS");
    console.log(entrega);
 
    let clientesDirOk = [], clientesDirNoOk = [];
    clientesDir.forEach(linea => {
        if (linea.length >= 2) {
            clientesDirOk.push(linea);
        } else {
            clientesDirNoOk.push(linea);
        }
    });
    
    let datosOk = [], datosNoOk = [];
    datos.forEach(linea => {
        if (linea.length >= 3) {
            datosOk.push(linea);
        } else {
            datosNoOk.push(linea);
        }
    });
    
    let entregaOk = [], entregaNoOk = [];
    entrega.forEach(linea => {
        if (linea.length >= 5) {
            entregaOk.push(linea);
        } else {
            entregaNoOk.push(linea);
        }
    });
    
    // 🔹 Unimos todos los OK en un solo array
    let clientesOk = [...clientesDirOk, ...datosOk, ...entregaOk];
    
    // 🔹 Unimos todos los NO OK en otro array
    let clientesNoOk = [...clientesDirNoOk, ...datosNoOk, ...entregaNoOk];
    
    console.log("Clientes OK:", clientesOk);
    console.log("Clientes NO OK:", clientesNoOk);
    

//---------------------------------------------------------RESULTADO 2---------------------------------------------------------------------------

entregasHoy = [];
entrega =[];
// Crear la lista entregasHoy
entregasHoy = entregas.map(entrega => {
    const [nombre, apellido, fechaCompra, refProducto, descripcion, precio] = entrega;

    // Buscar datos del cliente
    const cliente = clientesDir.find(c => c[0] === nombre && c[1] === apellido);
    const contacto = datos.find(d => d[0] === nombre && d[1] === apellido);

    if (!cliente || !contacto) return null;

    const [_, __, calle, numeroCalle, poblacion] = cliente;
    const [___, ____, telefono] = contacto;

    // Verificar si la entrega es posible
    const entregable = calle && numeroCalle && poblacion && telefono && refProducto && descripcion && fechaCompra && precio;

    return {
        Nombre: nombre,
        Apellido: apellido,
        Calle: calle,
        NumeroCalle: numeroCalle,
        Población: poblacion,
        Teléfono: telefono,
        ReferenciaProducto: refProducto,
        DescripciónProducto: descripcion,
        FechaCompra: fechaCompra,
        Precio: parseFloat(precio.toFixed(2)),
        Entregable: Boolean(entregable)
    };
}).filter(entrega => entrega !== null);

console.log("Lista de entregas:", entregasHoy);

// Calcular días desde la compra hasta la entrega
const hoy = new Date("2024-12-10"); // Suponiendo que hoy es 10 de diciembre de 2024

entregasHoy.forEach(entrega => {
    if (entrega.Entregable) {
        const fechaCompra = entrega.FechaCompra.split("/").reverse().join("-");
        const fechaCompraDate = new Date(fechaCompra);
        const diasTranscurridos = Math.floor((hoy - fechaCompraDate) / (1000 * 60 * 60 * 24));

        console.log(`${entrega.Nombre} ${entrega.Apellido} ${entrega.Teléfono} \\ Días transcurridos: ${diasTranscurridos}`);
    }
});

//---------------------------------------------------------RESULTADO 5---------------------------------------------------------------------------
// Fecha de entrega (día del examen)
const fechaEntrega = new Date(2024, 11, 10); // 10 de diciembre de 2024

// Función para calcular la diferencia de días entre dos fechas
function calcularDiasTranscurridos(fechaCompra) {
    let partes = fechaCompra.split("/");
    let fechaCompraDate = new Date(partes[2], partes[1] - 1, partes[0]); // Convertir a Date
    let diferenciaTiempo = fechaEntrega - fechaCompraDate;
    return Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir a días
}

// Filtrar solo los entregables y calcular días transcurridos
entregasHoy
    .filter(entrega => entrega.Entregable)
    .forEach(entrega => {
        let diasTranscurridos = calcularDiasTranscurridos(entrega.FechaCompra);
        console.log(`${entrega.Nombre} ${entrega.Apellido} ${entrega.Teléfono} \\ Días transcurridos: ${diasTranscurridos}`);
    });

}, false);