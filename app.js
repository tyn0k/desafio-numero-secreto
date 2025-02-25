// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Declarar e inicializar la variable asignaciones como un Map
let asignaciones = new Map();

let listaAmigoSecreto = [];

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

function mostrarListaEnPagina() {
    // Obtener elemento ul donde se muestra la lista
    let listaAmigos = document.getElementById('listaAmigos');
    // Limpiar el contenido actual
    listaAmigos.innerHTML = '';

    // Recorrer lista actual de amigos y agregar un ul por cada uno
    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        let amigo = listaAmigoSecreto[i]; // Obtener el nombre
        listaAmigos.innerHTML += `<li>${amigo}</li>`; // Agregar el nombre como li
    }
    // Actualizar el selector de sorteador
    actualizarSelectorSorteador();
}

function actualizarSelectorSorteador() {
    let selector = document.getElementById('sorteador');
    selector.innerHTML = '<option value="" disabled selected>Elige tu nombre</option>';

    listaAmigoSecreto.forEach((nombre) => {
        selector.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    });
}

function sugerirVariante(nombre) {
    let varianteN = nombre;
    let varianteL = nombre;
    let letra = 'A';
    let numero = 1;

    // Buscar una variante numérica
    while (listaAmigoSecreto.map(n => n.toLowerCase()).includes(varianteN.toLowerCase())) {
        varianteN = `${nombre} ${numero}`;
        numero++;
    }

    // Buscar una variante con letra
    while (listaAmigoSecreto.map(n => n.toLowerCase()).includes(varianteL.toLowerCase())) {
        varianteL = `${nombre} ${letra}`;
        letra = String.fromCharCode(letra.charCodeAt(0) + 1);
    }

    // Devolver ambas variantes
    return { varianteN, varianteL };
}

function agregarAmigo() {
    let nuevoAmigo = document.getElementById('amigo').value.trim();

    if (nuevoAmigo === "") {
        alert("Por favor, escribe un nombre");
        limpiarCaja();
        return;
    } else if (/^[0-9\s\-]+$/.test(nuevoAmigo)) {
        limpiarCaja();
        alert("El nombre no puede contener solo números, espacios o guiones. Debe incluir al menos una letra.");
        return;
    }

    // Normalizar el nombre para comparación (convertir a minúsculas)
    let nombreNormalizado = nuevoAmigo.toLowerCase();

    // Verificar si el nombre ya existe (insensible a mayúsculas/minúsculas)
    if (listaAmigoSecreto.map(n => n.toLowerCase()).includes(nombreNormalizado)) {
        let { varianteN, varianteL } = sugerirVariante(nuevoAmigo);
        alert(`El nombre no puede repetirse, se sugiere agregar un número como ${varianteN} o una letra como ${varianteL}`);
        return;
    }

    // Si el nombre es único, agregarlo a la lista
    listaAmigoSecreto.push(nuevoAmigo);
    limpiarCaja();
    mostrarListaEnPagina();

    // Mostrar en consola
    console.log(typeof(nuevoAmigo));
    console.log(nuevoAmigo);
    console.log(listaAmigoSecreto);
}

function sortearAmigo() {
    if (listaAmigoSecreto.length < 2) {
        alert("Debes agregar al menos 2 nombres para realizar el sorteo.");
        return;
    } else if (listaAmigoSecreto.length % 2 !== 0) {
        alert("El número de participantes es impar. No se puede realizar un sorteo justo. Agrega o elimina un nombre.");
        return;
    }

    // Obtener el nombre del sorteador
    let sorteador = document.getElementById('sorteador').value;

    if (!sorteador) {
        alert("Por favor, selecciona tu nombre antes de sortear.");
        return;
    }

    // Crear una copia de la lista excluyendo al sorteador
    let listaSorteo = listaAmigoSecreto.filter(nombre => nombre !== sorteador);

    // Mezclar la lista aleatoriamente
    for (let i = listaSorteo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listaSorteo[i], listaSorteo[j]] = [listaSorteo[j], listaSorteo[i]];
    }

    // Asignar amigos secretos
    asignaciones.clear(); // Limpiar asignaciones anteriores
    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        let amigoActual = listaAmigoSecreto[i];

        if (amigoActual === sorteador) {
            // El sorteador recibe el primer nombre de la lista mezclada
            asignaciones.set(amigoActual, listaSorteo[0]);
            listaSorteo.splice(0, 1); // Eliminar el nombre asignado
        } else {
            // Los demás reciben un nombre aleatorio de la lista restante
            let indiceAleatorio = Math.floor(Math.random() * listaSorteo.length);
            asignaciones.set(amigoActual, listaSorteo[indiceAleatorio]);
            listaSorteo.splice(indiceAleatorio, 1); // Eliminar el nombre asignado
        }
    }

    // Mostrar solo el amigo secreto del sorteador
    let resultadoElement = document.getElementById('resultadoSorteo');
    let amigoSecreto = asignaciones.get(sorteador);
    resultadoElement.innerHTML = `<p>¡Tu amigo secreto es: <strong>${amigoSecreto}</strong>!</p>`;

    // Cambiar el botón "Sortear" a "Revisar amigo secreto"
    let botonSortear = document.getElementById('botonSortear');
    botonSortear.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícono para revisar"> Revisar amigo secreto`;
    botonSortear.setAttribute('onclick', 'revisarAmigoSecreto()');

    // Mostrar el botón "Reiniciar juego"
    let botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.style.display = 'inline-block';
}

function revisarAmigoSecreto() {
    // Obtener el nombre del sorteador
    let sorteador = document.getElementById('sorteador').value;

    if (!sorteador) {
        alert("Por favor, selecciona tu nombre antes de revisar.");
        return;
    }

    // Mostrar el amigo secreto del sorteador
    let resultadoElement = document.getElementById('resultadoSorteo');
    let amigoSecreto = asignaciones.get(sorteador);
    resultadoElement.innerHTML = `<p>¡Tu amigo secreto es: <strong>${amigoSecreto}</strong>!</p>`;
}

function reiniciarJuego() {
    // Reiniciar la lista y las asignaciones
    listaAmigoSecreto = [];
    asignaciones.clear();

    // Limpiar la interfaz
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultadoSorteo').innerHTML = '';
    limpiarCaja();

    // Restaurar el botón "Sortear"
    let botonSortear = document.getElementById('botonSortear');
    botonSortear.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícono para sortear"> Sortear amigo`;
    botonSortear.setAttribute('onclick', 'sortearAmigo()');

    // Ocultar el botón "Reiniciar juego"
    let botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.style.display = 'none';
}