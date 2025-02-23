// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listaAmigoSecreto = [];

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}



function mostrarListaEnPagina() {
    //obtener elemento ul donde se muestra la lista
    let listaAmigos = document.getElementById('listaAmigos');
    // limpiar el contenido actual
    listaAmigos.innerHTML = '';

    // recorrer lista actual de amigos y agregar un ul por cada uno
    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        let amigo = listaAmigoSecreto[i]; // obtener el nombre
        listaAmigos.innerHTML += `<li>${amigo}</li>`; // agregar el nombre como li
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
    //mostrar en consola
    console.log(typeof(nuevoAmigo));
    console.log(nuevoAmigo);
    console.log(listaAmigoSecreto);

    // Si el nombre es único, agregarlo a la lista
    listaAmigoSecreto.push(nuevoAmigo);
    limpiarCaja();
    mostrarListaEnPagina();
}