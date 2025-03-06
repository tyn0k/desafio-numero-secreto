let listaAmigoSecreto = [];

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

function mostrarListaEnPagina() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        let amigo = listaAmigoSecreto[i];
        listaAmigos.innerHTML += `<li>${amigo}</li>`;
    }
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
}

function sortearAmigo() {
    if (listaAmigoSecreto.length < 2) {
        alert("Debes agregar al menos 2 nombres para realizar el sorteo.");
        return;
    }

    // Crear una copia de la lista para el sorteo
    let listaSorteo = [...listaAmigoSecreto];

    // Mezclar la lista aleatoriamente
    for (let i = listaSorteo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listaSorteo[i], listaSorteo[j]] = [listaSorteo[j], listaSorteo[i]];
    }

    // Asignar amigos secretos asegurándose de que nadie se asigne a sí mismo
    let resultadoSorteo = [];
    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        let amigoActual = listaAmigoSecreto[i];
        let amigoSecreto = listaSorteo[i];

        // Si el amigo secreto es el mismo que el amigo actual, intercambiar con otro
        if (amigoSecreto === amigoActual) {
            let indiceIntercambio = (i + 1) % listaSorteo.length; // Intercambiar con el siguiente
            [listaSorteo[i], listaSorteo[indiceIntercambio]] = [listaSorteo[indiceIntercambio], listaSorteo[i]];
            amigoSecreto = listaSorteo[i];
        }

        resultadoSorteo.push(`${amigoActual} ➔ ${amigoSecreto}`);
    }

    // Mostrar el resultado en la página
    let resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';

    resultadoSorteo.forEach((item) => {
        resultadoElement.innerHTML += `<li>${item}</li>`;
    });

    // Mostrar el botón de reiniciar lista
    document.getElementById('botonReiniciarLista').classList.remove('hidden');
}

function reiniciarLista() {
    // Limpiar la lista de amigos y los resultados
    listaAmigoSecreto = [];
    document.getElementById('resultado').innerHTML = '';
    mostrarListaEnPagina();

    // Ocultar el botón de reiniciar lista
    document.getElementById('botonReiniciarLista').classList.add('hidden');
}