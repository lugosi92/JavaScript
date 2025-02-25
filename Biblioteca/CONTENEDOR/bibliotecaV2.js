//-------------------------------------------------------------------------------------------------------


async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}


//-------------------------------------------------------------------------------------------------------


function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivoLector');
    elemento.innerHTML = contenido;
}


//-------------------------------------------------------------------------------------------------------


//BOTON "importar", evento "click"
 document.getElementById('importar-boton').addEventListener('click', async () => {
    
    //Borramos el mensaje de error/exito si ya hay alguno escrito
    const mensaje = document.getElementById('importar-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los dos CSV
    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    
    //Si uno esta vacio el mensaje es de Error
    if (!archivoLibros || !archivoLectores) {
        texto="Error: Selecciona ambos archivos antes de importar.";
        

    //Si no leemos los dos CSV
    } else{
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
    
        //El mensaje es de exito
        texto="Importación exitosa.";
        
        //El primer CSV lo dividimos en lineas y lo limpiamos
        const lineas = contenidoLibros.split('\r\n');
        sinDuplicados=new Set(lineas);
        sinDuplicados.delete("");
        arraySin=[...sinDuplicados];
        console.log(sinDuplicados);

        //Separamos los campos y creamos objetos Libro de cada linea
        sinDuplicados.forEach(linea => {
            let valor = linea.split(",");
            if (valor[0] != "codLibro") {
                let libro = new Libro(valor[0], valor[1], valor[2], valor[3], valor[4], parseInt(valor[5]), false, null);
                arrayLibros.push(libro); //Los metemos en el array de Libros
            }
        });
        
        //El segundo CSV lo dividimos en lineas y lo limpiamos
        const lineas2 = contenidoLectores.split('\r\n');
        sinDuplicados=new Set(lineas2);
        sinDuplicados.delete("");
        arraySin=[...sinDuplicados];
        console.log(sinDuplicados);

        //Separamos los campos y creamos objetos Lector de cada linea
        sinDuplicados.forEach(linea => {
            let valor = linea.split(",");
            if (valor[0] != "numSocio") {
                let lector = new Lector(valor[0], valor[1], valor[2], valor[3], valor[4], false, null);
                arrayLectores.push(lector); //Los metemos en el array de Lectores
            }
        });
    }
    
    //Creamos un elemento <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'importar-mensaje'; //Asignamos un ID para manejarlo más tarde
    
    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;
    
    //Mensaje en rojo
    mensajeDiv.style.color = 'red'; 
     
    //Añadimos el mensaje debajo del boton
    document.getElementById('importar-boton').appendChild(mensajeDiv);
});


//-------------------------------------------------------------------------------------------------------


//FUNCIÓN para actualizar las tablas de libros
function actualizarTablaLibros() {

    //Nos posicionamos en el tbody de la tabla de libros
    const tablaLibros = document.getElementById('vista-libros-tabla').getElementsByTagName('tbody')[0];
    tablaLibros.innerHTML = ''; //Limpiamos la tabla antes de actualizar

    //Por cada libro creamos una fila
    arrayLibros.forEach(libro => {
        if(libro.bajaLibro==false){
        const fila = document.createElement('tr');
        
        //Añadir celdas con los valores de los libros
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
        `;
        
        //Añadir el estilo de las celdas
        fila.querySelectorAll('td').forEach((celda) => {
            celda.style.backgroundColor = '#C398EB'; 
            celda.style.borderRadius = '8px'; 
            celda.style.outline = '1px solid #D1D1D1'; 
            celda.style.padding = '12px 18px'; 
            celda.style.textAlign = 'center'; 
            celda.style.fontFamily = '"Arial", sans-serif'; 
            celda.style.fontSize = '14px'; 
        });

        // Añadir el estilo del encabezado
        const encabezados = document.querySelectorAll('#vista-libros-tabla th');
        encabezados.forEach((encabezado) => {
            encabezado.style.backgroundColor = '#BB61F0'; 
            encabezado.style.color = '#1B1B1B'; 
            encabezado.style.padding = '15px 20px'; 
            encabezado.style.textAlign = 'center'; 
            encabezado.style.fontFamily = '"Arial", sans-serif'; 
            encabezado.style.fontSize = '16px'; 
            encabezado.style.fontWeight = 'bold';
        });
        
        //Añadimos cada fila
        tablaLibros.appendChild(fila);

    }
    });
}

//FUNCIÓN para actualizar la tabla de lectores
function actualizarTablaLectores() {

    //Nos posicionamos en el tbody de la tabla lectores
    const tablaLectores = document.getElementById('comprobar-lectores-tabla').getElementsByTagName('tbody')[0];
    tablaLectores.innerHTML = ''; //Limpiar la tabla antes de actualizar

    //Por cada lector creamos una fila
    arrayLectores.forEach(lector => {
        if(lector.bajaLector==false){
        const fila = document.createElement('tr');

        //Validación de formato de teléfono y email
        telefonoValido=validarTelefono(lector.telefono);
        emailValido=validarEmail(lector.email);

        //Creamos los campos de la fila
        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td class="${telefonoValido ? '' : 'error'}">${lector.telefono}</td> 
            <td class="${emailValido ? '' : 'error'}">${lector.email}</td>
        `;//Si el telefono o el email no son validos, a esa celda se le asigna la clase .error

        //Añadir estilo a las celdas
        fila.querySelectorAll('td').forEach((celda, index) => {
            celda.style.backgroundColor = '#C398EB';
            celda.style.borderRadius = '8px'; 
            celda.style.outline = '1px solid #D1D1D1'; 
            celda.style.padding = '12px 18px'; 
            celda.style.textAlign = 'center'; 
            celda.style.fontFamily = '"Arial", sans-serif'; 
            celda.style.fontSize = '14px'; 
        });

        // Las celdas con la clase .error se ponen de diferente color de fondo 
        fila.querySelectorAll('.error').forEach(celda => {
            celda.style.backgroundColor = '#EA9E90';
        });

        //Añadir estilo a los encabezados
        const encabezados = document.querySelectorAll('#comprobar-lectores-tabla th');
        encabezados.forEach((encabezado, index) => {
            encabezado.style.backgroundColor = '#BB61F0';
            encabezado.style.color = '#1B1B1B'; 
            encabezado.style.padding = '15px 20px'; 
            encabezado.style.textAlign = 'center'; 
            encabezado.style.fontFamily = '"Arial", sans-serif'; 
            encabezado.style.fontSize = '16px'; 
            encabezado.style.fontWeight = 'bold';
            });
        tablaLectores.appendChild(fila); //Añadimos a la tabla la fila
        }
    });

}


//-------------------------------------------------------------------------------------------------------


//BOTON "Actualizar Libros" evento "click" que llama a la funcion actualizarTablaLibros()
document.getElementById('vista-libros-boton').addEventListener('click', actualizarTablaLibros);

//BOTON "Actualizar Lectores" evento "click" que llama a la funcion actualizarTablaLectores()
document.getElementById('comprobar-lectores-boton').addEventListener('click', actualizarTablaLectores);


//-------------------------------------------------------------------------------------------------------


//CONSTRUCTOR de objetos Lector 
function Lector(numSocio,nombre,apellido,telefono,email,bajaLector,fechaBaja){

    this.numSocio=numSocio;
    this.nombre=nombre;
    this.apellido=apellido;
    this.telefono=telefono;
    this.email=email;
    this.bajaLector=bajaLector;
    this.fechaBaja=fechaBaja;
    
};

//CONSTRUCTOR de objetos Libro
function Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,bajaLibro,fechaBaja){

    this.codLibro=codLibro;
    this.isbn=isbn;
    this.autor=autor;
    this.titulo=titulo;
    this.editorial=editorial;
    this.ejemplares=ejemplares;
    this.bajaLibro=bajaLibro;
    this.fechaBaja=fechaBaja;

}

//CONSTRUCTOR de objetos Prestamo
function Prestamo(numPrestamo,numSocio,codLibro,fechaPrestamo,fechaDevolucion){

    this.numPrestamo=numPrestamo;
    this.numSocio=numSocio;
    this.codLibro=codLibro;
    this.fechaPrestamo=fechaPrestamo;
    this.fechaDevolucion=fechaDevolucion;

};

//OBJETO clasificacion
const clasificacion={
    pasillo : 7,
    estanteria : 4,
    estante : 6,

}


//-------------------------------------------------------------------------------------------------------


//Inicializamos los arrays de objetos Lector, Libro y Prestamos
arrayLectores=[];
arrayLibros=[];
arrayTotalPrestamos=[];
arrayPrestamosVivos=[];
numPrestamo=0;


//-------------------------------------------------------------------------------------------------------

//FUNCIÓN para validar el formato tanto del nombre como del apellido
function validarNombreApellido(texto) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(texto);
}

//FUNCIÓN para validar el teleéfono
function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

//FUNCIÓN para validar el email
function validarEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|net|eu|org)$/.test(email);
}

//FUNCIÓN para valiadr el numero de socio
function validarNumSocio(numSocio){
    return /^[1-9][0-9]{2}$/.test(numSocio);
}

//FUNCIÓN que comprueba el formato de los email y devuelve un listado con los incorrectos
function comprobarEmails() {
    
    //Creamos el array de emails invalidos
    let emailsInvalidos = [];

    //Recorremos los lectores
    arrayLectores.forEach(lector => {
        
        let validacion = /^[^\s@]+@[^\s@]+\.(com|net|eu|org)$/i; //Patrón de validacion del email

        //Si no es valido
        if (!validacion.test(lector.email)) { 
            emailsInvalidos.push({ lector: lector.nombre, email: lector.email }); //Añadimos al array de invalidos
        }
    });

    //Si alguno es invalido los mostramos
    if (emailsInvalidos.length > 0) {
        console.log("Correos electrónicos no válidos:");
        console.log(emailsInvalidos);

    //Si todos son validos
    } else {
        console.log("Todos los correos electrónicos son válidos.");
    }
}


//FUNCIÓN que comprueba el formato de los telefonos y devuelve un listado con los incorrectos
function comprobarTelefonos(){
  
        //Creamos el array de emails invalidos
        let telefonosInvalidos = [];
    
        //Recorremos los lectores
        arrayLectores.forEach(lector => {
            
            let validacion = /^\d{9}$/; //Patrón de validacion del telefono
            
            //Si no es valido
            if (!validacion.test(lector.telefono)) {
                telefonosInvalidos.push({lector: lector.nombre, telefono: lector.telefono}); //Añadimos al array de invalidos
            }
        });
    
        //Si alguno es invalido los mostramos
        if (telefonosInvalidos.length > 0) {
            console.log("Teléfonos no válidos:");
            console.log(telefonosInvalidos);
            
        //Si todos son validos
        } else {
            console.log("Todos los teléfonos son válidos.");
        }
}

//FUNCION que valida el formato del autor
function validarAutor(autor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(autor);
}

//FUNCION que valida el formato del titulo
function validarTitulo(titulo) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9_\-¡!@#$%&/()¿?€.:,; ]+$/.test(titulo);
}

//FUNCION que valida el formato de la editorial
function validarEditorial(editorial) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(editorial);
}

//FUNCION que valida el formato de los ejemplares (y maximo y minimo)
function validarEjemplares(ejemplares) {
    return /^[0-9]$/.test(ejemplares);
}

//FUNCION que valida el formato del isbn
function validarIsbn(isbn) {
    return /^\d{13}$/.test(isbn);
}

//FUNCIÓN que valida el codigo del libro
function validarCodLibro(codLibro){
    return /^[1-9][0-9]{3}$/.test(codLibro);
}



//-------------------------------------------------------------------------------------------------------


//FUNCION que da de alta un Lector, recibe los parametros con prompt, crea un objeto Lector y lo mete en el arrayLectores
function altaLector(numSocio, nombre, apellido, telefono, email) {
    let error = true;

    // Verificar si falta algún dato
    if (!numSocio || !nombre || !apellido || !telefono || !email) {
        console.log("F, falta algún dato");
    } 
    else if (!validarNumSocio(numSocio)) {
        console.log("V, el número de socio tiene un formato incorrecto");
    } 
    else if (!validarNombreApellido(nombre)) {
        console.log("V, el nombre tiene un formato incorrecto");
    } 
    else if (!validarNombreApellido(apellido)) {
        console.log("V, el apellido tiene un formato incorrecto");
    } 
    else if (!validarEmail(email)) {
        console.log("V, el email tiene un formato incorrecto");
    } 
    else if (!validarTelefono(telefono)) {
        console.log("V, el teléfono tiene un formato incorrecto");
    } 
    else {
        // Si todos los datos son válidos, creamos el objeto Lector y lo añadimos al arrayLectores
        error = false;
        let lector = new Lector(numSocio, nombre, apellido, telefono, email, false, null);
        arrayLectores.push(lector);
        console.log("Lector añadido con éxito");
    }

    return error; // Devuelve true si hubo error, false si fue exitoso
}

document.getElementById('alta-lector-boton').addEventListener('click', () => {
    // Limpiar cualquier mensaje previo
    const mensajePrevio = document.getElementById('alta-lector-mensaje');
    mensajePrevio.textContent = ""; // Borra el contenido previo

    // Recogemos los valores introducidos
    const numSocio = document.getElementById('alta-lector-numSocio').value;
    const nombre = document.getElementById('alta-lector-nombre').value;
    const apellido = document.getElementById('alta-lector-apellido').value;
    const telefono = document.getElementById('alta-lector-telefono').value;
    const email = document.getElementById('alta-lector-email').value;

    let texto = "";
    let color = "red";

    // Si la función altaLector() devuelve false (significa que se agregó bien)...
    if (!altaLector(numSocio, nombre, apellido, telefono, email)) {
        // Limpiar los campos
        document.getElementById('alta-lector-numSocio').value = "";
        document.getElementById('alta-lector-nombre').value = "";
        document.getElementById('alta-lector-apellido').value = "";
        document.getElementById('alta-lector-telefono').value = "";
        document.getElementById('alta-lector-email').value = "";

        texto = "Lector añadido exitosamente";
        color = "green"; // Mensaje en verde
    } else {
        texto = "Error en los datos";
    }

    // Mostrar mensaje de éxito o error
    mensajePrevio.textContent = texto;
    mensajePrevio.style.color = color;
});


//-------------------------------------------------------------------------------------------------------


//FUNCIÓN para dar de baja un Lector
function bajaLector(numSocio) {
    let error = true;

    // Validar número de socio
    if (!validarNumSocio(numSocio)) {
        console.log("E, el numSocio no cumple con la validación");
        return true;
    }

    // Buscar el lector
    let lector = arrayLectores.find(lec => lec.numSocio == numSocio);

    // Si el lector existe
    if (lector) {
        lector.bajaLector = true; // Dar de baja
        lector.fechaBaja = new Date().toLocaleDateString(); // Asignar fecha de baja
        console.log("Fecha de baja: " + lector.fechaBaja);
        error = false;
    } else {
        console.log("E, el socio no existe");
    }

    return error;
}

document.getElementById('baja-lector-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('baja-lector-mensaje');
    mensaje.textContent = "";

    // Obtener el número de socio
    const numSocio = document.getElementById('baja-lector-numSocio').value;

    let texto = "";
    let color = "red";

    // Intentar dar de baja
    if (!bajaLector(numSocio)) {
        texto = "Lector dado de baja correctamente.";
        color = "green";
    } else {
        texto = "Error: número de socio no válido o no encontrado.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});


//-------------------------------------------------------------------------------------------------------


//FUNCION para modificar un atributo de un Lector
function modifLector(numSocio, atributo, valor) {
    let error = true;

    // Validar número de socio
    if (!validarNumSocio(numSocio)) {
        console.log("E, el número de socio no cumple con la validación");
        return true;
    }

    // Buscar el lector
    let lector = arrayLectores.find(lec => lec.numSocio == numSocio);

    // Si el lector existe
    if (lector) {
        // Validar el nuevo valor según el atributo
        const validadores = {
            nombre: validarNombreApellido,
            apellido: validarNombreApellido,
            telefono: validarTelefono,
            email: validarEmail
        };

        if (validadores[atributo] && validadores[atributo](valor)) {
            lector[atributo] = valor; // Modificar el atributo
            console.log(`El atributo "${atributo}" ha sido modificado correctamente.`);
            error = false;
        } else {
            console.log(`El valor del atributo "${atributo}" no cumple con la validación.`);
        }
    } else {
        console.log("E, el número de socio no existe");
    }

    return error;
}

document.getElementById('modif-lector-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('modif-lector-mensaje');
    mensaje.textContent = "";

    // Obtener valores del formulario
    const numSocio = document.getElementById('modif-lector-socio').value;
    const atributo = document.getElementById('modif-lector-atributo').value;
    const valor = document.getElementById('modif-lector-valor').value;

    let texto = "";
    let color = "red";

    // Confirmación antes de modificar
    if (confirm(`¿Seguro que quieres modificar el atributo ${atributo} del socio ${numSocio}?`)) {
        if (!modifLector(numSocio, atributo, valor)) {
            texto = `El atributo "${atributo}" ha sido modificado correctamente.`;
            color = "green";
        } else {
            texto = "Error: número de socio no válido o dato incorrecto.";
        }
    } else {
        texto = "Operación cancelada.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});



//-------------------------------------------------------------------------------------------------------



//FUNCION para dar de alta un Libro, recibe los parametros con prompt, crea un objeto Libro y lo mete en el arrayLibros
function altaLibro(isbn,autor,titulo,editorial,ejemplares){

    error=true;

    //Si ninguno de los parametros es null mostramos el error
    if(isbn==null||autor==null||titulo==null||editorial==null||ejemplares==null){
        console.log("F, falta algún dato");
    }else 
        //Si alguno no es valido muestra el mensaje de error pertinente
    if(!validarIsbn(isbn)){
        console.log("V, el isbn tiene un formato incorrecto")
    }else
    
    if(!validarAutor(autor)){
        console.log("V, el autor tiene un formato incorrecto")
    }else
    
    if(!validarTitulo(titulo)){
       console.log("V, el titulo tiene un formato incorrecto");
    }else 

    if(!validarEditorial(editorial)){
       console.log("V, el editorial tiene un formato incorrecto");
    }else

    if(!validarEjemplares(ejemplares)){
        console.log("V, los ejemplares tiene un formato incorrecto");
    }else{
    
    //Si todos son validos crea el objeto Lector y lo añade al arrayLectores
    error=false;
    codLibro = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    let libro=new Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,false,null);
    arrayLibros.push(libro);
    console.log("Añadido con exito");
}
    return error; //Devolvemos error: (true) si se a realizado con exito || (false) Si hay algún error
};

document.getElementById('alta-libro-boton').addEventListener('click', () => {

    //Limpiar cualquier mensaje previo
    const mensaje = document.getElementById('alta-libro-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;
    
    //Si la funcion altaLibro() devuelte false (no hay error)...
    if (!altaLibro(isbn,autor,titulo,editorial,ejemplares)) {

        //Limpiamos los campos
        document.getElementById('alta-libro-isbn').value = '';
        document.getElementById('alta-libro-autor').value = '';
        document.getElementById('alta-libro-titulo').value = '';
        document.getElementById('alta-libro-editorial').value = '';
        document.getElementById('alta-libro-ejemplares').value = '';
        texto="Añadido exitosamente"; //Asignamos mensaje de exito

    //Sino asignamos mensaje de error
    } else {
        texto="Error en los datos"; 
    }

    //Creamos elemento <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'alta-libro-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al parrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 

    //Añadimos el mensaje debajo del boton
    document.getElementById('alta-libro').appendChild(mensajeDiv);
});


//-------------------------------------------------------------------------------------------------------


//FUNCIÓN para dar de baja un libro
function bajaLibro(codLibro) {
    let error = true;

    // Validar código del libro
    if (!validarCodLibro(codLibro)) {
        console.log("E, el codLibro no cumple con la validación");
        return true;
    }

    // Buscar el libro
    let libro = arrayLibros.find(lib => lib.codLibro == codLibro);

    // Si el libro existe
    if (libro) {
        libro.bajaLibro = true; // Dar de baja
        libro.fechaBaja = new Date().toLocaleDateString(); // Asignar fecha de baja
        console.log("El libro se ha dado de baja con éxito");
        error = false;
    } else {
        console.log("E, el libro no existe");
    }

    return error;
}

document.getElementById('baja-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('baja-libro-mensaje');
    mensaje.textContent = "";

    // Obtener el código del libro
    const codLibro = document.getElementById('baja-libro-codigo').value;

    let texto = "";
    let color = "red";

    // Confirmación antes de dar de baja
    if (confirm(`¿Seguro que quieres dar de baja el libro con código ${codLibro}?`)) {
        if (!bajaLibro(codLibro)) {
            texto = "Libro dado de baja correctamente.";
            color = "green";
        } else {
            texto = "Error: código de libro no válido o no encontrado.";
        }
    } else {
        texto = "Operación cancelada.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});



//-------------------------------------------------------------------------------------------------------


//FUNCION para modificar el valor de un atributo de Libro
function modifLibro(codLibro, atributo, valor) {
    let error = true;

    // Verificar si el código del libro es válido
    if (!validarCodLibro(codLibro)) {
        console.log("El código del libro no cumple con la validación");
        return true;
    }

    // Buscar el libro en el array
    let libro = arrayLibros.find(lib => lib.codLibro == codLibro);

    // Si el libro existe
    if (libro) {
        let validadores = {
            isbn: validarIsbn,
            autor: validarAutor,
            titulo: validarTitulo,
            editorial: validarEditorial,
            ejemplares: validarEjemplares
        };

        // Verificar si el atributo es válido y su valor también
        if (validadores[atributo] && validadores[atributo](valor)) {
            libro[atributo] = valor; // Modificar el valor
            console.log("Modificación exitosa");
            error = false;
        } else {
            console.log("El valor del " + atributo + " no cumple la validación");
        }
    } else {
        console.log("El libro no existe");
    }

    return error;
}

document.getElementById('modif-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('modif-libro-mensaje');
    mensaje.textContent = "";

    // Recoger valores
    const codLibro = document.getElementById('modif-libro-codLibro').value;
    const atributo = document.getElementById('modif-libro-atributo').value;
    const valor = document.getElementById('modif-libro-valor').value;

    let texto = "";
    let color = "red";

    // Intentar modificar el libro
    if (!modifLibro(codLibro, atributo, valor)) {
        texto = "Modificación realizada con éxito.";
        color = "green";
    } else {
        texto = "Error en la modificación.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});



//-------------------------------------------------------------------------------------------------------


//FUNCION que busca por isbn o codLibro si esta disponible o esta dado de baja
function hayLibro(atributo, valor) {
    // Buscar el libro en el array
    let libro = arrayLibros.find(lib => lib[atributo] == valor && !lib.bajaLibro);
    
    // Si el libro está disponible, devolvemos false (NO hay error)
    return !libro;
}

document.getElementById('buscar-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje previo
    const mensaje = document.getElementById('buscar-libro-mensaje');
    mensaje.textContent = "";

    // Obtener valores del formulario
    const atributo = document.getElementById('buscar-libro-atributo').value;
    const valor = document.getElementById('buscar-libro-valor').value;

    let texto = "";
    let color = "red";

    // Comprobar si el libro está disponible
    if (!hayLibro(atributo, valor)) {
        texto = "✅ El libro está disponible.";
        color = "green";
    } else {
        texto = "❌ El libro no está disponible o está dado de baja.";
    }

    // Mostrar mensaje en pantalla
    mensaje.textContent = texto;
    mensaje.style.color = color;
});

//-------------------------------------------------------------------------------------------------------


//FUNCION para encontrar donde se situa un libro
function dondeLibro(isbn) {
    let error = true; // Si no se encuentra el libro (true) || Si se encuentra (false)
    
    // Buscar el libro con el ISBN
    let libro = arrayLibros.find(lib => lib.isbn === isbn);

    // Si el libro es encontrado
    if (libro) {
        libro.__proto__ = clasificacion; // Prototipar el libro con la clasificación

        // Mostrar la información en el HTML
        document.getElementById('pasillo-libro').textContent = libro.pasillo || "No disponible";
        document.getElementById('estanteria-libro').textContent = libro.estanteria || "No disponible";
        document.getElementById('estante-libro').textContent = libro.estante || "No disponible";

        error = false;
    }

    // Si no se encuentra el libro
    if (error) {
        console.log("Libro no localizado");
    }

    return error;
}

document.getElementById('localizar-libro-boton').addEventListener('click', () => {
    // Limpiar mensaje y la ubicación previa
    const mensaje = document.getElementById('localizar-libro-mensaje');
    mensaje.textContent = "";
    document.getElementById('pasillo-libro').textContent = "";
    document.getElementById('estanteria-libro').textContent = "";
    document.getElementById('estante-libro').textContent = "";

    // Obtener el ISBN introducido
    const isbn = document.getElementById('isbn-libro').value;
    let texto = "";
    let color = "red";

    // Llamar a la función dondeLibro
    if (!dondeLibro(isbn)) {
        texto = "✅ El libro ha sido localizado.";
        color = "green";
    } else {
        texto = "❌ No se encontró el libro con ese ISBN.";
    }

    // Mostrar el mensaje con color según el resultado
    mensaje.textContent = texto;
    mensaje.style.color = color;
});




//-------------------------------------------------------------------------------------------------------


//FUNCION para realizar un prestamo de un Libro
function prestamoLibro(codLibro,numSocio){

    //Si el codigo de libro no es valido o no existe
    if (!validarCodLibro(codLibro) || hayLibro("codLibro", codLibro)) {
        console.log("El libro no existe o está dado de baja.");
        return false; // No se puede realizar el préstamo
    }
    
    //Buscamos las relaciones
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);

    //Si hay relaciones y hay mas de 0 ejemplares del libro
    if (lector && libro && libro.ejemplares > 0) {

        libro.ejemplares = libro.ejemplares - 1; //Se resta un ejemplar
        console.log("Libro prestado con éxito.");
        return true; //Se puede realizar el prestamo

    } else {
    console.log("No hay ejemplares disponibles.");
    return false; //No se puede realizar el prestamo 
}
}

//FUNCION para devolver un libro
function devolucionLibro(codLibro){
    
    //Si el codigo de libro es valido
    if(validarCodLibro(codLibro)){
        //Recorremos el array de libros
        arrayLibros.forEach(libro => {
        //Si encontramos una relacion
        if(libro.codLibro==codLibro){
            
            libro.ejemplares=parseInt(libro.ejemplares)+1; //Añadimos un ejemplar
            console.log("Devuelto");
            return false; //Devolucion exitosa
        }
        });

    }else{
        return true; //Devolucion erronea
    }
}

//-------------------------------------------------------------------------------------------------------


//FUNCION para solicitar un prestamo
function solicitudPrestamo(numSocio,codLibro){
    
    const exitoPrestamo = prestamoLibro(codLibro,numSocio);//LLamamos a la funcion prestamoLibro()

    //Si prestamoLibro() devuelve "true"
    if (exitoPrestamo) {
        let numPrestamo = arrayTotalPrestamos.length + 1; //Asignamos un numero de prestamo que autoincrementa
        let prestamo = new Prestamo(numPrestamo, numSocio, codLibro, new Date().toLocaleDateString(), null); //Creamos el objeto Prestamo
        arrayTotalPrestamos.push(prestamo); //Lo añadimos a la lista de prestamos totales
        arrayPrestamosVivos.push(prestamo); //Lo añadimos a la lista de prestamos vivos
        console.log(`Préstamo realizado: ${numPrestamo} para el socio ${numSocio}`); //Mostramos la info
        return true; //Devolvemos true

    //Si prestamoLibro() devuelve false
    }else{
        console.log("No se pudo realizar el préstamo.");
        return false; //Devolvemos false
}
}

//FUNCION para devolver un prestamo
function devolucionPrestamo(numSocio,codLibro){
    error=true; //Gestion errores: Si el prestamo no se encuentra (true) || Si la devolucion es exitosa (false)
    num='';
    fecha='';

    //Recorremos el array de prestamos vivos
    for (const prestamo of arrayPrestamosVivos) {
        //Si encontramos relacion
        if(prestamo.numSocio==numSocio && prestamo.codLibro==codLibro){

            prestamo.fechaDevolucion = new Date().toLocaleDateString(); //Asignamos fecha de devolucion
            num=prestamo.numPrestamo; //Recogemos el numero de prestamo
            fecha=prestamo.fechaDevolucion //Recogemos la fecha de devolucion
            devolucionLibro(prestamo.codLibro); //LLamamos a devolucionLibro para devolverlo
            arrayPrestamosVivos = arrayPrestamosVivos.filter(prestamo => prestamo.numPrestamo != num); //Filtramos el array de prestamos vivos para que se borre el que acabamos de devolver
            error=false;
            break; //Salimos del bucle para no borrar todos en caso de que la misma persona haya prestado dos libros iguales
        } 
    };
    //Si no hay relacion, error
    if(error==true){
        console.log("Prestamo no encontrado ");
    }

    return [error,num,fecha]; //Devolvemos el error (true/false), el numero de prestamo y la fecha de devolucion
}


//-------------------------------------------------------------------------------------------------------


//FUNCION que muestra el listado total de prestamos
function listadoTotalPrestamos(){
    console.log(arrayTotalPrestamos);
}

//FUNCION que muestra el listado de los prestamos vivos
function listadoPrestamosVivos(){
    console.log(arrayPrestamosVivos);
}

//FUNCION para añadir un prestamo, evento "click"
document.getElementById('prestamo-boton').addEventListener('click', () => {
 
    //Limpiamos cualquier mensaje previo
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    //Si los valores no son nulos...
    if (numSocio && codLibro) {
        
        if(solicitudPrestamo(numSocio,codLibro)){ //Si la funcion solicitudPrestamo devuelve true
            texto="Solicitud realizada con exito"; //Asignamos mensaje de exito

        //Sino asignamos mensaje de error
        }else{
            texto="Solicitud erronea"; 
        }

    //Si los valores son nulos asignamos mensaje de error
    }else{
        texto="Solicitud erronea"; 
    }

    //Vaciamos los valores
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';
    
    //Creamos un elemnto <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 
 
    //Añadimos el mensaje debajo del boton
    document.getElementById('prestamo-boton').appendChild(mensajeDiv);
    
});

//BOTON para crear una devolucion, evento "click"
document.getElementById('devolucion-boton').addEventListener('click', () => {

    //Limpiar cualquier mensaje previo
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    //Si los valores no son nulos...
    if (numSocio && codLibro) {
        resultado=devolucionPrestamo(numSocio,codLibro);//Lamamos a la funcion devolucionPrestamo (devuelve un array)

        //Si resultado[0] (variable "error" tipo boolean) es falso
        if(!resultado[0]){ 
            texto="Solicitud realizada con exito: Numero de prestamo: "+resultado[1]+" Fecha devolucion: "+resultado[2]; //Asignamos mensaje de exito con resultado[1] ("numPrestamo") y resultado[2] ("fechaDevolucion")

        //Sino asignamos mensaje de error
        }else{
            texto="Solicitud erronea"; 
        }

    //Si los valores son nulos asignamos mensaje de error
    }else{
        texto="Solicitud erronea" 
    }

    //Limpiamos los campos
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';

    //Creamos el elemeto <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 
   
    //Añadimos el mensaje debajo del boton
    document.getElementById('devolucion-boton').appendChild(mensajeDiv);

});