// Función para leer el contenido de un archivo
async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Manejar el evento de carga exitosa
        reader.onload = (e) => resolve(e.target.result);

        // Manejar errores
        reader.onerror = (e) => reject(e);

        // Leer el archivo como texto
        reader.readAsText(file);
    });
}

// Función para mostrar el contenido del archivo en un elemento HTML
function mostrarContenido(contenido) {
    const elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

// Evento al cargar un archivo
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];

    // Validar que se haya cargado un archivo
    if (!archivo) {
        console.error("No se ha seleccionado ningún archivo.");
        return;
    }

    try {
        // Leer el contenido del archivo
        const contenido = await leerArchivo(archivo);
        console.log("Contenido del archivo:", contenido);

        // Mostrar el contenido en el navegador
        mostrarContenido(contenido);

        /*----------------------------------------------RESULTADO DÍAS---------------------------------------------------------------------*/

        // Dividir el CSV por "&&&&&"
        const [clientesData, telefonosData, comprasData] = contenido.split("&&&&&");

        // LISTADO DE PRODUCTOS
        const compras = comprasData.trim().split("\n").map(linea => {
            const [nombre, apellido, fechaCompra, referencia, descripcion, precio] = linea.split(";");
            return {
                nombre: nombre || "vacio",
                apellido: apellido || "vacio",
                fechaCompra: fechaCompra || "vacio",
                referencia: referencia || "vacio",
                descripcion: descripcion || "vacio",
                precio: precio || "vacio",
            };
        });

        console.log("Listado de compras:", compras);

        // Calcular días desde la compra hasta la fecha actual
        const fechaActual = new Date(); // Fecha actual
        console.log("Fecha actual:", fechaActual);

        compras.forEach(entrega => {
            if (entrega.fechaCompra !== "vacio") {
                const fechaCompra = new Date(entrega.fechaCompra);
                const dias = Math.ceil((fechaActual - fechaCompra) / (1000 * 60 * 60 * 24));
                console.log(
                    `${entrega.nombre} ${entrega.apellido} ${entrega.referencia} \\ Días desde la compra: ${dias}`
                );
            } else {
                console.log(
                    `${entrega.nombre} ${entrega.apellido} ${entrega.referencia} \\ Fecha de compra inválida`
                );
            }
        });

        /*----------------------------------------------RESULTADO CONJUNTO---------------------------------------------------------------------*/

        // Crear el conjunto de referencias de productos
        const referencias = new Set(compras.map(entrega => entrega.referencia).filter(ref => ref !== "vacio"));

        // Añadir referencias adicionales
        referencias.add("846425");
        referencias.add("843555");
        referencias.add("847415");

        // Listar referencias completas
        console.log(`Listado de referencias (${referencias.size}):`, [...referencias]);

        // Eliminar referencias ya entregadas
        compras.forEach(entrega => {
            if (entrega.referencia && entrega.referencia !== "vacio") {
                referencias.delete(entrega.referencia);
            }
        });

        // Listar referencias restantes
        console.log(`Referencias restantes (${referencias.size}):`, [...referencias]);

    } catch (error) {
        console.error("Error al leer el archivo:", error);
    }
}, false);
