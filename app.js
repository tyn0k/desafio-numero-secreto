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

function agregarAmigo() {
    // Obtener el valor del input
    let nuevoAmigo = document.getElementById('amigo').value.trim();
    // verificar que el nombre no sea vacío
    if (nuevoAmigo === ""){
        alert("Por favor, escribe un nombre");
        return;
    }

    // verificar que no sean solo numeros
    if(/^[0-9\s\-]+$/.test(nuevoAmigo)){
        limpiarCaja();
        alert("El nombre no puede contener solo números, espacios o guiones. Debe incluir al menos una letra.");
        return;
    }

    
    console.log(typeof(nuevoAmigo));
    console.log(nuevoAmigo);
    // agregar el nombre a la lista

    listaAmigoSecreto.push(nuevoAmigo);
    console.log(listaAmigoSecreto);

    // limpiar input
    limpiarCaja();

    // mostrar la lista en la página
    mostrarListaEnPagina();

}